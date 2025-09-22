import { describe, it, expect } from "vitest";

import { render, screen } from "../test-utils";
import App from "./App";

describe("App component", () => {
    it("should render the AppShell component", () => {
        render(<App />);

        expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    });
});
