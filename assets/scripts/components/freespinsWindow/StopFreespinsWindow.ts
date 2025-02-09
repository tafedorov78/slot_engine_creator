import { _decorator, Button } from 'cc';
import { WindowComponent } from 'prefabs/modal/scripts/WindowComponent';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import { FreespinsData } from 'scripts/model/Types';
const { ccclass, property } = _decorator;

@ccclass('StopFreespinsWindow')
export class StopFreespinsWindow extends WindowComponent {

    @property({ type: Button }) startBbtn: Button = null;


    protected onLoad(): void {
        GlobalEventManager.getInstance().on(GameEvents.STOP_FREESPINS_SHOW, this.onShow.bind(this));
        this.hide();
    }

    private onShow(data: FreespinsData): void {
        this.show();
        this.headerLabel.string = 'Stop Free Spins';
        this.bodyText.string = String(data.left);
    }

    public onStartBtnClick(): void {
        GlobalEventManager.getInstance().emit(GameEvents.STOP_FREESPINS_SHOW_COMPLETE);
        this.hide();
    }

    private show(): void {
        this.node.active = true;
    }

    private hide(): void {
        this.node.active = false;
    }

}

