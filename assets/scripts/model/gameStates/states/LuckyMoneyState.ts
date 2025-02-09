import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { SpecialSymbolData } from "scripts/model/Types";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";

export class LuckyMoneyState extends BaseState {

  begin(data: SpecialSymbolData[]) {
    GlobalEventManager.getInstance().once(GameEvents.LUCKY_MONEY_COMPLETE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.LUCKY_MONEY_START, data);
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);
  }

  cleanUp(): void {
  }
}