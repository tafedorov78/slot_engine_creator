import { _decorator, CCInteger, Component, Node, tween, UITransform, Vec3 } from 'cc';
import { ObjectPool } from 'prefabs/objectPool/ObjectPool';
import { SymbolController } from 'prefabs/symbol/SymbolController';
import GlobalEventManager from 'scripts/GlobalEventManager';
import GameSettings from 'scripts/model/GameSettings';
import ReelsSettings from 'scripts/model/ReelsSettings';
import { ReelData } from 'scripts/model/Types';
import { ReelMaskComponent } from './ReelMaskComponent';
const { ccclass, property } = _decorator;

@ccclass('ReelController')
export class ReelController extends Component {

    @property({ type: ObjectPool }) objectPool: ObjectPool = null;
    @property({ type: Node }) symbolsContainer: Node = null;
    @property({ type: ReelMaskComponent }) mask: ReelMaskComponent = null;
    @property({ type: CCInteger }) visibleSymbols: number = 3;
    @property({ type: CCInteger }) index: number = 0;
    @property({ type: Number }) spinSpeed: number = 45;

    private isSpinning: boolean = false;

    public symbolHeight: number = 160;
    public currentScale: number = 1;
    public totalReelHeight: number = 0;

    private stopCounter: number = 0;
    private bottomLine: number = -320;
    private bottomSymbolY: number = 0;

    private symbols: Node[] = [];

    private bottomSymbol: Node = null;

    private stopReelData: ReelData;

    private clearDefaultSymbols(): void {
        this.symbolsContainer.children.forEach((node) => {
            node.destroy();
        })
    }

    public init(data: ReelData): void {
        this.clearDefaultSymbols();

        this.visibleSymbols = data.symbols.length;
        this.currentScale = ReelsSettings.scales[data.symbols.length];
        this.totalReelHeight = this.calculateTotalReelHeight(data.symbols.length)

        const symbolsWithPadding = [0, ...data.symbols, 0];
        const initializedSymbols = this.createSymbols(symbolsWithPadding);

        this.addInitSymbolsToContainer(initializedSymbols);

        this.bottomSymbol = this.getBottomSymbol();
        this.bottomLine = this.calculateBottomLine();

        this.center();

        this.mask.setMask(this.symbols[1].getPosition().y, this.symbols[this.symbols.length - 2].getPosition().y, this.symbolHeight * this.currentScale);
    }

    calculateTotalReelHeight(symbolCount: number) {
        return (symbolCount + 2) * (this.symbolHeight * this.currentScale);
    }

    private addInitSymbolsToContainer(symbols: Node[]): void {
        symbols.forEach((node: Node) => {
            this.symbolsContainer.addChild(node);
            this.moveSymbolToBottom(node);
            this.symbols.push(node);
        });
    }

    private calculateBottomLine(): number {
        return this.bottomSymbol.getPosition().y - (this.symbolHeight * this.currentScale);
    }

    public startSpin() {
        this.bottomSymbol = this.getBottomSymbol();
        this.bottomSymbolY = this.bottomSymbol.position.y;
        this.isSpinning = true;
    }

    public stopSpin(data: ReelData) {
        this.stopReelData = data;
        this.stopCounter = 0;

        this.isSpinning = false;

        const symbolsWithExtra = [0, ...this.stopReelData.symbols, 0];

        const stopSymbols: Node[] = this.createSymbols(symbolsWithExtra);
        this.addStopSymbolsOnTop(stopSymbols);
        this.bottomSymbol = this.getBottomSymbol();
        this.finishAnimation();
    }

    setVisibleSymbolsAmount(amount: number): void {
        this.visibleSymbols = amount;
    }

    private createSymbols(data: number[]): Node[] {
        const res: Node[] = [];

        for (let i = 0; i < data.length; i++) {
            const symbolIndex: number = data[i];
            res.push(this.createSymbol(data[i]));
        }
        return res;
    }

    private createSymbol(index: number): Node {
        const symbol: Node = this.objectPool.getObject();
        symbol.getComponent(SymbolController).changeSymbol(index);
        symbol.getComponent(SymbolController).changeSize(this.currentScale, 0);
        return symbol;
    }

