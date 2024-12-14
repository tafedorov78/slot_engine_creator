import { _decorator, Component } from 'cc';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { ReelsManager } from './ReelsManager';
import { UIManager } from './UIManager';
import { StopReelsData } from 'scripts/model/Types';

const { ccclass, property } = _decorator;

@ccclass('SlotGameManager')
export class SlotGameManager extends Component {

    @property({ type: ReelsManager })
    reelsManager: ReelsManager = null;

    @property({ type: UIManager })
    uiManager: UIManager = null;

    private balance: number = 1000;
    private betAmount: number = 10;

    private isSpinning: boolean = false;

    onLoad() {
        this.uiManager.updateBalanceDisplay(this.balance);
        this.uiManager.updateBetDisplay(this.betAmount);

        GlobalEventManager.getInstance().on('spinPressed', this.startSpin, this);
        GlobalEventManager.getInstance().on('stopPressed', this.stopSpin, this);
    }

    private startSpin(): void {
        if (!this.isSpinning) {
            this.isSpinning = true;
            this.reelsManager.startSpin();

            setTimeout(() => {
                this.stopSpin();
            }, 1000)
        }
    }

    private stopSpin(): void {

        const reelsStopData: StopReelsData = {
            reels: [
                {
                    symbols: [0, 2, 4, 5, 6],
                },
                {
                    symbols: [1, 2, 3, 2, 6],
                },
                {
                    symbols: [2, 2, 1, 1, 2],
                },
                {
                    symbols: [2, 5, 1, 3, 2],
                },
                {
                    symbols: [0, 2, 4, 5, 4],
                },
            ]
        }

        this.reelsManager.stopSpin(reelsStopData);
    }

    public onSpinComplete(): void {
        this.isSpinning = false;
    }

    private calculateWin(): void {
        const winAmount = this.betAmount * 2; // Пример: удвоение ставки как выигрыш
        this.balance += winAmount;

        this.uiManager.updateBalanceDisplay(this.balance);
        this.uiManager.showWinMessage(winAmount);

        console.log(`Выигрыш: ${winAmount}`);
    }

    increaseBet(): void {
        this.betAmount += 10;
        this.uiManager.updateBetDisplay(this.betAmount);
    }

    decreaseBet(): void {
        if (this.betAmount > 10) {
            this.betAmount -= 10;
            this.uiManager.updateBetDisplay(this.betAmount);
        }
    }

    onDestroy(): void {
    }
}
