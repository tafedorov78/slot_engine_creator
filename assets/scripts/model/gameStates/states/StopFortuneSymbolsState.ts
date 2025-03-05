import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { SpecialSymbolData, SpecialSymbolType } from "scripts/model/Types";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";
import { checkForSpecialSymbols } from "scripts/ult/Utils";

export class StopFortuneSymbolsState extends BaseState {

  begin(data: SpecialSymbolData[]) {
    GlobalEventManager.getInstance().once(GameEvents.STOP_FORTUNE_SYMBOLS_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.STOP_FORTUNE_SYMBOLS, data);
    GlobalEventManager.getInstance().emit(GameEvents.SHOW_WINNINGS, this.model.spinData.winnings.fortune);
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);
  }

  cleanUp(): void {
  }
}