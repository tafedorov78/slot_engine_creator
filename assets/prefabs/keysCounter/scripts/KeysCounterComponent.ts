import { _decorator, Component, Label } from 'cc';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { SpecialSymbolType, SpinData } from 'scripts/model/Types';
import GameSettings from 'scripts/settings/GameSettings';
import { checkForSpecialSymbols } from 'scripts/ult/Utils';

const { ccclass, property } = _decorator;

@ccclass('KeysCounterComponent')
export class KeysCounterComponent extends Component {

    @property({ type: Label })
    value: Label | null = null;

    private counter: number = 0;
    private isFreespins: boolean = false;
    private toAddLines: boolean = false;

    protected onLoad(): void {
        const eventManager = GlobalEventManager.getInstance();

        eventManager.on(GameEvents.ADD_LINE_START, this.onAddLine, this);
        eventManager.on(GameEvents.SPIN_START, this.onSpinStart, this);
        eventManager.on(GameEvents.SPIN_STOP, this.onSpinStop, this);
        eventManager.on(GameEvents.SPIN_COMPLETE, this.onSpinComplete, this);
        eventManager.on(GameEvents.START_FREESPINS_SHOW, this.onStartFreespins, this);
        eventManager.on(GameEvents.STOP_FREESPINS_SHOW_COMPLETE, this.onFinishFreespins, this);

        this.node.active = false;
    }

    private onSpinStart(): void {
        if (!this.isFreespins && this.counter > 0) {
            this.counter--;
            this.updateCounter();
        }
        this.toAddLines = false;
    }

    private onSpinStop(spinData: SpinData): void {
        const specialSymbols = checkForSpecialSymbols(spinData, SpecialSymbolType.key);

        if (specialSymbols && specialSymbols.length > 0) {
            this.toAddLines = true;
        }
    }

    private onSpinComplete(): void {
        if (this.toAddLines) {
            this.onAddLine();
        }
    }

    private onAddLine(): void {
        if (this.isFreespins) return;
        this.node.active = true;
        this.counter = GameSettings.long_spins_extended;
        this.updateCounter();
    }

    private updateCounter(): void {
        if (this.value) {
            this.value.string = this.counter.toString();
        } else {
            this.node.active = false;
        }
    }

    private onStartFreespins(): void {
        this.isFreespins = true;
    }

    private onFinishFreespins(): void {
        this.counter = 0;
        this.node.active = false;
        this.isFreespins = false;
    }
}