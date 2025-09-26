import { useTranslation } from "react-i18next";

import { Tooltip, ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

function SourceCodeButton() {
    const { t } = useTranslation();

    return (
        <Tooltip label={t("sourceCode")} radius="xl" withArrow>
            <ActionIcon
                size="xl"
                variant="light"
                color="gray"
                aria-label="Source-code"
                radius="xl"
                component="a"
                href="https://github.com/DanielKanyo/transaction-flow"
                target="_blank"
            >
                <IconBrandGithub size={20} />
            </ActionIcon>
        </Tooltip>
    );
}

export default SourceCodeButton;
