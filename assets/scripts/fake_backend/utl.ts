import { SpecialSymbolData } from "scripts/model/Types";
import SymbolsSettings from "scripts/settings/SymbolsSettings";

export function generateSequence() {
    let sequence = [];
    for (let i = 0; i < 100; i++) {
        sequence.push(Math.floor(Math.random() * 9));
    }
    return sequence;
}

export function getSubsequence(sequence: number[], length: number, manualStart: number = -1): number[] {
    let start: number = manualStart === -1 ? Math.floor(Math.random() * sequence.length) : manualStart;
    let subsequence: number[] = [];
    for (let i = 0; i < length; i++) {
        subsequence.push(sequence[(start + i) % sequence.length]);
    }
    return subsequence;
}

export function findSymbolPositions(reels: number[][], targetSymbol: number): SpecialSymbolData[] {
    const positions: SpecialSymbolData[] = [];

    for (let i = 0; i < reels.length; i++) {
        for (let j = 0; j < reels[i].length; j++) {
            if (reels[i][j] === targetSymbol) {
                positions.push({ type: SymbolsSettings.symbols[targetSymbol], i, j });
            }
        }
    }

    return positions;
}
