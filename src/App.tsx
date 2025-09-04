import { AppShell, Grid, Paper } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Header from "./Components/Header/Header";

const HEADER_HEIGHT = 60;
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
                        <Paper shadow="xl" p="md" h="100%" withBorder>
                            Column 1
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4 }} h="100%">
                        <Paper shadow="xl" p="md" h="100%" withBorder>
                            Column 2
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4 }} h="100%">
                        <Paper shadow="xl" p="md" h="100%" withBorder>
                            Column 3
                        </Paper>
                    </Grid.Col>
                </Grid>
            </AppShell.Main>
        </AppShell>
    );
}
