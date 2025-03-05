import { _decorator, Button, Component, Label } from 'cc';
import GlobalEventManager from 'scripts/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ type: Label })
    balanceLabel: Label = null;

    @property({ type: Label })
    betLabel: Label = null;

    @property({ type: Label })
    winMessageLabel: Label = null;

    @property({ type: Button })
    spinButton: Button = null;

    onLoad() {
        this.spinButton.node.on('click', this.onSpinButtonClicked, this);
    }

    onSpinButtonClicked() {
        GlobalEventManager.getInstance().emit('spinPressed');
    }
}
