import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ActionIcon, Alert, Button, CopyButton, Group, HoverCard, Modal, Stack, TextInput, Tooltip, Text, Divider } from "@mantine/core";
import { IconAlertSquareRoundedFilled, IconBulbFilled, IconCheck, IconCopy, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

interface ReceiveModalProps {
    title: string;
    opened: boolean;
    color: string;
    latestAddress: string;
    close: () => void;
}

function ReceiveModal({ title, opened, color, latestAddress, close }: ReceiveModalProps) {
    const { t } = useTranslation();

    const handleClose = useCallback(() => {
        close();
    }, [close]);

    const info = (
        <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-start" radius="md">
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
                    >
                        Learn more
                    </Button>
                </Stack>
            </HoverCard.Dropdown>
        </HoverCard>
    );

    return (
        <Modal opened={opened} onClose={handleClose} title={title} centered size={480} radius="md">
            <Stack gap="lg">
                <TextInput
                    variant="filled"
                    label="Bitcoin address"
                    placeholder="Receive address"
                    value={latestAddress || ""}
                    radius="md"
                    readOnly
                    rightSection={
                        <CopyButton value={latestAddress || ""} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? t("copied") : t("copy")} withArrow position="top">
                                    <ActionIcon color={copied ? color : "gray"} variant="subtle" onClick={copy} radius="md">
                                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    }
                    leftSection={info}
                />

                <Alert variant="light" color="yellow" radius="md" title="Attention" icon={<IconAlertSquareRoundedFilled />}>
                    Always double-check the address before sharing or sending funds. If you use the wrong address, your Bitcoin may be lost
                    forever.
                </Alert>

                <Alert variant="light" color="violet" radius="md" title="Privacy Tip" icon={<IconBulbFilled />}>
                    For your privacy, use a new address each time you receive Bitcoin. Reusing old addresses can make it easier for others
                    to track your transactions.
                </Alert>
            </Stack>

            <Group gap="xs" mt="xl" justify="flex-end">
                <Button variant="light" color="gray" onClick={handleClose} radius="md">
                    {t("cancel")}
                </Button>
            </Group>
        </Modal>
    );
}

export default ReceiveModal;
