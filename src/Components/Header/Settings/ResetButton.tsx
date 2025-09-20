import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

import { INITIAL_BTC_AMOUNT, resetLedger } from "../../../Store/Features/Ledger/LedgerSlice";
import { useAppSelector } from "../../../Store/hook";

interface ResetButtonProps {
    fullWidth?: boolean;
}

function ResetButton({ fullWidth = false }: ResetButtonProps) {
    const { balanceOnExchange } = useAppSelector((state) => state.ledger);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <Button
            color="violet"
            aria-label="Reset"
            fullWidth={fullWidth}
            radius="md"
            leftSection={<IconReload size={20} />}
            onClick={() => dispatch(resetLedger())}
            disabled={balanceOnExchange === INITIAL_BTC_AMOUNT}
        >
            {t("reset")}
        </Button>
    );
}

export default ResetButton;
