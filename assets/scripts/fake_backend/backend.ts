import { FreespinsData, SpinData } from 'scripts/model/Types';
import { findPathForNumber } from './find_ways';
import reels from './reels';
import { generateReel } from './spin';
import { findSymbolPositions, getSubsequence } from './utl';

const TOTAL_REELS = 6;

export class backend {
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

    spin(): SpinData {
        const symbols: number[][] = [];

        for (let i = 0; i < TOTAL_REELS; i++) {
            symbols.push(getSubsequence(reels.data[i], this.currentSize));
        }

        const ways = findPathForNumber(symbols);

        const res: SpinData = {
            symbols: symbols
        };

        if (ways.length > 0) {
            res['ways'] = {
                ways: ways
            }

            //if (!this.freespins) res.is_respin = true;
        }

        let specials = [];

        const keys = findSymbolPositions(symbols, 8);
        const fs = findSymbolPositions(symbols, 7);
        const lm = findSymbolPositions(symbols, 6);
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
            }
        }


        if (lm.length > 0) specials = [...lm, ...specials];
        if (bg.length > 0) specials = [...bg, ...specials];

        if (specials.length > 0) {
            res.specials = specials;
        }

        console.log('spin response: ', res);

        return res;
    }






}

