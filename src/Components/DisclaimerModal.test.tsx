import { t } from "i18next";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { fireEvent, render, screen } from "../Utils/test-utils";
import DisclaimerModal from "./DisclaimerModal";

// Clear mocks before every test
beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
});

describe("DisclaimerModal component", () => {
    it("should render the disclaimer modal if not yet accepted", () => {
        render(<DisclaimerModal />);

        expect(screen.queryByText(t("disclaimer"))).toBeInTheDocument();
        expect(screen.queryByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
    });

    it("should render the translated disclaimer title", () => {
        render(<DisclaimerModal />);

        expect(screen.getByText(t("disclaimer"))).toBeInTheDocument();
    });

    it("should have the continue button disabled until checkbox is checked", () => {
        render(<DisclaimerModal />);

        const continueButton = screen.getByTestId("continue-btn");
        expect(continueButton).toBeDisabled();

        // Check the box
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(continueButton).toBeEnabled();
    });

    it("should save to localStorage and close modal when accepted", () => {
        render(<DisclaimerModal />);

        const checkbox = screen.getByRole("checkbox");
        const continueButton = screen.getByTestId("continue-btn");

        // Check the box
        fireEvent.click(checkbox);
        expect(continueButton).toBeEnabled();

        // Click continue
        fireEvent.click(continueButton);

        expect(localStorage.getItem("appDisclaimerAccepted")).toBe("true");
        expect(screen.queryByText(t("disclaimer"))).not.toBeInTheDocument();
    });

    it("should not show disclaimer modal content if already accepted", () => {
        localStorage.setItem("appDisclaimerAccepted", "true");

        render(<DisclaimerModal />);

        expect(screen.queryByText(t("disclaimer"))).not.toBeInTheDocument();
        expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });
});
