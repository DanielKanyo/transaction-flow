import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { SegmentedControl, Text } from "@mantine/core";

import { Modes, updateAdvancedMode } from "../../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../../Store/hook";
import classes from "./SettingsModal.module.css";

function ModeControl() {
    const dispatch = useDispatch();
    const { advancedMode } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();

    return (
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
    );
}

export default ModeControl;
