import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";

export class ResetLinesState extends BaseState {

  begin(data?: any) {
    GlobalEventManager.getInstance().once(GameEvents.RESET_LINES_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.RESET_LINES_START);
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);


  }

  cleanUp(): void {
  }
}