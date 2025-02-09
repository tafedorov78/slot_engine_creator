import { _decorator, Component, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReelMaskComponent')
export class ReelMaskComponent extends Component {

    @property({ type: Node }) top: Node = null;
    @property({ type: Node }) bottom: Node = null;

    public setMask(topSymbolY: number, bottomSymbolY: number, symbolHeight: number): void {
        this.top.setPosition(0, topSymbolY + symbolHeight / 2, 0);
        this.bottom.setPosition(0, bottomSymbolY - symbolHeight / 2, 0);
    }

    public animateMask(topSymbolY: number, bottomSymbolY: number, symbolHeight: number, duration: number, callback?: () => void): void {
        const startValues = {
            topY: this.top.getPosition().y,
            bottomY: this.bottom.getPosition().y,
            height: symbolHeight
        };

        const targetValues = {
            topY: topSymbolY + symbolHeight / 2,
            bottomY: bottomSymbolY - symbolHeight / 2,
            height: symbolHeight
        };

        tween(startValues)
            .to(duration, targetValues, {
                easing: "quadOut",
                onUpdate: () => {
                    this.top.setPosition(0, startValues.topY, 0);
                    this.bottom.setPosition(0, startValues.bottomY, 0);
                }
            })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }
}

