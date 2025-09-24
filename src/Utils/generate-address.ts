// Generate a random hex string of given length
function randomHex(length: number): string {
    const bytes = new Uint8Array(length / 2);
    window.crypto.getRandomValues(bytes); // browser crypto
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Generate a dummy BTC address (not valid, but looks realistic)
export function generateDummyBTCAddress(prefix: string = "bc1q"): string {
    const hex = randomHex(40); // 20 bytes -> 40 hex chars
    return prefix + hex;
}
