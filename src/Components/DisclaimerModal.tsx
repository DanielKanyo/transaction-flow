import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Modal, Button, Checkbox, Text, Stack, Title, Divider, Group } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

import { COLORS } from "../Utils/colors";
import LanguageSelect from "./Settings/LanguageSelect";

function DisclaimerModal() {
    const [opened, setOpened] = useState(false);
    const [checked, setChecked] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const accepted = localStorage.getItem("appDisclaimerAccepted");

        if (!accepted) {
            setOpened(true);
        }
    }, []);

    const handleAccept = () => {
        if (checked) {
            localStorage.setItem("appDisclaimerAccepted", "true");
            setOpened(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={() => {}}
            withCloseButton={false}
            centered
            radius="lg"
            overlayProps={{
                backgroundOpacity: 0.6,
                blur: 3,
            }}
            closeButtonProps={{
                radius: "xl",
            }}
        >
            <Stack gap="lg" px="lg" py="md">
                <Group align="center">
                    <IconAlertTriangleFilled />
                    <Title order={3}>{t("disclaimer")}</Title>
                </Group>

                <LanguageSelect />

                <Text size="sm">
                    <Trans
                        i18nKey="disclaimerPart1"
                        components={{
                            bold: <b />,
                        }}
                    />
                </Text>

                <Text size="sm">
                    <Trans
                        i18nKey="disclaimerPart2"
                        components={{
                            bold: <b />,
                        }}
                    />
                </Text>

                <Text size="sm">
                    <Trans
                        i18nKey="disclaimerPart3"
                        components={{
                            bold: <b />,
                        }}
                    />
                </Text>

                <Divider />

                <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                    label={t("disclaimerPart4")}
                    radius="sm"
                    color="violet"
                />

                <Button
                    data-testid="continue-btn"
                    onClick={handleAccept}
                    disabled={!checked}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "violet", to: COLORS.PURPLE, deg: 90 }}
                    style={{ border: 0 }}
                >
                    {t("continue")}
                </Button>
            </Stack>
        </Modal>
    );
}

export default DisclaimerModal;
