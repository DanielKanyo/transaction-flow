import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const DEFAULT_NUMBER_OF_DIGITS = {
    BTC: 6,
    SAT: 0,
};

export enum Languages {
    English = "en",
    Hungarian = "hu",
}

export enum Units {
    Bitcoin = "btc",
    Satoshi = "sat",
}

export enum Modes {
    BASIC = "basic",
    ADVANCED = "advanced",
}

export type Settings = {
    unit: Units;
    language: Languages;
    advancedMode: boolean;
};

const initSettings: Settings = {
    unit: Units.Bitcoin,
    language: Languages.English,
    advancedMode: false,
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initSettings,
    reducers: {
        updateUnit: (state, action: PayloadAction<Units>) => {
            state.unit = action.payload;
        },
        updateLanguage: (state, action: PayloadAction<Languages>) => {
            state.language = action.payload;
        },
        updateAdvancedMode: (state, action: PayloadAction<boolean>) => {
            state.advancedMode = action.payload;
        },
    },
});

export const { updateUnit, updateLanguage, updateAdvancedMode } = settingsSlice.actions;
export default settingsSlice.reducer;
