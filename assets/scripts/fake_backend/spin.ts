import { SymbolType } from "scripts/model/Types";

export const NUM_REELS = 6; // Количество барабановs
export const REEL_LENGTH = 100; // Длина каждого барабана

// Вероятности выпадения символов (low-pay встречаются чаще, high-pay реже)
export const symbolWeights: Record<number, number> = {
    0: 20, 1: 18, 2: 16, 3: 14, 4: 12,
    5: 2, 6: 2, 7: 3, 8: 2, 9: 2
};

// Функция случайного выбора символа по весам
export function getRandomSymbol(): number {
    const symbols = Object.keys(symbolWeights).map(Number) as number[]; // Преобразуем строки в числа
    const weights = Object.values(symbolWeights);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let rand = Math.random() * totalWeight;

    for (let i = 0; i < symbols.length; i++) {
        if (rand < weights[i]) {
            return symbols[i]; // Теперь тип `SymbolType` корректный
        }
        rand -= weights[i];
    }
    return symbols[symbols.length - 1]; // fallback (не должно срабатывать)
}

// Функция генерации ленты для одного барабана
export function generateReel(): number[] {
    const reel: number[] = [];
    for (let i = 0; i < REEL_LENGTH; i++) {
        reel.push(getRandomSymbol());
    }
    return reel;
}

export function getSubsequence(sequence: SymbolType[], length: number): SymbolType[] {
    let start = Math.floor(Math.random() * sequence.length);
    let subsequence = [];
    for (let i = 0; i < length; i++) {
        subsequence.push(sequence[(start + i) % sequence.length]);
    }
    return subsequence;
}
