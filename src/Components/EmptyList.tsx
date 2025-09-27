import { Flex, Text } from "@mantine/core";
import { IconPlaylistX } from "@tabler/icons-react";

interface EmptyListProps {
    text: string;
}

function EmptyList({ text }: EmptyListProps) {
    return (
        <Flex p="xs" direction="column" align="center" w="100%" gap={3}>
            <IconPlaylistX color="gray" size={38} />
            <Text c="dimmed">{text}</Text>
        </Flex>
    );
}

export default EmptyList;
