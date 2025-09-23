import { describe, it, expect } from "vitest";

import App from "./App";
import { render, screen } from "./Utils/test-utils";

describe("App component", () => {
    it("should render the AppShell component", () => {
        render(<App />);

        expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    });
});
