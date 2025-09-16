import { motion, AnimatePresence } from "framer-motion";

import { Card, Divider, Flex, HoverCard, Stack, Text, useMantineColorScheme, useMantineTheme, Box, Center } from "@mantine/core";
import { IconBox, IconCirclesRelation, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { useAppSelector } from "../../Store/hook";

const FadeOverlay = () => {
    const { colorScheme } = useMantineColorScheme();

    const background =
        colorScheme === "dark"
            ? "linear-gradient(90deg, rgba(59, 59, 59, 0.9) 0%, rgba(255, 255, 255, 0) 100%)"
            : "linear-gradient(90deg, rgba(241, 243, 245, 0.9) 0%, rgba(255, 255, 255, 0) 100%)";

    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                background,
                zIndex: 10,
                pointerEvents: "none",
            }}
        />
    );
};

function Chain() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const { blockchain, enteringBlockId } = useAppSelector((state) => state.ledger);

    return (
        <Card shadow="sm" padding="md" radius="md" h="100%">
            {/* Header */}
            <Card shadow="sm" padding="sm" radius="md" bg="violet" c="white" mb="sm" mih={50} mah={50}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconCirclesRelation />
                        Blockchain
                    </Flex>
                    <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end" radius="md">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>Bitcoin Blockchain</Text>
                                <Text fz="sm">
                                    The Bitcoin blockchain is a <b>public record book</b> that keeps track of every Bitcoin transaction ever
                                    made...
                                </Text>
                                <Divider />
                                <Text fz="sm">
                                    Blocks are linked one after another, forming a secure <b>chain of blocks</b>.
                                </Text>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
            </Card>

            {/* Blockchain visualization */}
            <Card
                h="100%"
                radius="md"
                bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]}
                px={0}
                py="sm"
                shadow="none"
            >
                <FadeOverlay />
                <Box style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                    <Flex gap={0} align="center" wrap="nowrap" justify="flex-end" h="100%" me="sm">
                        <AnimatePresence initial={false}>
                            {blockchain.map((block, idx) => (
                                <motion.div
                                    key={block.id}
                                    layout="position"
                                    // only the true entering block gets the "drop from top" initial animation
                                    initial={block.id === enteringBlockId ? { opacity: 0, y: -50 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -80 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    style={{ display: "flex", alignItems: "center", height: "100%" }}
                                >
                                    {/* Block */}
                                    <Center h="100%" pos="relative">
                                        <IconBox
                                            size={82}
                                            color={colorScheme === "light" ? theme.colors.gray[7] : theme.colors.gray[2]}
                                            style={{ zIndex: 2 }}
                                        />
                                        {block.highlightTransaction ? (
                                            <Box
                                                pos="absolute"
                                                h={30}
                                                w={30}
                                                style={{ borderRadius: "50%", zIndex: 1 }}
                                                className="transaction"
                                            ></Box>
                                        ) : null}
                                    </Center>

                                    {/* Connector */}
                                    {idx < blockchain.length - 1 && (
                                        <Box
                                            style={{
                                                height: 4,
                                                width: 50,
                                                backgroundColor: colorScheme === "light" ? theme.colors.gray[7] : theme.colors.gray[4],
                                                marginLeft: 4,
                                                marginRight: 4,
                                                borderRadius: 2,
                                            }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Flex>
                </Box>
            </Card>
        </Card>
    );
}

export default Chain;
