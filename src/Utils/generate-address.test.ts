import { describe, it, expect } from "vitest";

import { generateDummyBTCAddress } from "./generate-address";

// Mock randomHex separately if needed
function isHex(str: string): boolean {
    return /^[0-9a-f]+$/i.test(str);
}

describe("generateDummyBTCAddress", () => {
    it("should generate a string starting with default prefix 'bc1q'", () => {
        const address = generateDummyBTCAddress();
        expect(address.startsWith("bc1q")).toBe(true);
        expect(address.length).toBeGreaterThan(4); // basic sanity check
    });

    it("should generate a string starting with custom prefix", () => {
        const prefix = "tb1q";
        const address = generateDummyBTCAddress(prefix);
        expect(address.startsWith(prefix)).toBe(true);
    });

    it("should generate a hex string of correct length after prefix", () => {
        const prefix = "bc1q";
        const address = generateDummyBTCAddress(prefix);
        const hexPart = address.slice(prefix.length);
        expect(hexPart.length).toBe(40);
        expect(isHex(hexPart)).toBe(true);
    });

    it("should generate different addresses on multiple calls", () => {
        const addr1 = generateDummyBTCAddress();
        const addr2 = generateDummyBTCAddress();
        expect(addr1).not.toBe(addr2);
    });
});
