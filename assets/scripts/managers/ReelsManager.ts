import { _decorator, Component, Node } from 'cc';
import { ReelController } from 'prefabs/reel/ReelController';
import { StopReelsData } from 'scripts/model/Types';
import { SlotGameManager } from './SlotGameManager';
import GlobalEventManager from 'scripts/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('ReelsManager')
export class ReelsManager extends Component {

    @property({ type: Node })
    reels: Node[] = [];

    @property({ type: SlotGameManager })
    gameManager: SlotGameManager = null;


    private spinningReelsCount: number = 0;

    protected onLoad(): void {
        GlobalEventManager.getInstance().on('reelStopped', this.onReelStopped, this);
    }

    public startSpin(): void {
        this.spinningReelsCount = this.reels.length;

        for (let reel of this.reels) {
            const reelController = reel.getComponent(ReelController);
            if (reelController) {
                reelController.startSpin();
            }
        }
    }

    public stopSpin(data: StopReelsData): void {
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);
            if (reelController) {
                setTimeout(() => {
                    reelController.stopSpin(data.reels[0]);
                }, i * 200);
            }
        }
    }


    onReelStopped() {
        this.spinningReelsCount--;
        if (this.spinningReelsCount === 0) {
            this.gameManager.onSpinComplete();
        }
    }

    onDestroy(): void {
        GlobalEventManager.getInstance().off('reelStopped', this.onReelStopped, this);
    }
}

