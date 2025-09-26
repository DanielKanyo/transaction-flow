import { describe, it, expect } from "vitest";

import { render, screen } from "../../Utils/test-utils";
import GettingStarted from "./GettingStarted";

describe("GettingStarted component", () => {
    it("should render getting started cards", () => {
        render(<GettingStarted />);

        expect(screen.getByTestId("welcome-card")).toBeInTheDocument();
        expect(screen.getByTestId("what-can-you-do-here-card")).toBeInTheDocument();
        expect(screen.getByTestId("next-steps-card")).toBeInTheDocument();
        expect(screen.getByTestId("ready-to-explore-card")).toBeInTheDocument();
    });
});
