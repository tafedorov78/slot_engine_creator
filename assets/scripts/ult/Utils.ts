import { SpinData, SpecialSymbolData, SpecialSymbolType, WaysData } from "scripts/model/Types";
import GameSettings from "scripts/settings/GameSettings";

export function checkForSpecialSymbols(spinData: SpinData, symbolType: SpecialSymbolType): SpecialSymbolData[] {
    return spinData.specials?.filter(symbol => symbol.type === symbolType);
}

export function getUniquePositions(waysData: WaysData): [number, number][] {
    const uniquePositions = new Set<string>();
    const result: [number, number][] = [];

    waysData.ways.forEach(way => {
        way.path.forEach((pos, index) => {
            const key = `${index},${pos}`; // Индекс - это "x", pos - это "y"

            if (!uniquePositions.has(key)) {
                uniquePositions.add(key);
                result.push([index, pos]); // Добавляем уникальную позицию
            }
        });
    });

    return result;
}

export function mylog(...data: any[]): void {
    if (GameSettings.is_debug) console.log(data);
}