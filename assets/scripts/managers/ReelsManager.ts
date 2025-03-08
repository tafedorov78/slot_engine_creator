import { _decorator, Component, Node } from 'cc';
import { FortuneSymbolComponent } from 'prefabs/fortuneSymbol/scripts/FortuneSymbolComponent';
import { ReelController } from 'prefabs/reel/ReelController';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { InitData, SpecialSymbolData, SpinData } from 'scripts/model/Types';
import ReelsSettings from 'scripts/settings/ReelsSettings';
const { ccclass, property } = _decorator;

@ccclass('ReelsManager')
export class ReelsManager extends Component {

    @property({ type: Node })
    reels: Node[] = [];

    private fortuneSymbolComponents: Map<number, FortuneSymbolComponent> = null
    private fortuneSymbols: SpecialSymbolData[] = null;
    private spinningReelsCount: number = 0;

    protected onLoad(): void {
        GlobalEventManager.getInstance().once(GameEvents.INIT_GAME, this.init.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SPIN_START, this.startSpin.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SPIN_STOP, this.stopSpin.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.ADD_LINE_START, this.onAddLine.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.RESET_LINES_START, this.onResetLines.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SHOW_WAYS_START, this.onShowWays.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.STOP_FORTUNE_SYMBOL, this.onStopFortuneSymbol.bind(this));

        GlobalEventManager.getInstance().on('reelTouched', this.onReelTouched, this);
        GlobalEventManager.getInstance().on('reelStopped', this.onReelStopped, this);
    }

    private init(data: InitData): void {
        for (let i: number = 0; i < this.reels.length; i++) {
            const reelController = this.reels[i].getComponent(ReelController);
            if (reelController) {
                reelController.init(data.symbols[i]);
            } else {
                console.error('Reel node is not found!');

            }
        }

        GlobalEventManager.getInstance().emit(GameEvents.INIT_COMPLETE);
    }

    private startSpin(): void {
        this.fortuneSymbolComponents = new Map();
        this.spinningReelsCount = this.reels.length;

        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);
            if (reelController) {
                reelController.startSpin();
            }
        }
    }

    private stopSpin(data: SpinData, fortuneSymbols: SpecialSymbolData[] = null): void {
        this.fortuneSymbols = fortuneSymbols;
        let delay: number = 0;
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);

            if (reelController) {
                if (data.symbols[i].includes(6)) {
                    delay += ReelsSettings.special_delay_between_reels;
                    reelController.setSpeed(ReelsSettings.default_reel_speed);
                } else {
                    delay += ReelsSettings.default_delay_between_reels;
                }

                setTimeout(() => {
                    reelController.stopSpin(data.symbols[i], data.is_reset);
                }, delay);
            }
        }
    }

    private onReelStopped(index: number) {
        this.spinningReelsCount--;
        if (this.spinningReelsCount === 0) {
            GlobalEventManager.getInstance().emit(GameEvents.SPIN_COMPLETE);
        }
    }

    private onReelTouched(index: number, symbol: FortuneSymbolComponent) {
        if (!this.fortuneSymbols) return;
        this.fortuneSymbolComponents.set(index, symbol);
        const s = this.fortuneSymbols.find((fs) => fs.i === index);
        symbol.startSpin(s.winData);
    }

    private onAddLine(newLinesAmount: number): void {
        let counter: number = 0;

        const callback = () => {
            counter++;
            if (counter === this.reels.length) {
                GlobalEventManager.getInstance().emit(GameEvents.ADD_LINE_COMPLETE);
            }
        }
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);
            reelController.extend(newLinesAmount, callback);
        }
    }

    private onShowWays(symbols: [number, number][]): void {
        for (let i = 0; i < symbols.length; i++) {
            this.reels[symbols[i][0]].getComponent(ReelController).highlight(symbols[i][1]);
        }

        setTimeout(() => {
            GlobalEventManager.getInstance().emit(GameEvents.SHOW_WAYS_COMPLETE);
        }, 1200);
    }

    private onStopFortuneSymbol(symbolData: SpecialSymbolData): void {
        console.log('onStopFortuneSymbol');

        const symbol = this.fortuneSymbolComponents.get(symbolData.i);
        symbol.stopSpin();
    }

    private onResetLines(): void {
        let counter: number = 0;

        const callback = () => {
            counter++;
            if (counter === this.reels.length) {
                GlobalEventManager.getInstance().emit(GameEvents.RESET_LINES_COMPLETE);
            }
        }
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);
            reelController.reset(callback);
        }
    }

    onDestroy(): void {
        GlobalEventManager.getInstance().off('reelStopped', this.onReelStopped, this);
    }

}

