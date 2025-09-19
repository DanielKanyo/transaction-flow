import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

import { resetLedger } from "../../../Store/Features/Ledger/LedgerSlice";

interface ResetButtonProps {
    fullWidth?: boolean;
}

function ResetButton({ fullWidth = false }: ResetButtonProps) {
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
        >
            {t("reset")}
        </Button>
    );
}

export default ResetButton;
