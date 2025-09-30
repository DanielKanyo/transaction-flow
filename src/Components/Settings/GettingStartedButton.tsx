import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Tooltip, ActionIcon } from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";

import { updateGettingStartedVisible } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";

function GettingStartedButton() {
    const { gettingStartedVisible } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <Tooltip label={t("toggleGettingStarted")} radius="xl" withArrow>
            <ActionIcon
                size="xl"
                variant="light"
                color="gray"
                aria-label="Toggle-getting-started"
                radius="xl"
                onClick={() => dispatch(updateGettingStartedVisible(!gettingStartedVisible))}
            >
                <IconBulb size={20} />
            </ActionIcon>
        </Tooltip>
    );
}

export default GettingStartedButton;
