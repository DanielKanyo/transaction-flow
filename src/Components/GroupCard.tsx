import { Card } from "@mantine/core";

interface GroupCardProps {
    bg: string;
    children: React.ReactNode;
}

function GroupCard({ bg, children }: GroupCardProps) {
    return (
        <Card
            shadow="sm"
            padding="sm"
            radius="lg"
            c="white"
            mb="sm"
            mih={52}
            mah={52}
            style={{
                justifyContent: "center",
                backgroundImage: bg,
            }}
        >
            {children}
        </Card>
    );
}

export default GroupCard;
