import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
    ActionIcon,
    Card,
    em,
    Flex,
    ScrollArea,
    Stack,
    Tooltip,
    Text,
    Title,
    List,
    ThemeIcon,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconBulbFilled, IconList, IconFlagFilled, IconConfetti, IconEyeClosed } from "@tabler/icons-react";

import GroupCard from "../../Components/GroupCard";
import { RESPONSIVE_BREAKPOINT, updateGettingStartedVisible } from "../../Store/Features/Settings/SettingsSlice";
import { COLORS } from "../../Utils/colors";
import classes from "./GettingStarted.module.css";

const WHAT_CAN_YOU_DO_HERE_TRANSLATION_KEY_LIST = [
    "whatYouCanDoHereListItem1",
    "whatYouCanDoHereListItem2",
    "whatYouCanDoHereListItem3",
    "whatYouCanDoHereListItem4",
];

function GettingStarted() {
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <Card shadow="sm" padding={isMobile ? "xs" : "md"} radius="lg" h="100%">
            <GroupCard bgImage={`linear-gradient(90deg, ${COLORS.VIOLET}, ${COLORS.PURPLE})`}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconBulbFilled />
                        {t("gettingStarted")}
                    </Flex>
                    <Tooltip label={t("hideGettingStarted")} withArrow radius="xl">
                        <ActionIcon
                            variant="subtle"
                            color="white"
                            radius="lg"
                            aria-label="toggle-getting-started"
                            onClick={() => dispatch(updateGettingStartedVisible(false))}
                        >
                            <IconEyeClosed />
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
                <ScrollArea classNames={{ viewport: isMobile ? classes.viewport : undefined }} scrollbarSize={3}>
                    <Stack gap="xs" my="xs" me="xs">
                        <Card
                            data-testid="welcome-card"
                            shadow="xs"
                            padding="lg"
                            radius="lg"
                            bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}
                        >
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconFlagFilled /> {t("welcome")}
                                    </Flex>
                                </Title>
                                <Text size="sm" c="dimmed">
                                    {t("welcomeText1")}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    <Trans
                                        i18nKey="welcomeText2"
                                        components={{
                                            bold: <b />,
                                        }}
                                    />
                                </Text>
                            </Stack>
                        </Card>

                        <Card
                            data-testid="what-can-you-do-here-card"
                            shadow="xs"
                            padding="lg"
                            radius="lg"
                            bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}
                        >
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconList /> {t("whatYouCanDoHere")}
                                    </Flex>
                                </Title>
                                <List
                                    spacing="xs"
                                    size="sm"
                                    icon={
                                        <ThemeIcon color="violet" size={18} radius="xl">
                                            <IconCheck size={12} />
                                        </ThemeIcon>
                                    }
                                    c="dimmed"
                                >
                                    {WHAT_CAN_YOU_DO_HERE_TRANSLATION_KEY_LIST.map((key) => (
                                        <List.Item key={key}>
                                            <Trans i18nKey={key} components={{ bold: <b /> }} />
                                        </List.Item>
                                    ))}
                                </List>
                            </Stack>
                        </Card>

                        <Card
                            data-testid="next-steps-card"
                            shadow="xs"
                            padding="lg"
                            radius="lg"
                            bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}
                        >
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconBulbFilled /> {t("nextSteps")}
                                    </Flex>
                                </Title>
                                <Text size="sm" c="dimmed">
                                    <Trans
                                        i18nKey="nextStepsText1"
                                        components={{
                                            bold: <b />,
                                        }}
                                    />
                                </Text>
                                <Text size="sm" c="dimmed">
                                    <Trans
                                        i18nKey="nextStepsText2"
                                        components={{
                                            bold: <b />,
                                        }}
                                    />
                                </Text>
                            </Stack>
                        </Card>
                        <Card
                            data-testid="ready-to-explore-card"
                            shadow="xs"
                            padding="lg"
                            radius="lg"
                            bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}
                        >
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconConfetti /> {t("readyToExplore")}
                                    </Flex>
                                </Title>
                                <Text size="sm" c="dimmed">
                                    {t("readyToExploreText1")}
                                </Text>
                            </Stack>
                        </Card>
                    </Stack>
                </ScrollArea>
            </Card>
        </Card>
    );
}

export default GettingStarted;
