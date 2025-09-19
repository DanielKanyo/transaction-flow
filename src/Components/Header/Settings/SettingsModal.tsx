import { useTranslation } from "react-i18next";

import { Button, Group, Modal, Stack } from "@mantine/core";

import ModeControl from "./ModeControl/ModeControl";
import UnitSelect from "./UnitSelect";

interface SettingsModalProps {
    opened: boolean;
    close: () => void;
}

function SettingsModal({ opened, close }: SettingsModalProps) {
    const { t } = useTranslation();

    return (
        <Modal opened={opened} onClose={close} title={t("settings")} radius="md">
            <Stack gap="lg">
                <ModeControl />
                <UnitSelect />
            </Stack>
            <Group gap="xs" mt="xl" justify="flex-end">
                <Button variant="light" color="gray" onClick={close} radius="md">
                    {t("cancel")}
                </Button>
            </Group>
        </Modal>
    );
}

export default SettingsModal;
