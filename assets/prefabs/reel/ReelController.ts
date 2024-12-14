import { _decorator, CCInteger, Component, Node, tween, Vec3 } from 'cc';
import { FrameSwitcher } from 'prefabs/frameSwitcher/FrameSwitcher';
import { ObjectPool } from 'prefabs/objectPool/ObjectPool';
import { SymbolController } from 'prefabs/symbol/SymbolController';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { StopReelData } from 'scripts/model/Types';
const { ccclass, property } = _decorator;

@ccclass('ReelController')
export class ReelController extends Component {

    @property({ type: ObjectPool }) objectPool: ObjectPool = null;
    @property({ type: Node }) symbolsContainer: Node = null;
    @property({ type: CCInteger }) visibleSymbols: number = 3;
    @property({ type: CCInteger }) index: number = 0;
    @property({ type: Number }) spinSpeed: number = 45;

    private isSpinning: boolean = false;

    private symbolHeight: number = 160;
    private stopCounter: number = 0;
    private bottomLine: number = -750;

    private symbols: Node[] = [];

    private bottomSymbol: Node = null;

    private stopReelData: StopReelData;

    onLoad() {
        this.symbolsContainer.children.forEach((symbol: Node) => {
            this.symbols.push(symbol);
        });
        if (this.symbols.length === 0) {
            console.error("No symbols found in symbolsContainer.");
            return;
        }
        this.bottomSymbol = this.symbols[this.symbols.length - 1];
    }

    public startSpin() {
        this.isSpinning = true;
    }

    public stopSpin(data: StopReelData) {
        this.stopReelData = data;
        this.stopCounter = 0;

        this.isSpinning = false;

        const stopSymbols: Node[] = this.createStopSymbols(this.stopReelData.symbols);
        this.addStopSymbolsOnTop(stopSymbols);
        this.finishAnimation();
    }

    private createStopSymbols(data: number[]): Node[] {
        const symbols: Node[] = [];

        for (let i = 0; i < data.length; i++) {
            const symbolIndex: number = data[i];
            symbols.push(this.objectPool.getObject());
        }

        return symbols;
    }

    private addStopSymbolsOnTop(symbols: Node[]): void {
        symbols.forEach((symbol: Node) => {
            this.symbolsContainer.addChild(symbol);
            this.moveSymbolOnTop(symbol);
            this.symbols.unshift(symbol);
        })
    }

    private finishAnimation(): void {
        const dy = -600 - this.symbols[4].position.y;
        this.symbols.forEach((symbol: Node, index: number) => {
            tween(symbol)
                .to(0.3, { position: new Vec3(symbol.position.x, symbol.position.y + dy, symbol.position.z) }, { easing: 'backOut' })
                .call(() => this.onFinishSymbolTween(symbol))
                .start();
        });
    }

    private onFinishSymbolTween(symbol: Node): void {
        symbol.getComponent(SymbolController).changeSize();

        this.stopCounter++;
        if (this.stopCounter < this.symbols.length) return;

        this.removeExtraSymbols();
    }

    private removeExtraSymbols(): void {
        const counter = this.symbols.length / 2;
        for (let i = 0; i < counter; i++) {
            this.objectPool.releaseObject(this.symbols.pop());
        }

        this.bottomSymbol = this.symbols[this.symbols.length - 1];

        GlobalEventManager.getInstance().emit('reelStopped', this.index);
    }

    private spin() {
        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i];
            symbol.setPosition(symbol.position.x, symbol.position.y - this.spinSpeed, symbol.position.z);
        }
        this.bottomChecking();
    }

    private bottomChecking() {
        if (this.bottomSymbol.position.y < this.bottomLine) {
            this.moveSymbolOnTop(this.bottomSymbol);

            this.symbols.unshift(this.symbols.pop());
            this.bottomSymbol = this.symbols[this.symbols.length - 1];

            const frameSwitcher = this.bottomSymbol.getComponent(SymbolController).changeSymbol();
        }
    }

    private moveSymbolOnTop(symbol: Node): void {
        const topSymbol = this.symbols[0];
        symbol.setPosition(
            topSymbol.position.x,
            topSymbol.position.y + this.symbolHeight,
            topSymbol.position.z
        );
    }

    update(): void {
        if (!this.isSpinning) return;
        this.spin();
    }
}

