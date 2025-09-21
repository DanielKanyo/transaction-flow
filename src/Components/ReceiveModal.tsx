import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ActionIcon, Alert, Button, CopyButton, Group, HoverCard, Modal, Stack, TextInput, Tooltip, Text, Divider } from "@mantine/core";
import { IconAlertSquareRoundedFilled, IconBulbFilled, IconCheck, IconCopy, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

interface ReceiveModalProps {
    title: string;
    opened: boolean;
    latestAddress: string;
    close: () => void;
}

function ReceiveModal({ title, opened, latestAddress, close }: ReceiveModalProps) {
    const { t } = useTranslation();

    const handleClose = useCallback(() => {
        close();
    }, [close]);

    const info = (
        <HoverCard width={320} shadow="md" openDelay={200} closeDelay={200} position="bottom-start" radius="lg">
            <HoverCard.Target>
                <IconInfoSquareRoundedFilled size={20} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Stack align="stretch" justify="center" gap="xs">
                    <Text fw={600}>Receive Address</Text>
                    <Text fz="sm">
                        A receive address is like your personal Bitcoin mailbox. You can share it with others so they can send Bitcoin to
                        you. Each address is unique, and the coins sent to it will appear in your wallet.
                    </Text>
                    <Divider />
                    <Text fz="sm">
                        It's important to double-check the address before sharing it - if it's typed or copied incorrectly, the Bitcoin
                        could be lost forever. For better privacy, it's best to use a new address each time you receive Bitcoin instead of
                        reusing old ones.
                    </Text>
                    <Button
                        fullWidth
                        component="a"
                        href="https://www.techtarget.com/whatis/definition/Bitcoin-address"
                        target="_blank"
                        color="violet"
                        radius="xl"
                        mt="sm"
                    >
                        {t("learnMore")}
                    </Button>
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
                    label={`Bitcoin ${t("address")}`}
                    value={latestAddress || ""}
                    radius="xl"
                    readOnly
                    rightSection={
                        <CopyButton value={latestAddress || ""} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? t("copied") : t("copy")} radius="xl" withArrow>
                                    <ActionIcon color="gray" variant="subtle" onClick={copy} radius="xl">
                                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    }
                    leftSection={info}
                />

                <Alert variant="light" color="yellow" radius="lg" title={t("attention")} icon={<IconAlertSquareRoundedFilled />}>
                    {t("doubleCheckAddress2")}
                </Alert>

                <Alert variant="light" color="violet" radius="lg" title={t("privacyTip")} icon={<IconBulbFilled />}>
                    {t("doNotReuseAddress")}
                </Alert>
            </Stack>

            <Group gap="xs" mt="lg" justify="flex-end">
                <Button variant="light" color="gray" onClick={handleClose} radius="xl">
                    {t("cancel")}
                </Button>
            </Group>
        </Modal>
    );
}

export default ReceiveModal;
