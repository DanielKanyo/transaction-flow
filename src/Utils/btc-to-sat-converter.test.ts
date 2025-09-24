import { describe, it, expect } from "vitest";
import { btcToSat } from "./btc-to-sat-converter";

describe("btcToSat", () => {
    it("should convert number in BTC to number in sats", () => {
        expect(btcToSat(1)).toEqual(100_000_000);
        expect(btcToSat(5.5)).toEqual(550_000_000);
    });
});
