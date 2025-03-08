import { GameEvents } from "scripts/gameEvents/GameEvents";
import GlobalEventManager from "scripts/GlobalEventManager";
import { SpecialSymbolData } from "scripts/model/Types";
import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";

export class ShowFortuneSymbolResultsState extends BaseState {

  private counter: number = 0;

  begin(data: SpecialSymbolData[]) {
    this.counter = 0;
    GlobalEventManager.getInstance().on(GameEvents.FORTUNE_SYMBOLS_STOPPED, this.onSymbolStopped);

    for (let i = 0; i < this.model.fortuneSymbols.length; i++) {
      const symbolDada: SpecialSymbolData = this.model.fortuneSymbols[i];
      setTimeout(() => { GlobalEventManager.getInstance().emit(GameEvents.STOP_FORTUNE_SYMBOL, symbolDada) }, i * 1000);
    }
    GlobalEventManager.getInstance().emit(GameEvents.SHOW_FORTUNE_SYMBOLS_RESULT, data);
  }

  onSymbolStopped = () => {
    this.counter++;
    let delay = 0;

    if (this.model.fortuneSymbols.length === this.counter) {
      if (this.model.spinData.winnings.fortune > 0) {
        delay = 1000;
        GlobalEventManager.getInstance().emit(GameEvents.SHOW_WINNINGS, this.model.spinData.winnings.fortune);
      }

      setTimeout(() => { this.end() }, delay);
    }
  }

  end = (): void => {
    let nextState: string = GameStates.FINAL;
    this.stateMachine.setState(nextState);
  }

  cleanUp(): void {
    GlobalEventManager.getInstance().off(GameEvents.FORTUNE_SYMBOLS_STOPPED, this.onSymbolStopped);
  }
}