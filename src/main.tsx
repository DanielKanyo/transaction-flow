import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App.tsx";
import store from "./Store/store.ts";
import { theme } from "./Theme/theme.ts";
import "./i18n/i18n.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Provider store={store}>
                <App />
            </Provider>
        </MantineProvider>
    </React.StrictMode>
);
