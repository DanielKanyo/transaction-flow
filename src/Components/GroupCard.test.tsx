import { describe, it, expect } from "vitest";

import { render, screen } from "../Utils/test-utils";
import GroupCard from "./GroupCard";

describe("GroupCard component", () => {
    it("should render the group card component", () => {
        render(
            <GroupCard bgImage="linear-gradient(90deg, red, blue)">
                <div data-testid="child-element">Child Content</div>
            </GroupCard>
        );

        const card = screen.getByTestId("group-card");

        // Check if the card is in the document
        expect(card).toBeInTheDocument();

        // Check if the backgroundImage style is applied
        expect(card).toHaveStyle({
            backgroundImage: "linear-gradient(90deg, red, blue)",
        });

        // Check if the children are rendered
        expect(screen.getByTestId("child-element")).toBeInTheDocument();
        expect(screen.getByText("Child Content")).toBeInTheDocument();
    });
});
