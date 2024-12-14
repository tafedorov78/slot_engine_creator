import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { FrameSwitcher } from 'prefabs/frameSwitcher/FrameSwitcher';

const { ccclass, property } = _decorator;

@ccclass('SymbolController')
export class SymbolController extends Component {

    @property({ type: Node })
    back: Node = null;

    @property({ type: FrameSwitcher })
    symbol: FrameSwitcher = null;

    public changeSymbol(): void {
        this.symbol.currentFrameIndex = Math.floor(Math.random() * 6);
    }

    changeSize(size: number = 0): void {
        tween(this.back.scale)
            .to(2, new Vec3(this.back.scale.x, 0.5, this.back.scale.z))
            .delay(3)
            .start();

    }
}