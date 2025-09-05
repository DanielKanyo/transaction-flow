import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, TextInput, NumberInput, Button, Group, Text, Stack, HoverCard, Divider, ActionIcon, Alert } from "@mantine/core";
import { IconAlertSquareRoundedFilled, IconArrowUp, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { ADDRESSES, createTransaction, DEFAULT_FEE, UTXO } from "../../Store/Features/Ledger/LedgerSlice";
import { buildTransaction } from "../../Utils/transaction-builder";

type SendModalProps = {
    title: string;
    opened: boolean;
    senderAddress: ADDRESSES;
    recipientAddress: ADDRESSES;
    utxos: UTXO[];
    color: string;
    close: () => void;
};

function SendModal({ title, opened, senderAddress, recipientAddress, utxos, color, close }: SendModalProps) {
    const [dummyRecipentAddress, setDummyRecipentAddress] = useState("");
    const [amount, setAmount] = useState<string | number>("");
    const dispatch = useDispatch();

    const totalBalance = useMemo(() => {
        return utxos.filter((utxo) => !utxo.spent && utxo.address === senderAddress).reduce((sum, utxo) => sum + utxo.amount, 0);
    }, [utxos, senderAddress]);

    const handleClose = useCallback(() => {
        setDummyRecipentAddress("");
        setAmount("");
        close();
    }, [close]);

    const send = useCallback(
        (_recipient: string, amount: number, fee: number) => {
            const tx = buildTransaction({
                utxos,
                senderAddress,
                recipientAddress,
                amountToSend: amount,
                fee,
            });

            if (tx) {
                dispatch(createTransaction(tx));

                handleClose();
            }
        },
        [utxos, senderAddress, recipientAddress, dispatch, handleClose]
    );

    const isValid = dummyRecipentAddress.length > 0 && typeof amount === "number" && amount > 0 && amount + DEFAULT_FEE <= totalBalance;

    const addressInfo = (
        <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end">
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
        <Modal opened={opened} onClose={handleClose} title={title} centered size={480}>
            <Stack gap="lg">
                <TextInput
                    variant="filled"
                    label="Recipient Address"
                    placeholder="Paste wallet address"
                    value={dummyRecipentAddress}
                    onChange={(e) => setDummyRecipentAddress(e.currentTarget.value)}
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

                {isValid ? (
                    <Alert variant="light" color="orange" radius="md" title="Important Reminder" icon={<IconAlertSquareRoundedFilled />}>
                        Always double-check the recipient address before sending Bitcoin. Even one wrong letter or number means the Bitcoin
                        will go to the wrong place - and once sent, transactions cannot be reversed.
                    </Alert>
                ) : null}
            </Stack>

            <Group justify="space-between" mt="xl" align="center">
                <Stack gap={3}>
                    <Text lh={1}>{DEFAULT_FEE} BTC</Text>
                    <Text fz={13} c="dimmed">
                        Transaction Fee
                    </Text>
                </Stack>
                <Group gap="xs">
                    <Button variant="light" color="gray" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        color={color}
                        onClick={() => {
                            if (isValid) send(dummyRecipentAddress, amount as number, DEFAULT_FEE);
                        }}
                        disabled={!isValid}
                        leftSection={<IconArrowUp size={20} />}
                    >
                        Send
                    </Button>
                </Group>
            </Group>
        </Modal>
    );
}

export default SendModal;
