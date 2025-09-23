import { t } from "i18next";

import { Modes } from "../../../../Store/Features/Settings/SettingsSlice";
import { fireEvent, render, screen } from "../../../../Utils/test-utils";
import ModeControl from "./ModeControl";

describe("ModeControl", () => {
    it("should render two segment control items", () => {
        render(<ModeControl />);

        expect(screen.getByText(t(Modes.BASIC))).toBeInTheDocument();
        expect(screen.getByText(t(Modes.ADVANCED))).toBeInTheDocument();
    });

    it("should set the 'appMode' to 'ADVANCED' in local storage when switching to ADVANCED mode", () => {
        render(<ModeControl />);

        const advancedOption = screen.getByText(t(Modes.ADVANCED));
        fireEvent.click(advancedOption);

        expect(localStorage.getItem("appMode")).toBe(Modes.ADVANCED);
    });
});
