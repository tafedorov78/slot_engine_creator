import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";

export class AddLineState extends BaseState {

  begin(addLines: number) {
    GlobalEventManager.getInstance().once(GameEvents.ADD_LINE_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.ADD_LINE_START, addLines);
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;


    setTimeout(() => {
      this.stateMachine.setState(nextState);
    }, 500);
  }

  cleanUp(): void {
  }
}