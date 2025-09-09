import { Card, Divider, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { IconCategory2, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

function MemoryPool() {
    return (
        <Card shadow="sm" padding="md" radius="md" h="80%">
            <Card shadow="sm" padding="sm" radius="md" bg="dark" c="white" mb="sm" mih={50}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center">
                        <IconCategory2 />
                        Memory Pool
                    </Flex>
                    <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>Memory Pool (Mempool)</Text>
                                <Text fz="sm">
                                    When you send a Bitcoin transaction, it doesn't go straight into the blockchain. First, it enters a
                                    waiting area called the memory pool (or <i>mempool</i> for short). Think of it like a{" "}
                                    <b>queue at the post office</b>: your transaction waits there until a miner picks it up and includes it
                                    in the next block.
                                </Text>
                                <Divider />
                                <Text fz="sm">
                                    If you set a <b>higher fee</b>, your transaction usually gets picked faster. If the fee is low, it may
                                    stay longer in the mempool until space is available.
                                </Text>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
            </Card>
        </Card>
    );
}

export default MemoryPool;
