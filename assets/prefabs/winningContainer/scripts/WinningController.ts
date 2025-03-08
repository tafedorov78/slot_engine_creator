import { _decorator, Component, Label, Node, tween } from 'cc';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import GlobalEventManager from 'scripts/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('WinningController')
export class WinningController extends Component {

    @property({ type: Label })
    label: Label = null;

    private currentWinnings: number = 0;

    protected onLoad(): void {
        this.hide();
        GlobalEventManager.getInstance().on(GameEvents.SHOW_WINNINGS, this.onWinning.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.IDLE_START, this.onReset.bind(this));
    }

    private onReset(): void {
        this.label.string = '';
        this.currentWinnings = 0;
    }

    private onWinning(value: number): void {
        this.show();
        let obj = { value: this.currentWinnings };

        tween(obj).stop();
        tween(obj)
            .to(0.5, { value: this.currentWinnings + value }, {
                easing: 'quadOut',
                onUpdate: () => {
                    this.label.string = Math.floor(obj.value).toString();
                }
            })
            .call(() => {
                setTimeout(() => this.hide(), 1200);
            })
            .start();

        this.currentWinnings += value;
    }

    private hide(): void {
        this.node.active = false;
    }

    private show(): void {
        this.node.active = true;
    }
}

