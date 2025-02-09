import { BaseState } from "scripts/state-machine/BaseState";
import GlobalEventManager from "scripts/GlobalEventManager";
import { GameEvents } from "scripts/gameEvents/GameEvents";
import { InitData } from "scripts/model/Types";
import { GameStates } from "../StatesEnum";

export class InitState extends BaseState {

  begin(data?: any) {
    GlobalEventManager.getInstance().once(GameEvents.INIT_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.INIT_REQUEST);
  }

  end = (data: InitData): void => {
    this.stateMachine.setState(GameStates.IDLE);
  }

  cleanUp(): void {
    GlobalEventManager.getInstance().off(GameEvents.INIT_COMPLETE, this.end);
  }
}