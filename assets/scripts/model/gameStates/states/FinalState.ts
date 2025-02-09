import { BaseState } from "scripts/state-machine/BaseState";
import { GameStates } from "../StatesEnum";

export class FinalState extends BaseState {

  begin() {
    let nextState: string = GameStates.IDLE;
    let nextStateData: any = null;

    if (this.model.stateQueue.length > 0) {
      const stateData = this.model.stateQueue.shift();
      nextState = stateData.state;
      nextStateData = stateData.data;
    }

    this.stateMachine.setState(nextState, nextStateData);
  }

  cleanUp(): void {
  }
}