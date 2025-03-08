import { _decorator, Component, Node, Tween, v3, easing, Label, tween, Vec3 } from 'cc';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import GlobalEventManager from 'scripts/GlobalEventManager';
const { ccclass, property } = _decorator;

const SECTIONS = [0, -310, -259, -207, -156, -104, -52];

@ccclass('FortuneSymbolComponent')
export class FortuneSymbolComponent extends Component {

    @property({ type: Node })
    wheel: Node = null;

    @property({ type: Node })
    sections: Node[] = [];

    @property({ type: Label })
    resultLabel: Label = null;

    private currentWin: string = '';
    private finishAngle: number = 0;
    private spinTween: Tween = null;

    protected onLoad(): void {
    }

    public startSpin(winData: string): void {
        this.currentWin = winData;

        this.generateData();

        this.spinTween = tween(this.wheel)
            .by(0.2, { angle: -360 })
            .repeatForever()
            .start();
    }

    private generateData(): void {
        const winSection: number = Math.floor(Math.random() * 7);
        this.finishAngle = SECTIONS[winSection];
        this.sections[winSection].getComponent(Label).string = this.currentWin;
    }

    public stopSpin(): void {
        if (this.spinTween) {
            this.spinTween.stop();
        }

        const currentAngle = this.wheel.angle % 360;
        const extraRotation = -1440 - currentAngle + this.finishAngle;

        tween(this.wheel)
            .by(2, { angle: extraRotation }, { easing: 'cubicOut' })
            .call(() => {
                GlobalEventManager.getInstance().emit(GameEvents.FORTUNE_SYMBOLS_STOPPED);
            })
            .start();
    }

}