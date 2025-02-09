import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { NodeSwitcher } from 'prefabs/nodeSwitcher/NodeSwitcher';

const { ccclass, property } = _decorator;

@ccclass('SymbolController')
export class SymbolController extends Component {

    @property({ type: Node })
    back: Node = null;

    @property({ type: NodeSwitcher })
    symbol: NodeSwitcher = null;

    public changeSymbol(index: number): void {
        this.symbol.currentNodeIndex = index;
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

    public hightlight(): void {
        tween(this.node)
            .to(0.1, { scale: new Vec3(1.4, 1.4, 1.4) })
            .to(0.6, { scale: new Vec3(1, 1, 1) })
            .union()
            .start();
    }
}