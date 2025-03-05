import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";
import { SpecialSymbolType, SpinData } from "scripts/model/Types";
import { checkForSpecialSymbols } from "scripts/ult/Utils";

export class GetSpinResponseState extends BaseState {

  begin(data?: any) {
    GlobalEventManager.getInstance().once(GameEvents.SPIN_RESPONSE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.SPIN_REQUEST);
  }

  end = (data: SpinData): void => {
    this.model.storeSpinData(data);

    let nextState: string = GameStates.STOP;
    let nextStateData = null;

    this.stateMachine.setState(nextState, nextStateData);
  }

  cleanUp(): void {
  }
}