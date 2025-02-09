import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";
import { SpecialSymbolType } from "scripts/model/Types";
import { checkForSpecialSymbols } from "scripts/ult/Utils";

export class StopState extends BaseState {

  begin(data?: any) {
    GlobalEventManager.getInstance().once(GameEvents.SPIN_COMPLETE, this.end);

    setTimeout(() => {
      GlobalEventManager.getInstance().emit(GameEvents.SPIN_STOP, this.model.spinData);
    }, 1000);
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);
  }

  cleanUp(): void {
  }
}