import { _decorator, Component, log } from 'cc';
import { GameStateMachine } from './gameStates/GameStateMachine';
import { GameStates, GameStatesPriority } from './gameStates/StatesEnum';
import { FreespinsData, InitData, SpecialSymbolData, SpecialSymbolType, SpinData } from './Types';
import { checkForSpecialSymbols } from 'scripts/ult/Utils';
import GlobalEventManager from 'scripts/GlobalEventManager';
import { GameEvents } from 'scripts/gameEvents/GameEvents';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {


    public initData: InitData = null;
    public spinData: SpinData = null;
    public stateQueue: { state: GameStates; data: any }[] = [];
    public isAutoplay: boolean = false;
    public isRespin: boolean = false;
    public fsLeft: number = 0;
    public balance: number = 0;
    public currentBet: number = 0;
    public fortuneSymbols: SpecialSymbolData[] = null;

    private _freespins: FreespinsData = null;
    private _gameStateModel: GameStateMachine = null;

    start() {
        this._gameStateModel = new GameStateMachine(this, GameStates);
        this._gameStateModel.setState(GameStates.INIT)

        this.stateQueue = [];
    }

    public storeInitData(data: InitData): void {
        this.initData = data;
        this.balance = data.balance;
        this.currentBet = data.current_bet;

        GlobalEventManager.getInstance().emit(GameEvents.INIT_GAME, this.initData);
    }

    public storeSpinData(data: SpinData): void {
        this.spinData = data;

        this.balance = data.balance;
        this.currentBet = data.current_bet;

        this.freespins = this.spinData.freespins;

        this.stateQueue.length = 0;

        this.isRespin = data.is_respin;

        if (data.ways) {
            this.stateQueue.push({ state: GameStates.SHOW_WAYS, data: data.ways });
        }

        if (data.is_reset) {
            this.stateQueue.push({ state: GameStates.RESET_LINES, data: null });
        }

        if (data.freespins && data.freespins.total === data.freespins.left) {
            this.stateQueue.push({ state: GameStates.START_FREESPINS, data: data.freespins });
        }

        if (data.freespins && data.freespins.left === 0) {
            this.stateQueue.push({ state: GameStates.STOP_FREESPINS, data: data.freespins });
        }

        if (data.add_lines) {
            this.stateQueue.push({ state: GameStates.ADD_LINE, data: data.add_lines });
        }

        this.fortuneSymbols = checkForSpecialSymbols(data, SpecialSymbolType.fortune);
        if (this.fortuneSymbols && this.fortuneSymbols.length > 0) {
            this.stateQueue.push({ state: GameStates.SHOW_FORTUNE_SYMBOLS_RESULT, data: this.fortuneSymbols });
        }

        this.stateQueue.sort((a, b) => {
            const priorityA = GameStatesPriority[a.state] ?? Number.MAX_VALUE;
            const priorityB = GameStatesPriority[b.state] ?? Number.MAX_VALUE;
            return priorityA - priorityB;
        });

        log('stateQueue', this.stateQueue);
    }



    set freespins(data: FreespinsData) {
        this._freespins = data;
        this.fsLeft = this.freespins ? this.freespins.left : 0;
        this.isAutoplay = Boolean(this.fsLeft);
    }

    get freespins(): FreespinsData {
        return this._freespins;
    }
}

