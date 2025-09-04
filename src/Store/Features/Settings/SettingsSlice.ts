import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Languages } from "./language";
import { Units } from "./unit";

export type Settings = {
    unit: Units;
    language: string;
};

const initSettings: Settings = {
    unit: Units.Bitcoin,
    language: Languages.English,
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initSettings,
    reducers: {
        updateUnit: (state, action: PayloadAction<Units>) => {
            state.unit = action.payload;
        },
        updateLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    },
});

export const { updateUnit, updateLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
