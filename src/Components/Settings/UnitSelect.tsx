import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { NativeSelect, Select } from "@mantine/core";
import { IconCurrencyBitcoin } from "@tabler/icons-react";

import { updateUnit, Units } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";

const unitOptions = Object.values(Units).map((value) => ({
    value,
    label: value === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi,
}));

interface UnitSelectProps {
    native?: boolean;
}

function UnitSelect({ native = false }: UnitSelectProps) {
    const dispatch = useDispatch();
    const { unit } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();

    if (native) {
        return (
            <NativeSelect
                value={unit}
                label={t("unit")}
                styles={{ label: { marginBottom: 4 } }}
                leftSectionPointerEvents="none"
                leftSection={<IconCurrencyBitcoin size={16} />}
                variant="filled"
                data={unitOptions}
                onChange={(event) => dispatch(updateUnit(event.currentTarget.value as Units))}
                radius="xl"
            />
        );
    }

    return (
        <Select
            value={unit}
            leftSectionPointerEvents="none"
            leftSection={<IconCurrencyBitcoin size={16} />}
            variant="filled"
            autoSelectOnBlur
            data={unitOptions}
            onChange={(value) => value && dispatch(updateUnit(value as Units))}
            radius="xl"
            comboboxProps={{ radius: "lg" }}
        />
    );
}

export default UnitSelect;
