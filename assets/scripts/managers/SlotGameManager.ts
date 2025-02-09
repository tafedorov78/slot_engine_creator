import { _decorator, Component } from 'cc';
import { GameModel } from 'scripts/model/GameModel';
import { NetworkManager } from './NetworkManager';
import { ReelsManager } from './ReelsManager';
import { UIManager } from './UIManager';

const { ccclass, property } = _decorator;

@ccclass('SlotGameManager')
export class SlotGameManager extends Component {

    @property({ type: GameModel })
    GameModel: GameModel = null;

    @property({ type: ReelsManager })
    reelsManager: ReelsManager = null;

    @property({ type: UIManager })
    uiManager: UIManager = null;

    @property({ type: NetworkManager })
    networkManager: NetworkManager = null;

    private balance: number = 1000;
    private betAmount: number = 10;
}
