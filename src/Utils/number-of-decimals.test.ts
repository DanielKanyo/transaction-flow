import { describe, it, expect } from "vitest";

import { Units, DEFAULT_NUMBER_OF_DIGITS } from "../Store/Features/Settings/SettingsSlice";
import { btcToSat } from "./btc-to-sat-converter";
import { determineDisplayedValueAndNumOfDecimals } from "./number-of-decimals";

describe("determineDisplayedValueAndNumOfDecimals", () => {
    it("should return 0 with default BTC decimals when value is 0 and unit is Bitcoin", () => {
        const result = determineDisplayedValueAndNumOfDecimals(0, Units.Bitcoin);

        expect(result).toEqual({
            displayedValue: 0,
            numOfDecimals: DEFAULT_NUMBER_OF_DIGITS.BTC,
        });
    });

    it("should return 0 with SAT decimals when value is 0 and unit is Satoshi", () => {
        const result = determineDisplayedValueAndNumOfDecimals(0, Units.Satoshi);

        expect(result).toEqual({
            displayedValue: 0,
            numOfDecimals: DEFAULT_NUMBER_OF_DIGITS.SAT,
        });
    });

    it("should return the same value and BTC decimals when unit is Bitcoin", () => {
        const value = 0.12345678;
        const result = determineDisplayedValueAndNumOfDecimals(value, Units.Bitcoin);

        expect(result).toEqual({
            displayedValue: value,
            numOfDecimals: DEFAULT_NUMBER_OF_DIGITS.BTC,
        });
    });

    it("should convert BTC to satoshis and uses 0 decimals when unit is Satoshi", () => {
        const btcValue = 1.23;
        const result = determineDisplayedValueAndNumOfDecimals(btcValue, Units.Satoshi);

        expect(result).toEqual({
            displayedValue: btcToSat(btcValue), // 123000000
            numOfDecimals: 0,
        });
    });

    it("should handle the smallest BTC fraction (1 satoshi)", () => {
        const btcValue = 0.00000001;
        const result = determineDisplayedValueAndNumOfDecimals(btcValue, Units.Satoshi);

        expect(result).toEqual({
            displayedValue: 1,
            numOfDecimals: 0,
        });
    });
});
