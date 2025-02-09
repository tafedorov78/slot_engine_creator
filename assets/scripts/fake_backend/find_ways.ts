const WILD = 9;

export function findPathForNumber(reels: number[][]) {
    const paths: { symbol: number, path: number[] }[] = [];

    function ddd(colIndex: number, prevIndex: number, currentPath: number[], value: number) {
        if (colIndex >= reels.length) {
            paths.push({ symbol: reels[0][currentPath[0]], path: [...currentPath] });
            return;
        }

        // Получаем все возможные соседние индексы для текущего значения или для "9" (wildcard)
        const positions = reels[colIndex]
            .map((v, idx) => ((v === value || v === WILD) && Math.abs(idx - prevIndex) <= 1 ? idx : -1))
            .filter(idx => idx !== -1);

        if (positions.length > 0) {
            for (const pos of positions) {
                ddd(colIndex + 1, pos, [...currentPath, pos], reels[colIndex][pos] === WILD ? value : reels[colIndex][pos]);
            }
        } else if (currentPath.length > 2) {
            // Фиксируем найденный путь, если он достаточно длинный
            paths.push({ symbol: value, path: [...currentPath] });
        }
    }

    for (let j = 0; j < reels[0].length; j++) {
        ddd(1, j, [j], reels[0][j]);
    }

    return paths;
}
