import { describe, it, expect } from "vitest";

import { render, screen } from "../../../test-utils";
import Header from "./Header";

describe("Header component", () => {
    it("renders the TX FLOW title", () => {
        render(<Header />);

        expect(screen.getByText("TX")).toBeInTheDocument();
        expect(screen.getByText("FLOW")).toBeInTheDocument();
    });

    it("renders the bolt icon", () => {
        render(<Header />);

        expect(screen.getByTestId("icon-bolt")).toBeInTheDocument();
    });
});