    private addStopSymbolsOnTop(symbols: Node[]): void {
        symbols.forEach((symbol: Node) => {
            this.symbolsContainer.addChild(symbol);
            this.moveSymbolOnTop(symbol);
            this.symbols.push(symbol);
        })
    }

    private finishAnimation(): void {
        const dy = this.bottomSymbolY - this.symbols[this.visibleSymbols + 1].position.y;
        this.symbols.forEach((symbol: Node, index: number) => {
            tween(symbol)
                .to(0.3, { position: new Vec3(symbol.position.x, symbol.position.y + dy, symbol.position.z) }, { easing: 'backOut' })
                .call(() => this.onFinishSymbolTween(symbol))
                .start();
        });
    }

    private onFinishSymbolTween(symbol: Node): void {
        this.stopCounter++;
        if (this.stopCounter < this.symbols.length) return;

        this.removeExtraSymbols();
    }

    private removeExtraSymbols(): void {
        const counter = (this.symbols.length - this.visibleSymbols) - 2;
        for (let i = 0; i < counter; i++) {
            this.objectPool.releaseObject(this.symbols.pop());
        }
        GlobalEventManager.getInstance().emit('reelStopped', this.index);

        //this.addNewSymbols();
        this.mask.setMask(this.symbols[1].getPosition().y, this.symbols[this.symbols.length - 2].getPosition().y, this.symbolHeight * this.currentScale);

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
            this.bottomSymbol = this.getBottomSymbol();

            const frameSwitcher = this.bottomSymbol.getComponent(SymbolController).changeSymbol(Math.floor(Math.random() * 6));
        }
    }

    private getBottomSymbol(): Node {
        return this.symbols[this.symbols.length - 1];
    }

    private moveSymbolOnTop(symbol: Node): void {
        const topSymbol = this.symbols[0];
        symbol.setPosition(
            topSymbol.position.x,
            topSymbol.position.y + this.symbolHeight * this.currentScale,
            topSymbol.position.z
        );
    }

    update(): void {
        if (!this.isSpinning) return;
        this.spin();
    }

    private addNewSymbols(): void {
        this.setVisibleSymbolsAmount(this.visibleSymbols + 1);
        const symbol: Node = this.objectPool.getObject();
        symbol.getComponent(SymbolController).changeSymbol(Math.floor(Math.random() * 6));
        this.symbolsContainer.addChild(symbol);
        this.moveSymbolToBottom(symbol);
        this.symbols.push(symbol);
        this.totalReelHeight = this.calculateTotalReelHeight(this.visibleSymbols);
        this.bottomSymbol = this.getBottomSymbol();
        this.bottomLine = this.calculateBottomLine();
        this.center();
    };

    private moveSymbolToBottom(symbol: Node): void {
        const lastSymbol = this.symbols[this.symbols.length - 1];
        const position = lastSymbol?.position ?? new Vec3(0, 0, 0);

        const y = this.symbols.length === 0 ? 0 : position.y - this.symbolHeight * this.currentScale;
        symbol.setPosition(position.x, y, position.z);
    }

    private changeSize(symbolScale: number): void {
        let currentY = 0;
        this.symbols.forEach((symbol: Node, index: number) => {
            symbol.getComponent(SymbolController).changeSize(symbolScale, GameSettings.SCALING_DURATION);

            tween(symbol)
                .to(GameSettings.SCALING_DURATION, { position: new Vec3(symbol.position.x, currentY, symbol.position.z) })
                .start();

            currentY -= this.symbolHeight * symbolScale;
        });

        setTimeout(() => {
            GlobalEventManager.getInstance().emit('reelScallingComplete', this.index);
        }, GameSettings.SCALING_DURATION * 1000);
    };

    center(): void {
        const pos = this.node.getPosition();
        const y = (-450 + (this.totalReelHeight / 2)) - (this.symbolHeight * this.currentScale) / 2;
        this.node.setPosition(pos.x, y, pos.z);
    }

}

