import { AppShell, Flex, Grid } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Chain from "./Components/Chain/Chain";
import Exchange from "./Components/Exchange/Exchange";
import Header from "./Components/Header/Header";
import History from "./Components/History/History";
import Mempool from "./Components/Mempool/Mempool";
import Wallet from "./Components/Wallet/Wallet";

const HEADER_HEIGHT = 70;
const CONTENT_PADDING = 10;
const GRID_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + CONTENT_PADDING}px)`;

export default function App() {
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
                        <Flex direction="column" gap="xs" h="100%">
                            <History />
                            <Mempool />
                            <Chain />
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
