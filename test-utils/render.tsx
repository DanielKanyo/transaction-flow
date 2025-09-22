import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import { render as testingLibraryRender } from "@testing-library/react";

import store from "../src/Store/store";
import { theme } from "../src/Theme/theme";

export function render(ui: React.ReactNode, { store: customStore = store, ...renderOptions }: { store?: typeof store } = {}) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <Provider store={customStore}>
                <MantineProvider theme={theme} env="test">
                    {children}
                </MantineProvider>
            </Provider>
        );
    }

    return testingLibraryRender(ui, { wrapper: Wrapper, ...renderOptions });
}
