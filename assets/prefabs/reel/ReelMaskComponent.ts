import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReelMaskComponent')
export class ReelMaskComponent extends Component {

    @property({ type: Node }) top: Node = null;
    @property({ type: Node }) bottom: Node = null;

    public setMask(topSymbolY: number, bottomSymbolY: number, symbolHeight: number): void {
        this.top.setPosition(0, topSymbolY + symbolHeight / 2, 0);
        this.bottom.setPosition(0, bottomSymbolY - symbolHeight / 2, 0);
    }
}

