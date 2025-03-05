import { _decorator, Component } from 'cc';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { backend } from 'scripts/fake_backend/backend';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
import { InitData, SpinData } from 'scripts/model/Types';
import ReelsSettings from 'scripts/settings/ReelsSettings';
import { mylog } from 'scripts/ult/Utils';
const { ccclass, property } = _decorator;

@ccclass('NetworkManager')
export class NetworkManager extends Component {

    private responseIndex: number = 0;

    private backend: backend;

    protected onLoad(): void {
        GlobalEventManager.getInstance().on(GameEvents.INIT_REQUEST, this.init.bind(this));
        GlobalEventManager.getInstance().on(GameEvents.SPIN_REQUEST, this.spin.bind(this));

    }

    public init(): void {
        this.backend = new backend(ReelsSettings.defaultSymbolsInReel);

        this.sendResult(GameEvents.INIT_RESPONSE, this.backend.init())
    }

    public spin(): void {
        this.sendResult(GameEvents.SPIN_RESPONSE, this.backend.spin());
    }

    private sendResult(event: string, data: any): void {
        GlobalEventManager.getInstance().emit(event, data);
    }
}

