import { _decorator, Component, Label, Node } from 'cc';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { FreespinsData, SpinData } from 'scripts/model/Types';
import GameSettings from 'scripts/settings/GameSettings';
const { ccclass, property } = _decorator;

@ccclass('FSCounterComponent')
export class FSCounterComponent extends Component {

    @property({ type: Label })
    value: Label = null;

    private counter: number = 0;
    private isFreespins: boolean = false;

    protected onLoad(): void {
        GlobalEventManager.getInstance().on(GameEvents.SPIN_START, this.show.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SPIN_COMPLETE, this.check.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SPIN_STOP, this.onSpinStop.bind(this));

        GlobalEventManager.getInstance().on(GameEvents.START_FREESPINS_SHOW, this.onStartFreespins.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.STOP_FREESPINS_SHOW_COMPLETE, this.onFinishFreespins.bind(this));
        this.node.active = false;
    }

    private show(): void {
        if (this.counter > 0 && this.isFreespins) {
            this.counter--;
            this.counterUpdate(this.counter);
        }
    }

    private check(): void {
        if (this.counter === 0) {
            this.node.active = false;
        }
    }

    private onSpinStop(spinData: SpinData): void {
        if (spinData.freespins) {
            this.counterUpdate(spinData.freespins.left);
        }
    }

    private counterUpdate(value: number): void {
        this.value.string = value.toString();
    }

    private onStartFreespins(data: FreespinsData): void {
        this.counter = data.left;
        this.node.active = true;
        this.isFreespins = true;
    }

    private onFinishFreespins(): void {
        this.isFreespins = false;
    }
}

