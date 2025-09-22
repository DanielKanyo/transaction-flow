import { defineConfig, UserConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./vitest.setup.mjs",
    },
} as UserConfig);
