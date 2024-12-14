import { _decorator, Button, Component, Label } from 'cc';
import GlobalEventManager from 'scripts/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ type: Label })
    balanceLabel: Label = null;

    @property({ type: Label })
    betLabel: Label = null;

    @property({ type: Label })
    winMessageLabel: Label = null;

    @property({ type: Button })
    spinButton: Button = null;

    @property({ type: Button })
    stopButton: Button = null;

    @property({ type: Button })
    increaseBetButton: Button = null;

    @property({ type: Button })
    decreaseBetButton: Button = null;

    private currentBet: number = 10;
    private maxBet: number = 100;
    private minBet: number = 10;

    onLoad() {
        this.spinButton.node.on('click', this.onSpinButtonClicked, this);
        this.stopButton.node.on('click', this.onStopButtonClicked, this);
        this.increaseBetButton.node.on('click', this.onIncreaseBetClicked, this);
        this.decreaseBetButton.node.on('click', this.onDecreaseBetClicked, this);

        this.updateBetDisplay(this.currentBet);
        this.winMessageLabel.node.active = false;
    }

    updateBalanceDisplay(balance: number) {
        this.balanceLabel.string = `Balance: $${balance}`;
    }

    updateBetDisplay(bet: number) {
        this.betLabel.string = `Bet: $${bet}`;
    }

    showWinMessage(amount: number) {
        this.winMessageLabel.string = `You won $${amount}!`;
        this.winMessageLabel.node.active = true;

        this.scheduleOnce(() => {
            this.winMessageLabel.node.active = false;
        }, 2);
    }

    onSpinButtonClicked() {
        GlobalEventManager.getInstance().emit('spinPressed');
    }

    onStopButtonClicked() {
        GlobalEventManager.getInstance().emit('stopPressed');
    }

    onIncreaseBetClicked() {
        if (this.currentBet < this.maxBet) {
            this.currentBet += 10;
            this.updateBetDisplay(this.currentBet);
        }
    }

    onDecreaseBetClicked() {
        if (this.currentBet > this.minBet) {
            this.currentBet -= 10;
            this.updateBetDisplay(this.currentBet);
        }
    }
}
