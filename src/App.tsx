import { AnimatePresence, motion } from "framer-motion";

import { AppShell, Box, Flex, Grid } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Chain from "./Components/Chain/Chain";
import Exchange from "./Components/Exchange/Exchange";
import Header from "./Components/Header/Header";
import History from "./Components/History/History";
import MemoryPool from "./Components/MemoryPool/MemoryPool";
import Wallet from "./Components/Wallet/Wallet";
import { useAppSelector } from "./Store/hook";

const HEADER_HEIGHT = 70;
const CONTENT_PADDING = 10;
const GRID_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + CONTENT_PADDING}px)`;

export default function App() {
    const { advancedMode } = useAppSelector((state) => state.settings);
    const pinned = useHeadroom({ fixedAt: 120 });

    return (
        <AppShell header={{ height: HEADER_HEIGHT, collapsed: !pinned, offset: false }} padding="md">
            <AppShell.Header p="md">
                <Header />
            </AppShell.Header>

            <AppShell.Main px="xs" pb={0} pt={HEADER_HEIGHT + CONTENT_PADDING}>
                <Grid gutter="xs" h={GRID_HEIGHT} classNames={{ inner: "grid-inner" }}>
                    <Grid.Col span={{ base: 12, lg: 4 }} h="100%">
                        <Exchange />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4 }} h="100%">
                        <Flex direction="column" h="100%">
                            <History />
                            <AnimatePresence>
                                {advancedMode && (
                                    <>
                                        <motion.div
                                            key="mempool"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "68%", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, type: "spring", bounce: 0 }}
                                        >
                                            <Box h="100%" pt="xs">
                                                <MemoryPool />
                                            </Box>
                                        </motion.div>

                                        <motion.div
                                            key="chain"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "68%", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, type: "spring", bounce: 0, delay: 0.1 }}
                                        >
                                            <Box h="100%" pt="xs">
                                                <Chain />
                                            </Box>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4 }} h="100%">
                        <Wallet />
                    </Grid.Col>
                </Grid>
            </AppShell.Main>
        </AppShell>
    );
}
