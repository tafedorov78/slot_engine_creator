
export type SymbolType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type InitData = {
    balance: number,
    symbols: number[][],
    current_bet: number,
    bets_available: number[]
}

export type SpinData = {
    balance: number,
    current_bet: number,
    symbols: number[][],
    ways?: WaysData,
    specials?: SpecialSymbolData[],
    freespins?: FreespinsData,
    is_respin?: boolean,
    is_reset?: boolean,
    add_lines?: number,
    winnings: Winnings
}

export type Winnings = {
    total: number,
    ways?: number,
    fortune?: number
}

export type SpecialSymbolData = {
    i: number,
    j: number,
    winData?: string,
    type: SpecialSymbolType
}

export type WaysData = {
    ways: Way[],
}

export type Way = {
    symbol: number,
    path: number[]
    payout: number
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
    fortune = 'fortune',
    wild = 'wild',
}