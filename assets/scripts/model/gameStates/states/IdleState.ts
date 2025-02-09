import { BaseState } from "scripts/state-machine/BaseState";
import GlobalEventManager from "scripts/GlobalEventManager";
import { GameStates } from "../StatesEnum";
import { GameEvents } from "scripts/gameEvents/GameEvents";

export class IdleState extends BaseState {

  begin(data?: any) {
    GlobalEventManager.getInstance().emit(GameEvents.IDLE_START);

    if (this.model.isAutoplay) {
      this.end();
    } else {
      GlobalEventManager.getInstance().once('spinPressed', this.end, this);
    }
  }

  end = (): void => {
    this.stateMachine.setState(GameStates.SPIN);
  }

  cleanUp(): void {
    GlobalEventManager.getInstance().off('spinPressed', this.end, this);
  }
}