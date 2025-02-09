
export type SymbolType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type InitData = {
    symbols: number[][]
}

export type SpinData = {
    symbols: number[][],
    ways?: WaysData,
    specials?: SpecialSymbolData[],
    freespins?: FreespinsData,
    is_respin?: boolean,
    is_reset?: boolean,
    add_lines?: number
}

export type SpecialSymbolData = {
    i: number,
    j: number,
    type: SpecialSymbolType
}

export type WaysData = {
    ways: Way[],
}

export type Way = {
    symbol: number,
    path: number[]
}

export type FreespinsData = {
    total: number,
    left: number,
    total_won: number
}

export enum SpecialSymbolType {
    key = 'key',
    bonus = 'bonus',
    freespins = 'freespins',
    money = 'money',
    wild = 'wild',
}