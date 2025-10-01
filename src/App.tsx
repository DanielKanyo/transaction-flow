import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { AnimatePresence, motion, Transition } from "framer-motion";

import { AppShell, Box, em, Flex, Grid, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useHeadroom, useMediaQuery } from "@mantine/hooks";

import "./App.css";
import DisclaimerModal from "./Components/DisclaimerModal";
import Chain from "./Layouts/Chain";
import Exchange from "./Layouts/Exchange";
import GettingStarted from "./Layouts/GettingStarted/GettingStarted";
import Header from "./Layouts/Header/Header";
import History from "./Layouts/History/History";
import MemoryPool from "./Layouts/MemoryPool";
import Wallet from "./Layouts/Wallet";
import {
    Languages,
    MODE_ANIMATION_DURATION,
    Modes,
    RESPONSIVE_BREAKPOINT,
    updateAdvancedMode,
    updateLanguage,
} from "./Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "./Store/hook";
import i18n from "./i18n/i18n";

const HEADER_HEIGHT = 70;
const CONTENT_PADDING = 10;
const GRID_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + CONTENT_PADDING}px)`;

function usePersistedSettings(language: Languages, advancedMode: boolean) {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedLanguage = localStorage.getItem("appLanguage") as Languages | null;
        const storedMode = localStorage.getItem("appMode") as Modes | null;

        if (storedLanguage && storedLanguage !== language) {
            i18n.changeLanguage(storedLanguage);
            dispatch(updateLanguage(storedLanguage));
        }

        if (storedMode && storedMode !== (advancedMode ? Modes.ADVANCED : Modes.BASIC)) {
            dispatch(updateAdvancedMode(storedMode !== Modes.BASIC));
        }
    }, [dispatch, language, advancedMode]);
}

function useMotionProps(animateHeight: string) {
    return useMemo(
        () => ({
            initial: { height: 0, opacity: 0 },
            animate: { height: animateHeight, opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: {
                duration: MODE_ANIMATION_DURATION,
                type: "spring" as Transition["type"],
                bounce: 0,
            },
            style: { overflow: "hidden" },
        }),
        [animateHeight]
    );
}

function MiddleColumn({
    advancedMode,
    gettingStartedVisible,
    isMobile,
}: {
    advancedMode: boolean;
    gettingStartedVisible: boolean;
    isMobile: boolean;
}) {
    const historyMotion = useMotionProps("110%");
    const defaultMotion = useMotionProps("69%");

    return (
        <Flex direction="column" h="100%" style={{ overflow: "hidden" }}>
            <AnimatePresence>
                {!advancedMode && gettingStartedVisible && !isMobile && (
                    <motion.div key="getting-started" {...historyMotion}>
                        <Box h="100%" pb="xs">
                            <GettingStarted />
                        </Box>
                    </motion.div>
                )}
                <motion.div key="history" {...historyMotion}>
                    <Box h="100%">
                        <History />
                    </Box>
                </motion.div>
                {advancedMode && (
                    <>
                        <motion.div key="mempool" {...defaultMotion}>
                            <Box h="100%" pt="xs">
                                <MemoryPool />
                            </Box>
                        </motion.div>
                        <motion.div key="chain" {...defaultMotion}>
                            <Box h="100%" pt="xs">
                                <Chain />
                            </Box>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Flex>
    );
}

export default function App() {
    const { advancedMode, language, gettingStartedVisible } = useAppSelector((state) => state.settings);
    const pinned = useHeadroom({ fixedAt: 120 });
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { colorScheme } = useMantineColorScheme();

    usePersistedSettings(language, advancedMode);

    const colProps = useMemo(
        () => ({
            span: { base: 12, lg: 4 },
            h: "100%",
        }),
        []
    );

    return (
        <>
            <AppShell
                data-testid="app-shell"
                header={{ height: HEADER_HEIGHT, collapsed: !pinned, offset: false }}
                padding="md"
                style={{
                    background: colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[7],
                }}
            >
                <AppShell.Header p="md">
                    <Header />
                </AppShell.Header>

                <AppShell.Main px="xs" pb={isMobile ? "xs" : 0} pt={HEADER_HEIGHT + CONTENT_PADDING}>
                    <Grid gutter="xs" h={isMobile ? "auto" : GRID_HEIGHT} classNames={{ inner: "grid-inner" }}>
                        {!advancedMode && gettingStartedVisible && isMobile && (
                            <Grid.Col {...colProps}>
                                <GettingStarted />
                            </Grid.Col>
                        )}
                        <Grid.Col {...colProps}>
                            <Exchange />
                        </Grid.Col>
                        <Grid.Col {...colProps}>
                            <MiddleColumn advancedMode={advancedMode} gettingStartedVisible={gettingStartedVisible} isMobile={isMobile} />
                        </Grid.Col>
                        <Grid.Col {...colProps}>
                            <Wallet />
                        </Grid.Col>
                    </Grid>
                </AppShell.Main>
            </AppShell>

            <DisclaimerModal />
        </>
    );
}
