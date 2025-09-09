import { DEFAULT_NUMBER_OF_DIGITS, Units } from "../Store/Features/Settings/SettingsSlice";
import { btcToSat } from "./btc-to-sat-converter";

export const determineDisplayedValueAndNumOfDecimals = (value: number, unit: Units): { displayedValue: number; numOfDecimals: number } => {
    if (!value) {
        return {
            displayedValue: 0,
            numOfDecimals: unit === Units.Bitcoin ? DEFAULT_NUMBER_OF_DIGITS.BTC : DEFAULT_NUMBER_OF_DIGITS.SAT,
        };
    }

    return {
        displayedValue: unit === Units.Bitcoin ? value : btcToSat(value),
        numOfDecimals: unit === Units.Bitcoin ? DEFAULT_NUMBER_OF_DIGITS.BTC : 0,
    };
};
