import { useDispatch } from "react-redux";

import { Button, Group, Modal, Select, Stack, Switch } from "@mantine/core";

import { Units, updateAdvancedMode, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";

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

    return (
        <Modal opened={opened} onClose={close} title="Settings" radius="md">
            <Stack gap="lg">
                <Select
                    value={unit}
                    label="Unit"
                    variant="filled"
                    data={unitOptions}
                    onChange={(value) => value && dispatch(updateUnit(value as Units))}
                    radius="md"
                />
                <Group justify="flex-end">
                    <Switch
                        checked={advancedMode}
                        onChange={(event) => dispatch(updateAdvancedMode(event.currentTarget.checked))}
                        color="teal"
                        withThumbIndicator={false}
                        label="Advanced Mode"
                        labelPosition="left"
                    />
                </Group>
            </Stack>
            <Group gap="xs" mt="xl" justify="flex-end">
                <Button variant="light" color="gray" onClick={close} radius="md">
                    Cancel
                </Button>
            </Group>
        </Modal>
    );
}

export default SettingsModal;
