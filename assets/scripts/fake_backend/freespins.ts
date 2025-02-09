import { SpecialSymbolData, SpecialSymbolType } from "scripts/model/Types";

export function generateFreeSpins(probability: number, reels: number, rows: number): SpecialSymbolData[] {
    if (Math.random() >= probability) {
        return [];
    }
    const selectedReel = Math.floor(Math.random() * reels);
    const selectedRow = Math.floor(Math.random() * rows);
    return [{ i: selectedReel, j: selectedRow, type: SpecialSymbolType.freespins }];
}

