const WILD = 9;

export function findPathForNumber(reels: number[][], paytable: { symbol: number, payout: number[] }[], WILD: number): { symbol: number, path: number[], payout: number }[] {
    const paths: { symbol: number, path: number[], payout: number }[] = [];

    function ddd(colIndex: number, prevIndex: number, currentPath: number[], value: number) {
        if (colIndex >= reels.length) {
            const symbol = reels[0][currentPath[0]];
            const payout = getPayout(symbol, currentPath.length, paytable);
            paths.push({ symbol, path: [...currentPath], payout });
            return;
        }

        // Получаем все возможные соседние индексы для текущего значения или для "WILD"
        const positions = reels[colIndex]
            .map((v, idx) => ((v === value || v === WILD) && Math.abs(idx - prevIndex) <= 1 ? idx : -1))
            .filter(idx => idx !== -1);

        if (positions.length > 0) {
            for (const pos of positions) {
                ddd(colIndex + 1, pos, [...currentPath, pos], reels[colIndex][pos] === WILD ? value : reels[colIndex][pos]);
            }
        } else if (currentPath.length > 2) {
            // Фиксируем найденный путь, если он достаточно длинный
            const payout = getPayout(value, currentPath.length, paytable);
            paths.push({ symbol: value, path: [...currentPath], payout });
        }
    }

    for (let j = 0; j < reels[0].length; j++) {
        ddd(1, j, [j], reels[0][j]);
    }

    return paths;
}

function getPayout(symbol: number, length: number, paytable: { symbol: number, payout: number[] }[]): number {
    const entry = paytable.find(entry => entry.symbol === symbol);
    return entry ? (entry.payout[length - 1] || 0) : 0;
}

export function calculateTotalWayWin(ways: { symbol: number, path: number[], payout: number }[]): number {
    return ways.reduce((total, way) => total + way.payout, 0);
}