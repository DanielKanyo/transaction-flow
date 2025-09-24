import { Card } from "@mantine/core";

interface GroupCardProps {
    bgImage: string;
    children: React.ReactNode;
}

function GroupCard({ bgImage, children }: GroupCardProps) {
    return (
        <Card
            data-testid="group-card"
            shadow="sm"
            padding="sm"
            radius="lg"
            c="white"
            mb="sm"
            mih={52}
            mah={52}
            style={{
                justifyContent: "center",
                backgroundImage: bgImage,
            }}
        >
            {children}
        </Card>
    );
}

export default GroupCard;
