import { BaseState } from "scripts/state-machine/BaseState";
import GlobalEventManager from "scripts/GlobalEventManager";
import { GameEvents } from "scripts/gameEvents/GameEvents";
import { SpinData } from "scripts/model/Types";
import { GameStates } from "../StatesEnum";

export class SpinState extends BaseState {

  begin(data?: any) {
    if (!this.model.isRespin && !this.model.freespins) {
      GlobalEventManager.getInstance().emit(GameEvents.BALANCE_UPDATE, this.model.balance - this.model.currentBet);
    }

    GlobalEventManager.getInstance().once(GameEvents.SPIN_RESPONSE, this.end);
    GlobalEventManager.getInstance().emit(GameEvents.SPIN_REQUEST);
    GlobalEventManager.getInstance().emit(GameEvents.SPIN_START);
  }

  end = (data: SpinData): void => {
    this.model.storeSpinData(data);
    this.stateMachine.setState(GameStates.STOP);
  }

  cleanUp(): void {
  }
}