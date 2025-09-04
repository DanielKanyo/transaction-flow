import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Unit } from "./unit";

export type Settings = {
    unit: Unit;
};

const initSettings: Settings = {
    unit: Unit.Bitcoin,
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initSettings,
    reducers: {
        updateUnit: (state, action: PayloadAction<Unit>) => {
            state.unit = action.payload;
        },
    },
});

export const { updateUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
