import { _decorator, Button, Component, Label } from 'cc';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { GameModel } from 'scripts/model/GameModel';
import { InitData } from 'scripts/model/Types';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property({ type: GameModel })
    gameModel: GameModel = null;

    @property({ type: Label })
    balanceLabel: Label = null;

    @property({ type: Label })
    betLabel: Label = null;

    @property({ type: Label })
    winMessageLabel: Label = null;

    @property({ type: Button })
    spinButton: Button = null;

    private balance: number = 0;


    onLoad() {
        this.spinButton.node.on('click', this.onSpinButtonClicked, this);

        GlobalEventManager.getInstance().on(GameEvents.INIT_GAME, this.onInitGame.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SPIN_START, this.onSpinStart.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.BALANCE_UPDATE, this.balanceUpdate.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SHOW_WINNINGS, this.addToBalance.bind(this));
    }

    onInitGame(data: InitData): void {
        this.balanceUpdate(data.balance);
        this.betLabel.string = `$${data.current_bet}`;
        this.winMessageLabel.string = ``;
    }

    onSpinButtonClicked() {
        GlobalEventManager.getInstance().emit('spinPressed');
    }

    onSpinStart(): void {
        this.winMessageLabel.string = ``;
    }

    balanceUpdate(value: number): void {
        this.balance = value;
        this.balanceLabel.string = `$${value}`;
    }

    addToBalance(value: number): void {
        this.winMessageLabel.string = `$${value}`;
        this.balance += value;
        this.balanceLabel.string = `$${this.balance}`;
    }
}
