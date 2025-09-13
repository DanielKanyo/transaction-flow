import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Modal, TextInput, NumberInput, Button, Group, Text, Stack, HoverCard, Divider, ActionIcon, Alert } from "@mantine/core";
import { IconAlertSquareRoundedFilled, IconArrowUp, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import {
    DEFAULT_FEE,
    generateNewExchangeAddress,
    generateNewWalletAddress,
    settleTransaction,
    UTXO,
} from "../../Store/Features/Ledger/LedgerSlice";
import { addTransactionToMempool } from "../../Store/Features/Mempool/MempoolSlice";
import { useAppSelector } from "../../Store/hook";
import { buildTransaction } from "../../Utils/transaction-builder";

type SendModalProps = {
    title: string;
    opened: boolean;
    senderAddresses: string[];
    utxos: UTXO[];
    color: string;
    close: () => void;
};

function SendModal({ title, opened, senderAddresses, utxos, color, close }: SendModalProps) {
    const [recipentAddress, setRecipentAddress] = useState("");
    const [amount, setAmount] = useState<string | number>("");
    const { advancedMode } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const totalBalance = useMemo(() => {
        return utxos.filter((utxo) => !utxo.spent).reduce((sum, utxo) => sum + utxo.amount, 0);
    }, [utxos]);

    const handleClose = useCallback(() => {
        setRecipentAddress("");
        setAmount("");
        close();
    }, [close]);

    const send = useCallback(
        (recipientAddress: string, amount: number, fee: number) => {
            const tx = buildTransaction({
                utxos,
                senderAddresses,
                recipientAddress,
                amountToSend: amount,
                fee,
            });

            if (tx) {
                if (advancedMode) {
                    dispatch(addTransactionToMempool(tx));
                } else {
                    dispatch(settleTransaction(tx));
                }

                dispatch(generateNewWalletAddress());
                dispatch(generateNewExchangeAddress());

                handleClose();
            }
        },
        [utxos, senderAddresses, advancedMode, dispatch, handleClose]
    );

    const isValid = recipentAddress.length > 0 && typeof amount === "number" && amount > 0 && amount + DEFAULT_FEE <= totalBalance;

    const addressInfo = (
        <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end" radius="md">
            <HoverCard.Target>
                <IconInfoSquareRoundedFilled size={20} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Stack align="stretch" justify="center" gap="xs">
                    <Text fw={600}>Recipient Address</Text>
                    <Text fz="sm">
                        The recipient address is like the "bank account number" for Bitcoin. It tells the network{" "}
                        <b>where the Bitcoin should be sent</b>.
                    </Text>
                    <Divider />
                    <Text fz="sm">
                        In this practice app, you can get a recipient address by going to your wallet, clicking "Receive", and then copying
                        the address shown there. Paste that address here to simulate sending Bitcoin to your wallet.
                    </Text>
                </Stack>
            </HoverCard.Dropdown>
        </HoverCard>
    );

    return (
        <Modal opened={opened} onClose={handleClose} title={title} centered size={480} radius="md">
            <Stack gap="lg">
                <TextInput
                    variant="filled"
                    label="Recipient Address"
                    placeholder="Paste address"
                    value={recipentAddress}
                    onChange={(e) => setRecipentAddress(e.currentTarget.value)}
                    radius="md"
                    required
                    rightSection={addressInfo}
                />

                <NumberInput
                    variant="filled"
                    label="Amount to Send (BTC)"
                    placeholder="e.g. 0.5"
                    value={amount}
                    onChange={setAmount}
                    min={0}
                    required
                    radius="md"
                    rightSection={
                        <ActionIcon
                            radius="md"
                            fz={13}
                            me={26}
                            variant="subtle"
                            color="gray"
                            miw={44}
                            onClick={() => setAmount(totalBalance - DEFAULT_FEE)}
                            disabled={totalBalance <= DEFAULT_FEE}
                        >
                            Max
                        </ActionIcon>
                    }
                />

                <Group justify="flex-end" align="center">
                    <Text fz={14} c="dimmed">
                        Transaction Fee:
                    </Text>
                    <Text fz={14}>{DEFAULT_FEE} BTC</Text>
                </Group>

                <Alert variant="light" color="yellow" radius="md" title="Important Reminder" icon={<IconAlertSquareRoundedFilled />}>
                    Always double-check the recipient address before sending Bitcoin. Even one wrong letter or number means the Bitcoin will
                    go to the wrong place - and once sent, transactions cannot be reversed.
                </Alert>
            </Stack>

            <Group gap="xs" mt="xl" justify="flex-end">
                <Button variant="light" color="gray" onClick={handleClose} radius="md">
                    {t("cancel")}
                </Button>
                <Button
                    color={color}
                    onClick={() => {
                        if (isValid) send(recipentAddress, amount as number, DEFAULT_FEE);
                    }}
                    disabled={!isValid}
                    leftSection={<IconArrowUp size={20} />}
                    radius="md"
                >
                    Send
                </Button>
            </Group>
        </Modal>
    );
}

export default SendModal;
