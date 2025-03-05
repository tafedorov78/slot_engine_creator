import { BaseState } from "scripts/state-machine/BaseState";
import GlobalEventManager from "scripts/GlobalEventManager";
import { GameEvents } from "scripts/gameEvents/GameEvents";
import { InitData } from "scripts/model/Types";
import { GameStates } from "../StatesEnum";

export class InitState extends BaseState {

  begin(data?: any) {
    GlobalEventManager.getInstance().once(GameEvents.INIT_COMPLETE, this.end);
    GlobalEventManager.getInstance().once(GameEvents.INIT_RESPONSE, this.onInitResponse);
    GlobalEventManager.getInstance().emit(GameEvents.INIT_REQUEST);
  }

  onInitResponse = (data: InitData): void => {
    this.model.storeInitData(data);
  }

  end = (): void => {
    this.stateMachine.setState(GameStates.IDLE);
  }

  cleanUp(): void {
    GlobalEventManager.getInstance().off(GameEvents.INIT_COMPLETE, this.end);
  }
}