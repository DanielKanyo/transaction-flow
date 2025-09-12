import { Card, Divider, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { IconCirclesRelation, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

function Chain() {
    return (
        <Card shadow="sm" padding="md" radius="md" h="100%">
            <Card shadow="sm" padding="sm" radius="md" bg="violet" c="white" mb="sm" mih={50}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center">
                        <IconCirclesRelation />
                        Blockchain
                    </Flex>
                    <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>Bitcoin Blockchain</Text>
                                <Text fz="sm">
                                    The Bitcoin blockchain is a <b>public record book</b> that keeps track of every Bitcoin transaction ever
                                    made. Instead of being stored in one place, it's shared across thousands of computers worldwide. When
                                    you send Bitcoin, your transaction first waits in the mempool (the queue). Once a miner includes it in a
                                    new block, it gets added to the blockchain.
                                </Text>
                                <Divider />
                                <Text fz="sm">
                                    Blocks are linked one after another, forming a secure <b>chain of blocks</b>. This makes Bitcoin{" "}
                                    <b>transparent and tamper-proof</b> - once a transaction is in the blockchain, it cannot be changed or
                                    deleted.
                                </Text>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
            </Card>
        </Card>
    );
}

export default Chain;
