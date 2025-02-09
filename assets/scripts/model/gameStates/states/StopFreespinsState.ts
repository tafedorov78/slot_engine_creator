import { BaseState } from "scripts/state-machine/BaseState";
import GlobalEventManager from "scripts/GlobalEventManager";
import { GameEvents } from "scripts/gameEvents/GameEvents";
import { FreespinsData, SpinData } from "scripts/model/Types";
import { GameStates } from "../StatesEnum";

export class StopFreespinsState extends BaseState {

  begin(data?: FreespinsData) {
    GlobalEventManager.getInstance().once(GameEvents.STOP_FREESPINS_SHOW_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.STOP_FREESPINS_SHOW, data);
  }

  end = (data: SpinData): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);
  }

  cleanUp(): void {
  }
}