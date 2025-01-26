import { _decorator, Component, Node } from 'cc';
import { InitData, ReelsData } from 'scripts/model/Types';
import { SlotGameManager } from './SlotGameManager';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { ReelController } from 'prefabs/reel/ReelController';
import ReelsSettings from 'scripts/model/ReelsSettings';
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

    public init(data: InitData): void {
        for (let i: number = 0; i < this.reels.length; i++) {
            const reelController = this.reels[i].getComponent(ReelController);
            if (reelController) {
                reelController.init(data.reels[i]);
            } else {
                console.error('Reel node is not found!');

            }
        }
    }

    public startSpin(): void {
        this.spinningReelsCount = this.reels.length;

        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);
            if (reelController) {
                reelController.startSpin();
            }
        }
    }

    public stopSpin(data: ReelsData): void {
        for (let i = 0; i < this.reels.length; i++) {
            const reel = this.reels[i];
            const reelController = reel.getComponent(ReelController);
            if (reelController) {
                setTimeout(() => {
                    reelController.stopSpin(data.reels[i]);
                }, i * ReelsSettings.default_delay_between_reels);
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

