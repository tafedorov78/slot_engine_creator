import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { FrameSwitcher } from 'prefabs/frameSwitcher/FrameSwitcher';

const { ccclass, property } = _decorator;

@ccclass('SymbolController')
export class SymbolController extends Component {

    @property({ type: Node })
    back: Node = null;

    @property({ type: FrameSwitcher })
    symbol: FrameSwitcher = null;

    public changeSymbol(index: number): void {
        this.symbol.currentFrameIndex = index;
    }

    changeSize(scale: number = 0, time: number): void {
        if (!time || time === 0) {
            this.back.scale = new Vec3(this.back.scale.x, scale, this.back.scale.z);
            this.symbol.node.scale = new Vec3(scale, scale, 1);
        } else {
            tween(this.back)
                .to(time, { scale: new Vec3(this.back.scale.x, scale, this.back.scale.z) })
                .start();

            tween(this.symbol.node)
                .to(time, { scale: new Vec3(scale, scale, 1) })
                .start();
        }

    }
}