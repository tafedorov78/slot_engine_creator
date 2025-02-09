import { _decorator, CCInteger, Component, log, Node, tween, Vec3 } from 'cc';
import { ObjectPool } from 'prefabs/objectPool/ObjectPool';
import { SymbolController } from 'prefabs/symbol/SymbolController';
import GlobalEventManager from 'scripts/GlobalEventManager';
import ReelsSettings from 'scripts/settings/ReelsSettings';
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

    private toReset: boolean = false;

    private stopReelData: number[];

    private clearDefaultSymbols(): void {
        this.symbolsContainer.children.forEach((node) => {
            node.destroy();
        })
    }

    public init(data: number[]): void {
        this.clearDefaultSymbols();

        this.visibleSymbols = data.length;
        this.currentScale = ReelsSettings.scales[data.length];
        this.totalReelHeight = this.calculateTotalReelHeight(data.length)

        const symbolsWithPadding = [0, ...data, 0];
        const initializedSymbols = this.createSymbols(symbolsWithPadding);

        this.addInitSymbolsToContainer(initializedSymbols);

        this.bottomSymbol = this.getBottomSymbol();
        this.bottomLine = this.calculateBottomLine();

        this.center(0);

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

    setVisibleSymbolsAmount(amount: number): void {
        this.visibleSymbols = amount;
        if (this.visibleSymbols > 6) this.visibleSymbols = 6;
    }

    public highlight(index: number): void {
        this.symbols[index + 1].getComponent(SymbolController).hightlight();
    }


    public startSpin() {
        this.bottomSymbol = this.getBottomSymbol();
        this.bottomSymbolY = this.bottomSymbol.position.y;
        this.bottomLine = this.calculateBottomLine();
        this.isSpinning = true;
    }

    public stopSpin(data: number[], toReset: boolean) {
        this.stopReelData = data;
        this.stopCounter = 0;
        this.toReset = toReset;
        this.isSpinning = false;
        const symbolsWithExtra = [0, ...this.stopReelData, 0];

        const stopSymbols: Node[] = this.createSymbols(symbolsWithExtra);
        this.addStopSymbolsOnTop(stopSymbols);
        this.finishAnimation();
    }

    private createSymbols(data: number[]): Node[] {
        const res: Node[] = [];

        for (let i = 0; i < data.length; i++) {
            res.unshift(this.createSymbol(data[i]));
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
            this.symbols.unshift(symbol);
        })
    }

    private finishAnimation(): void {
        const dy = this.bottomSymbolY - this.symbols[this.visibleSymbols + 1].position.y;
        this.symbols.forEach((symbol: Node) => {
            tween(symbol)
                .to(0.3, { position: new Vec3(symbol.position.x, symbol.position.y + dy, symbol.position.z) }, { easing: 'backOut' })
                .call(() => this.onFinishSymbolTween(symbol))
                .start();
        });
    }

    private onFinishSymbolTween(symbol: Node): void {
        this.stopCounter++;
        if (this.stopCounter < this.symbols.length) return;
        if (!this.toReset) this.removeExtraSymbols();
        GlobalEventManager.getInstance().emit('reelStopped', this.index);

    }

    private removeExtraSymbols(isReset: boolean = false): void {
        let counter = isReset
            ? this.symbols.length - (ReelsSettings.defaultSymbolsInReel + 2)
            : (this.symbols.length - this.stopReelData.length) - 2;

        for (let i = 0; i < counter; i++) {
            this.objectPool.releaseObject(this.symbols.pop());
        }
    }

    private spinAnimation() {
        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i];
            symbol.setPosition(symbol.position.x, symbol.position.y - this.spinSpeed, symbol.position.z);
        }
        this.bottomChecking();
    }

    private bottomChecking() {
        if (this.bottomSymbol.position.y < this.bottomLine) {
            this.bottomSymbol.getComponent(SymbolController).changeSymbol(Math.floor(Math.random() * 5));
            this.moveSymbolOnTop(this.bottomSymbol);

            this.symbols.unshift(this.symbols.pop());
            this.bottomSymbol = this.getBottomSymbol();
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
        this.spinAnimation();
    }

    public extend(amount: number, callback: () => void): void {
        this.setVisibleSymbolsAmount(this.visibleSymbols + amount);
        this.totalReelHeight = this.calculateTotalReelHeight(this.visibleSymbols);

        this.center(ReelsSettings.extend_duration);
        this.mask.animateMask(this.symbols[1].getPosition().y, this.symbols[this.symbols.length - 2].getPosition().y, this.symbolHeight * this.currentScale, ReelsSettings.extend_duration, callback);
    };

    public reset(callback: () => void): void {
        this.setVisibleSymbolsAmount(ReelsSettings.defaultSymbolsInReel);
        this.bottomSymbol = this.symbols[ReelsSettings.defaultSymbolsInReel];
        this.totalReelHeight = this.calculateTotalReelHeight(this.visibleSymbols);

        this.center(ReelsSettings.reset_duration);
        this.mask.animateMask(this.symbols[1].getPosition().y, this.symbols[ReelsSettings.defaultSymbolsInReel].getPosition().y, this.symbolHeight * this.currentScale, ReelsSettings.reset_duration);

        setTimeout(() => {
            this.removeExtraSymbols(true);
            callback();
        }, 1000)
    };

    private moveSymbolToBottom(symbol: Node): void {
        const lastSymbol = this.symbols[this.symbols.length - 1];
        const position = lastSymbol?.position ?? new Vec3(0, 0, 0);

        const y = this.symbols.length === 0 ? 0 : position.y - this.symbolHeight * this.currentScale;
        symbol.setPosition(position.x, y, position.z);
    }

    private changeSize(): void {
        let currentY = 0;
        this.symbols.forEach((symbol: Node, index: number) => {
            symbol.getComponent(SymbolController).changeSize(this.currentScale, ReelsSettings.extend_duration);

            tween(symbol)
                .to(ReelsSettings.extend_duration, { position: new Vec3(symbol.position.x, currentY, symbol.position.z) })
                .start();

            currentY -= this.symbolHeight * this.currentScale;
        });
    };

    center(duration: number): void {
        const pos = this.node.getPosition();
        const targetY = (-450 + (this.totalReelHeight / 2)) - (this.symbolHeight * this.currentScale) / 2;

        const targetPosition = new Vec3(pos.x, targetY, pos.z);

        tween(this.node)
            .to(duration, { position: targetPosition }, { easing: 'quadOut' }) // 0.5 — время анимации
            .start();
    }


}

