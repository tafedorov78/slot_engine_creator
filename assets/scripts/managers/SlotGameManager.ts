import { _decorator, Component } from 'cc';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { ReelsManager } from './ReelsManager';
import { UIManager } from './UIManager';
import { InitData, ReelsData, SpinData } from 'scripts/model/Types';
import { NetworkManager } from './NetworkManager';

const { ccclass, property } = _decorator;

@ccclass('SlotGameManager')
export class SlotGameManager extends Component {

    @property({ type: ReelsManager })
    reelsManager: ReelsManager = null;

    @property({ type: UIManager })
    uiManager: UIManager = null;

    @property({ type: NetworkManager })
    networkManager: NetworkManager = null;

    private balance: number = 1000;
    private betAmount: number = 10;

    private isSpinning: boolean = false;

    onLoad() {
        GlobalEventManager.getInstance().on('spinPressed', this.startSpin, this);
        GlobalEventManager.getInstance().on('stopPressed', this.stopSpin, this);

        this.uiManager.updateBalanceDisplay(this.balance);
        this.uiManager.updateBetDisplay(this.betAmount);

        this.networkManager.init((data: InitData) => {
            this.reelsManager.init(data);
        });
    }

    private startSpin(): void {
        if (!this.isSpinning) {
            this.isSpinning = true;
            this.reelsManager.startSpin();


            this.networkManager.spin((data: SpinData) => {
                setTimeout(() => {
                    this.stopSpin(data);
                }, 1000)
            });
        }
    }

    private stopSpin(data: SpinData): void {
        this.reelsManager.stopSpin(data);
    }

    public onSpinComplete(): void {
        this.isSpinning = false;
    }

    private calculateWin(): void {
        const winAmount = this.betAmount * 2;
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
