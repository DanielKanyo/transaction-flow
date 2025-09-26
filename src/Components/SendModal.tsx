import { useCallback, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { logEvent } from "firebase/analytics";

import { Modal, TextInput, NumberInput, Button, Group, Text, Stack, HoverCard, Divider, ActionIcon, Alert } from "@mantine/core";
import { IconAlertSquareRoundedFilled, IconArrowUp, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { analytics } from "../Config/Firebase/firebaseConfig";
import {
    UTXO,
    settleTransaction,
    generateNewWalletAddress,
    generateNewExchangeAddress,
    DEFAULT_FEE,
} from "../Store/Features/Ledger/LedgerSlice";
import { addTransactionToMempool } from "../Store/Features/Mempool/MempoolSlice";
import { Units } from "../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../Store/hook";
import { COLORS } from "../Utils/colors";
import { buildTransaction } from "../Utils/transaction-builder";

type SendModalProps = {
    title: string;
    opened: boolean;
    senderAddresses: string[];
    utxos: UTXO[];
    exchangeMode?: boolean;
    close: () => void;
};

function SendModal({ title, opened, senderAddresses, utxos, exchangeMode, close }: SendModalProps) {
    const [recipentAddress, setRecipentAddress] = useState("");
    const [amount, setAmount] = useState<string | number>("");
    const { advancedMode } = useAppSelector((state) => state.settings);
    const { exchangeAddresses } = useAppSelector((state) => state.ledger);
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

                logEvent(analytics, "send_bitcoin", {
                    recipientAddress,
                    transferredAmount: amount,
                });
            }
        },
        [utxos, senderAddresses, advancedMode, dispatch, handleClose]
    );

    const isValid =
        recipentAddress.length > 0 &&
        typeof amount === "number" &&
        amount > 0 &&
        amount + DEFAULT_FEE <= totalBalance &&
        (!exchangeAddresses.includes(recipentAddress) || !exchangeMode);

    const addressInfo = (
        <HoverCard width={320} shadow="md" openDelay={200} closeDelay={200} position="bottom-end" radius="lg">
            <HoverCard.Target>
                <IconInfoSquareRoundedFilled size={20} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Stack align="stretch" justify="center" gap="xs">
                    <Text fw={600}>{t("recipentAddress")}</Text>
                    <Text fz="sm">
                        <Trans
                            i18nKey="recipientAddressExplanationPart1"
                            components={{
                                bold: <b />,
                                italic: <i />,
                            }}
                        />
                    </Text>
                    <Divider />
                    <Text fz="sm">
                        <Trans
                            i18nKey="recipientAddressExplanationPart2"
                            components={{
                                bold: <b />,
                                italic: <i />,
                            }}
                        />
                    </Text>
                </Stack>
            </HoverCard.Dropdown>
        </HoverCard>
    );

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={title}
            centered
            size={480}
            radius="lg"
            overlayProps={{
                backgroundOpacity: 0.6,
                blur: 3,
            }}
            closeButtonProps={{
                radius: "xl",
            }}
        >
            <Stack gap="lg">
                <TextInput
                    variant="filled"
                    title=""
                    label={t("recipentAddress")}
                    placeholder={t("pasteAddressHere")}
                    value={recipentAddress}
                    onChange={(e) => setRecipentAddress(e.currentTarget.value)}
                    radius="xl"
                    required
                    rightSection={addressInfo}
                    error={
                        exchangeAddresses.includes(recipentAddress) && exchangeMode
                            ? "Consolidation between exchanges is unnecessary and may incur fees."
                            : null
                    }
                />

                <NumberInput
                    variant="filled"
                    title=""
                    label={t("amountToSend")}
                    placeholder={`${t("forExample")} 0.12`}
                    value={amount}
                    onChange={setAmount}
                    min={0}
                    required
                    disabled={exchangeAddresses.includes(recipentAddress) && exchangeMode}
                    radius="xl"
                    suffix=" BTC"
                    decimalScale={8}
                    rightSection={
                        <ActionIcon
                            radius="xl"
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

                <Group justify="flex-end" align="center" gap={4}>
                    <Text fz={14} c="dimmed">
                        {t("transactionFee")}:
                    </Text>
                    <Text fz={14}>
                        {DEFAULT_FEE} {Units.Bitcoin.toUpperCase()}
                    </Text>
                </Group>

                <Alert variant="light" color="yellow" radius="lg" title={t("importantReminder")} icon={<IconAlertSquareRoundedFilled />}>
                    {t("doubleCheckAddress1")}
                </Alert>
            </Stack>

            <Group gap="xs" mt="lg" justify="flex-end">
                <Button variant="light" color="gray" onClick={handleClose} radius="xl">
                    {t("cancel")}
                </Button>
                <Button
                    variant="gradient"
                    gradient={{ from: "violet", to: COLORS.PURPLE, deg: 90 }}
                    style={{ border: 0 }}
                    onClick={() => {
                        if (isValid) send(recipentAddress, amount as number, DEFAULT_FEE);
                    }}
                    disabled={!isValid}
                    leftSection={<IconArrowUp size={20} />}
                    radius="xl"
                >
                    {t("send")}
                </Button>
            </Group>
        </Modal>
    );
}

export default SendModal;
