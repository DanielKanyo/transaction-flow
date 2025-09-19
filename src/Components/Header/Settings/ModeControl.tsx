import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { SegmentedControl, Text } from "@mantine/core";

import { settleTransaction, addNewBlock } from "../../../Store/Features/Ledger/LedgerSlice";
import { clearMempool } from "../../../Store/Features/Mempool/MempoolSlice";
import { Modes, updateAdvancedMode } from "../../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../../Store/hook";
import classes from "./SettingsModal.module.css";

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
        },
        [transactions]
    );

    return (
        <div>
            <Text fz="sm">{t("mode")}</Text>
            <SegmentedControl
                classNames={{ control: classes.control, label: classes.label }}
                fullWidth
                data={[
                    { label: t(Modes.BASIC), value: Modes.BASIC },
                    { label: t(Modes.ADVANCED), value: Modes.ADVANCED },
                ]}
                radius="md"
                color="violet"
                value={advancedMode ? Modes.ADVANCED : Modes.BASIC}
                onChange={(v) => handleOnChange(v as Modes)}
            />
        </div>
    );
}

export default ModeControl;
