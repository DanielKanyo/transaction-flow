import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AnimatePresence, motion, Transition } from "framer-motion";

import { AppShell, Box, em, Flex, Grid } from "@mantine/core";
import { useHeadroom, useMediaQuery } from "@mantine/hooks";

import "./App.css";
import DisclaimerModal from "./Components/DisclaimerModal";
import Chain from "./Layouts/Chain";
import Exchange from "./Layouts/Exchange";
import GettingStarted from "./Layouts/GettingStarted";
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

export default function App() {
    const { advancedMode, language, gettingStartedVisible } = useAppSelector((state) => state.settings);
    const pinned = useHeadroom({ fixedAt: 120 });
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
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

    const colProps = {
        span: { base: 12, lg: 4 },
        h: "100%",
    };

    const motionPropsBase = {
        initial: { height: 0, opacity: 0 },
        exit: { height: 0, opacity: 0 },
        transition: {
            duration: MODE_ANIMATION_DURATION,
            type: "spring" as Transition["type"],
            bounce: 0,
        },
        style: { overflow: "hidden" },
    };

    const motionPropsHistoryAndGettingStarted = {
        ...motionPropsBase,
        animate: { height: "110%", opacity: 1 },
    };

    const motionPropsDefault = {
        ...motionPropsBase,
        animate: { height: "69%", opacity: 1 },
    };

    return (
        <>
            <AppShell data-testid="app-shell" header={{ height: HEADER_HEIGHT, collapsed: !pinned, offset: false }} padding="md">
                <AppShell.Header p="md">
                    <Header />
                </AppShell.Header>

                <AppShell.Main px="xs" pb={isMobile ? "xs" : 0} pt={HEADER_HEIGHT + CONTENT_PADDING}>
                    <Grid gutter="xs" h={isMobile ? "auto" : GRID_HEIGHT} classNames={{ inner: "grid-inner" }}>
                        <Grid.Col {...colProps}>
                            <Exchange />
                        </Grid.Col>
                        <Grid.Col {...colProps}>
                            <Flex direction="column" h="100%" style={{ overflow: "hidden" }}>
                                <AnimatePresence>
                                    {!advancedMode && gettingStartedVisible && (
                                        <motion.div key="getting-started" {...motionPropsHistoryAndGettingStarted}>
                                            <Box h="100%">
                                                <GettingStarted />
                                            </Box>
                                        </motion.div>
                                    )}
                                    <motion.div key="history" {...motionPropsHistoryAndGettingStarted}>
                                        <Box h="100%" pt="xs">
                                            <History />
                                        </Box>
                                    </motion.div>
                                    {advancedMode && (
                                        <>
                                            <motion.div key="mempool" {...motionPropsDefault}>
                                                <Box h="100%" pt="xs">
                                                    <MemoryPool />
                                                </Box>
                                            </motion.div>

                                            <motion.div key="chain" {...motionPropsDefault}>
                                                <Box h="100%" pt="xs">
                                                    <Chain />
                                                </Box>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </Flex>
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
