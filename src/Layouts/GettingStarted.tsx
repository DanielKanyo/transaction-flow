import { useTranslation } from "react-i18next";
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
import { IconEye, IconCheck, IconBulbFilled, IconList, IconFlagFilled, IconConfetti } from "@tabler/icons-react";

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
            <GroupCard bgImage="linear-gradient(90deg, var(--mantine-color-violet-filled), var(--mantine-color-violet-5))">
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconBulbFilled />
                        {t("gettingStarted")}
                    </Flex>
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
                <ScrollArea scrollbarSize={3}>
                    {/* TODO: Translations */}
                    <Stack gap="xs" my="xs" me="xs">
                        <Card shadow="xs" padding="lg" radius="lg" bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}>
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconFlagFilled /> Welcome!
                                    </Flex>
                                </Title>
                                <Text size="sm" c="dimmed">
                                    TX Flow is designed to help you understand the basics of how Bitcoin transactions work - step by step
                                    and without using any real coins.
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Instead of working with full wallets, the focus here is on practical scenarios: sending Bitcoin between
                                    an <b>exchange</b> and a <b>wallet</b>, and managing your
                                    <b> unspent transaction outputs (UTXOs)</b>.
                                </Text>
                            </Stack>
                        </Card>

                        <Card shadow="xs" padding="lg" radius="lg" bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}>
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconList /> What you can do here
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
                                    <List.Item>
                                        Simulate sending Bitcoin from an <b>exchange</b> to a <b>wallet</b> and back
                                    </List.Item>
                                    <List.Item>
                                        Practice <b>UTXO consolidation</b> to learn why it matters
                                    </List.Item>
                                    <List.Item>
                                        Toggle <b>advanced mode</b> for a more realistic simulation
                                    </List.Item>
                                    <List.Item>
                                        Explore transaction details like <b>inputs</b>, <b>outputs</b>, and <b>fees</b>
                                    </List.Item>
                                </List>
                            </Stack>
                        </Card>

                        <Card shadow="xs" padding="lg" radius="lg" bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}>
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconBulbFilled /> Next steps
                                    </Flex>
                                </Title>
                                <Text size="sm" c="dimmed">
                                    You begin with <b>1 Bitcoin</b> stored on your exchange account. Your first step is to send some BTC
                                    from the exchange to your wallet and observe how the transaction is structured. From there, you can try
                                    sending it back to the exchange or experiment with <b>UTXO consolidation</b> to see how multiple smaller
                                    outputs can be combined.
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Use <b>advanced mode</b> to dive deeper into the mechanics of Bitcoin transactions and explore them in
                                    greater detail.
                                </Text>
                            </Stack>
                        </Card>
                        <Card shadow="xs" padding="lg" radius="lg" bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}>
                            <Stack>
                                <Title order={4}>
                                    <Flex align="center" gap="xs">
                                        <IconConfetti /> Ready to explore?
                                    </Flex>
                                </Title>
                                <Text size="sm" c="dimmed">
                                    Start your first transaction and see Bitcoin in action!
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
