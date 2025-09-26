import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { logEvent } from "firebase/analytics";

import { SegmentedControl } from "@mantine/core";

import { analytics } from "../../../Config/Firebase/firebaseConfig";
import { settleTransaction, addNewBlock } from "../../../Store/Features/Ledger/LedgerSlice";
import { clearMempool } from "../../../Store/Features/Mempool/MempoolSlice";
import { Modes, updateAdvancedMode } from "../../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../../Store/hook";
import { COLORS } from "../../../Utils/colors";
import classes from "./ModeControl.module.css";

function ModeControl() {
    const dispatch = useDispatch();
    const { advancedMode } = useAppSelector((state) => state.settings);
    const { transactions } = useAppSelector((state) => state.mempool);
    const { t } = useTranslation();

    const handleOnChange = useCallback(
        (value: Modes) => {
            dispatch(updateAdvancedMode(value !== Modes.BASIC));

            localStorage.setItem("appMode", value);

            if (transactions.length) {
                transactions.forEach((tx) => {
                    dispatch(settleTransaction(tx));
                });
                dispatch(clearMempool());
                dispatch(addNewBlock(Boolean(transactions.length)));
            }

            logEvent(analytics, "mode_changed", {
                mode: value,
            });
        },
        [transactions]
    );

    return (
        <SegmentedControl
            classNames={{ control: classes.control, label: classes.label }}
            styles={{
                indicator: {
                    backgroundImage: `linear-gradient(90deg, ${COLORS.VIOLET}, ${COLORS.PURPLE})`,
                },
            }}
            fullWidth
            data={[
                { label: t(Modes.BASIC), value: Modes.BASIC },
                { label: t(Modes.ADVANCED), value: Modes.ADVANCED },
            ]}
            radius="xl"
            value={advancedMode ? Modes.ADVANCED : Modes.BASIC}
            onChange={(v) => handleOnChange(v as Modes)}
            color="violet"
        />
    );
}

export default ModeControl;
