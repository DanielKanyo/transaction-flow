import { useTranslation } from "react-i18next";

import { ActionIcon, Alert, Button, Group, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHeartBolt } from "@tabler/icons-react";

import QrCode from "./QrCode";

function Donate() {
    const [opened, { open, close }] = useDisclosure(false);
    const { t } = useTranslation();

    return (
        <>
            <Tooltip label={t("donate")} radius="md" withArrow>
                <ActionIcon size={36} variant="light" color="gray" aria-label="Donate" radius="md" onClick={open}>
                    <IconHeartBolt size={20} />
                </ActionIcon>
            </Tooltip>

            <Modal opened={opened} onClose={close} title={t("donate")} keepMounted radius="md">
                <Alert variant="light" color="pink" icon={<IconHeartBolt />} radius="md" mb="lg">
                    {t("sendMeSats")}
                </Alert>
                <QrCode />
                <Group gap="xs" mt="lg" justify="flex-end">
                    <Button variant="light" color="gray" onClick={close} radius="md">
                        {t("cancel")}
                    </Button>
                </Group>
            </Modal>
        </>
    );
}

export default Donate;
