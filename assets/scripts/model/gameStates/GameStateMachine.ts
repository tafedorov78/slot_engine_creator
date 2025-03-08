import { IStateMachine } from "scripts/state-machine/IStateMachine";
import { StateMachine } from "scripts/state-machine/StateMachine";
import { AddLineState } from "./states/AddLineState";
import { FinalState } from "./states/FinalState";
import { IdleState } from "./states/IdleState";
import { InitState } from "./states/InitState";
import { ResetLinesState } from "./states/ResetLinesState";
import { ShowFortuneSymbolResultsState } from "./states/ShowFortuneSymbolsResultState";
import { ShowWaysState } from "./states/ShowWaysState";
import { SpinState } from "./states/SpinState";
import { StartFreespinsState } from "./states/StartFreespinsState";
import { StopFreespinsState } from "./states/StopFreespinsState";
import { StopState } from "./states/StopState";

export class GameStateMachine extends StateMachine implements IStateMachine {

  constructor(model: any, stateEnum: any) {
    super(model, stateEnum);
  }

  init(stateEnum: any): void {
    super.init(stateEnum);

    this.addState(InitState, stateEnum.INIT);
    this.addState(IdleState, stateEnum.IDLE);
    this.addState(SpinState, stateEnum.SPIN);
    this.addState(StopState, stateEnum.STOP);
    this.addState(ShowWaysState, stateEnum.SHOW_WAYS);
    this.addState(ShowFortuneSymbolResultsState, stateEnum.SHOW_FORTUNE_SYMBOLS_RESULT);
    this.addState(AddLineState, stateEnum.ADD_LINE);
    this.addState(ResetLinesState, stateEnum.RESET_LINES);
    this.addState(StartFreespinsState, stateEnum.START_FREESPINS);
    this.addState(StopFreespinsState, stateEnum.STOP_FREESPINS);
    this.addState(FinalState, stateEnum.FINAL);
  }
}