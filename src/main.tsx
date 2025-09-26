import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App.tsx";
import { theme } from "./Config/Theme/theme.ts";
import store from "./Store/store.ts";
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
