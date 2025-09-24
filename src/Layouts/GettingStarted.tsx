import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { ActionIcon, Card, em, Flex, ScrollArea, Tooltip, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEye, IconRocket } from "@tabler/icons-react";

import GroupCard from "../Components/GroupCard";
import { RESPONSIVE_BREAKPOINT, updateGettingStartedVisible } from "../Store/Features/Settings/SettingsSlice";

function GettingStarted() {
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <Card shadow="sm" padding={isMobile ? "xs" : "md"} radius="lg" h="100%">
            <GroupCard bgImage="linear-gradient(90deg, var(--mantine-color-violet-filled), var(--mantine-color-violet-7))">
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconRocket />
                        {t("gettingStarted")}
                    </Flex>
                    {/* TODO: Translation */}
                    <Tooltip label="Hide getting started" withArrow radius="xl">
                        <ActionIcon
                            variant="subtle"
                            color="white"
                            radius="lg"
                            aria-label="toggle-getting-started"
                            onClick={() => dispatch(updateGettingStartedVisible(false))}
                        >
                            <IconEye />
                        </ActionIcon>
                    </Tooltip>
                </Flex>
            </GroupCard>
            <Card
                h="100%"
                radius="lg"
                bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]}
                p={0}
                pl="xs"
                shadow="none"
            >
                <ScrollArea scrollbarSize={3}>TODO</ScrollArea>
            </Card>
        </Card>
    );
}

export default GettingStarted;
