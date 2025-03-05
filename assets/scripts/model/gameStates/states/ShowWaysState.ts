import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { WaysData } from "scripts/model/Types";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";
import { getUniquePositions } from "scripts/ult/Utils";

export class ShowWaysState extends BaseState {

  begin(data: WaysData) {
    GlobalEventManager.getInstance().once(GameEvents.SHOW_WAYS_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.SHOW_WAYS_START, getUniquePositions(data));
    GlobalEventManager.getInstance().emit(GameEvents.SHOW_WINNINGS, this.model.spinData.winnings.ways);
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);
  }

  cleanUp(): void {
  }
}