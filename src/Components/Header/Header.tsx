import { Flex } from "@mantine/core";
import { IconTransactionBitcoin } from "@tabler/icons-react";

function Header() {
    return (
        <Flex align="center" h="100%" lh={1}>
            <Flex align="center" gap="sm">
                <IconTransactionBitcoin />
                Transaction Flow
            </Flex>
        </Flex>
    );
}

export default Header;
