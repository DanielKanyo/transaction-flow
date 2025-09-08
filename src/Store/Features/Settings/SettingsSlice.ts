import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const DEFAULT_NUMBER_OF_DIGITS = {
    BTC: 6,
    SAT: 0,
};

export enum Languages {
    English = "en",
    German = "de",
    Spanish = "es",
    Hungarian = "hu",
}

export enum Units {
    Bitcoin = "btc",
    Satoshi = "sat",
}

export type Settings = {
    unit: Units;
    language: Languages;
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
        updateLanguage: (state, action: PayloadAction<Languages>) => {
            state.language = action.payload;
        },
    },
});

export const { updateUnit, updateLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
