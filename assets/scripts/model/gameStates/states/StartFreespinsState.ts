import { BaseState } from "scripts/state-machine/BaseState";
import GlobalEventManager from "scripts/GlobalEventManager";
import { GameEvents } from "scripts/gameEvents/GameEvents";
import { FreespinsData, SpinData } from "scripts/model/Types";
import { GameStates } from "../StatesEnum";

export class StartFreespinsState extends BaseState {

  begin(data?: FreespinsData) {
    GlobalEventManager.getInstance().once(GameEvents.FREESPINS_SHOW_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.START_FREESPINS_SHOW, data);
  }

  end = (data: SpinData): void => {
    this.stateMachine.setState(GameStates.FINAL);
  }

  cleanUp(): void {
  }
}