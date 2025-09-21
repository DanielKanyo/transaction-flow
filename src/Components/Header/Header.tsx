import { useState } from "react";

import { Burger, Flex, Group, Text } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";

import Donate from "./Donate/Donate";
import ResetButton from "./Settings/ResetButton";
import SettingsDrawer from "./Settings/SettingsDrawer/SettingsDrawer";
import SettingsMenu from "./Settings/SettingsMenu";

function Header() {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Flex align="center" justify="space-between" h="100%" lh={1}>
                <Flex align="center" gap="xs">
                    <IconBolt size={28} />
                    <Group gap={4}>
                        <Text fw={800} fz={28} fs="italic" lh={1} c="violet">
                            TX
                        </Text>
                        <Text fw={400} fz={28} fs="italic" lh={1}>
                            FLOW
                        </Text>
                    </Group>
                </Flex>

                <Burger hiddenFrom="sm" opened={opened} onClick={() => setOpened((o) => !o)} aria-label="Toggle drawer" size="sm" />

                <Group gap="xs" visibleFrom="sm">
                    <ResetButton />
                    <Donate />
                    <SettingsMenu />
                </Group>
            </Flex>

            <SettingsDrawer opened={opened} setOpened={setOpened} />
        </>
    );
}

export default Header;
