import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

import { INITIAL_BTC_AMOUNT, resetLedger } from "../../../Store/Features/Ledger/LedgerSlice";
import { clearMempool } from "../../../Store/Features/Mempool/MempoolSlice";
import { useAppSelector } from "../../../Store/hook";

interface ResetButtonProps {
    fullWidth?: boolean;
}

function ResetButton({ fullWidth = false }: ResetButtonProps) {
    const { balanceOnExchange } = useAppSelector((state) => state.ledger);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleResetBtnClick = useCallback(() => {
        dispatch(resetLedger());
        dispatch(clearMempool());
    }, []);

    return (
        <Button
            variant="gradient"
            gradient={{ from: "violet", to: "violet.5", deg: 90 }}
            style={{ border: 0 }}
            aria-label="Reset"
            fullWidth={fullWidth}
            radius="xl"
            h={40}
            leftSection={<IconReload size={20} />}
            onClick={handleResetBtnClick}
            disabled={balanceOnExchange === INITIAL_BTC_AMOUNT}
        >
            {t("reset")}
        </Button>
    );
}

export default ResetButton;
