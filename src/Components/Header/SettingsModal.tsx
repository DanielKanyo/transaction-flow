import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button, Group, Modal, SegmentedControl, Select, Stack, Text } from "@mantine/core";

import { Modes, Units, updateAdvancedMode, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import classes from "./SettingsModal.module.css";

const unitOptions = Object.values(Units).map((value) => ({
    value,
    label: value === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi,
}));

interface SettingsModalProps {
    opened: boolean;
    close: () => void;
}

function SettingsModal({ opened, close }: SettingsModalProps) {
    const dispatch = useDispatch();
    const { unit, advancedMode } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();

    return (
        <Modal opened={opened} onClose={close} title={t("settings")} radius="md">
            <Stack gap="lg">
                <div>
                    <Text fz="sm">{t("mode")}</Text>
                    <SegmentedControl
                        classNames={{ control: classes.control, label: classes.label }}
                        fullWidth
                        data={[
                            { label: t("basic"), value: Modes.BASIC },
                            { label: t("advanced"), value: Modes.ADVANCED },
                        ]}
                        radius="md"
                        color="violet"
                        value={advancedMode ? Modes.ADVANCED : Modes.BASIC}
                        onChange={(v) => dispatch(updateAdvancedMode(v !== Modes.BASIC))}
                    />
                </div>
                <Select
                    value={unit}
                    label={t("unit")}
                    variant="filled"
                    data={unitOptions}
                    onChange={(value) => value && dispatch(updateUnit(value as Units))}
                    radius="md"
                />
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
