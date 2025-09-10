import { useDispatch } from "react-redux";

import { Button, Divider, Group, Modal, SegmentedControl, Select, Stack } from "@mantine/core";

import { Modes, Units, updateAdvancedMode, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
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
                <SegmentedControl
                    fullWidth
                    data={[Modes.BASIC, Modes.ADVANCED]}
                    radius="md"
                    color="teal"
                    value={advancedMode ? Modes.ADVANCED : Modes.BASIC}
                    onChange={(v) => dispatch(updateAdvancedMode(v !== Modes.BASIC))}
                />
                <Divider />
                <Select
                    value={unit}
                    label="Unit"
                    variant="filled"
                    data={unitOptions}
                    onChange={(value) => value && dispatch(updateUnit(value as Units))}
                    radius="md"
                />
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
