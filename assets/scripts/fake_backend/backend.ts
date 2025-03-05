import { FreespinsData, InitData, SpinData } from 'scripts/model/Types';
import { calculateTotalWayWin, findPathForNumber } from './find_ways';
import reels from './reels';
import { generateReel } from './spin';
import { findSymbolPositions, getSubsequence } from './utl';
import paytable from './paytable';

const TOTAL_REELS = 6;

export class backend {

    balance: number = 1000;
    betsAvalilable: number[] = [1, 2, 3];
    currentBet: number = 1;

    isRespin: boolean = false;

    reels: number[][] = null;

    currentSize: number = 0;

    keysLeft = 0;

    freespins: FreespinsData = null;

    constructor(size: number) {
        this.currentSize = size;
        this.generateReels();
    }

    generateReels() {
        this.reels = [];
        for (let i = 0; i < TOTAL_REELS; i++) {
            this.reels.push(generateReel());
        }
    }

    init(): InitData {

        const data: InitData = {
            balance: this.balance,
            bets_available: this.betsAvalilable,
            current_bet: this.currentBet,
            symbols: [
                [0, 1, 3],
                [2, 1, 3],
                [0, 1, 3],
                [0, 1, 3],
                [0, 1, 3],
                [0, 1, 3]
            ]
        }

        return data;
    }

    spin(): SpinData {
        const symbols: number[][] = [];

        for (let i = 0; i < TOTAL_REELS; i++) {
            symbols.push(getSubsequence(reels.data[i], this.currentSize));
        }

        const ways = findPathForNumber(symbols, paytable.paytable, 9);

        if (!this.freespins && !this.isRespin) {
            this.balance -= this.currentBet;
        }

        const res: SpinData = {
            balance: this.balance,
            current_bet: this.currentBet,
            symbols: symbols,
            winnings: {
                total: 0,
                ways: 0,
                fortune: 0
            }
        };

        if (ways.length > 0) {
            res.ways = {
                ways: ways,
            }

            res.winnings.ways += calculateTotalWayWin(ways);
            res.winnings.total += res.winnings.ways;


            if (!this.freespins) {
                this.isRespin = true;
            }
        } else {
            this.isRespin = false;
        }

        res.is_respin = this.isRespin;

        let specials = [];

        const keys = findSymbolPositions(symbols, 8);
        const fs = findSymbolPositions(symbols, 7);
        const fortunes = findSymbolPositions(symbols, 6);
        const bg = findSymbolPositions(symbols, 5);

        if (keys.length > 0) {
            specials = [...keys, ...specials];

            if (!this.freespins) this.keysLeft = 3;

            let add = keys.length;

            if (this.currentSize + keys.length > 6 && !this.freespins) {
                add = 6 - this.currentSize;
            }

            if (!this.freespins) {
                for (let i = 0; i < symbols.length; i++) {
                    for (let j = 0; j < add; j++) {
                        symbols[i].push(j);
                    }
                }
            }

            this.currentSize = symbols[0].length;

            if (add > 0 && !this.freespins) {
                res.add_lines = add;
            }
        } else {
            if (this.keysLeft > 0 && !this.freespins) {
                this.keysLeft--;
                if (this.keysLeft === 0) {
                    this.currentSize = 3;
                    res.is_reset = true;
                }
            }
        }

        if (fs.length > 0) {
            specials = [...fs, ...specials];
        }

        if (this.freespins) {
            if (this.freespins.left > 0) {
                this.freespins.left--;
            } else {
                this.freespins = null;
            }

        }

        if (fs.length > 2) {
            if (this.freespins) {
                //this.freespins.total += 5;
                //this.freespins.left += 5;
            } else {
                this.freespins = {
                    total: 5,
                    left: 5,
                    total_won: 0
                }
            }
        }

        if (this.freespins) {
            res.freespins = this.freespins;

            if (this.freespins.left === 0) {
                res.is_reset = true;
                this.currentSize = 3;
                this.freespins = null;
            }
        }


        if (fortunes.length > 0) specials = [...fortunes, ...specials];
        if (bg.length > 0) specials = [...bg, ...specials];

        if (specials.length > 0) {
            res.specials = specials;
        }

        this.balance = res.balance += res.winnings.total;

        console.log('spin response: ', res);

        return res;
    }






}

