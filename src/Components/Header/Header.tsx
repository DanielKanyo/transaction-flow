import { Flex } from "@mantine/core";
import { IconTransfer } from "@tabler/icons-react";

function Header() {
    return (
        <Flex align="center" h="100%" lh={1}>
            <Flex align="center" gap="sm">
                <IconTransfer />
                Transaction Flow
            </Flex>
        </Flex>
    );
}

export default Header;
