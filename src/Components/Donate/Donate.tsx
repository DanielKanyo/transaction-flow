import { useTranslation } from "react-i18next";

import { ActionIcon, Alert, Button, Group, Modal, Stack, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHeartBolt } from "@tabler/icons-react";

import QrCode from "./QrCode";

function Donate() {
    const [opened, { open, close }] = useDisclosure(false);
    const { t } = useTranslation();

    return (
        <>
            <Tooltip label={t("donate")} radius="xl" withArrow>
                <ActionIcon size={40} variant="light" color="gray" aria-label="Donate" radius="xl" onClick={open}>
                    <IconHeartBolt size={20} />
                </ActionIcon>
            </Tooltip>

            <Modal
                opened={opened}
                onClose={close}
                title={t("donate")}
                keepMounted
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
                    <Alert variant="light" color="pink" icon={<IconHeartBolt />} radius="lg">
                        {t("sendMeSats")}
                    </Alert>
                    <QrCode />
                </Stack>
                <Group gap="xs" mt="lg" justify="flex-end">
                    <Button variant="light" color="gray" onClick={close} radius="xl">
                        {t("cancel")}
                    </Button>
                </Group>
            </Modal>
        </>
    );
}

export default Donate;
