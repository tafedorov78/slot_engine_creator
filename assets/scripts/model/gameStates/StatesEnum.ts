export enum GameStates {
  INIT = 'INIT',
  IDLE = 'IDLE',
  SPIN = 'SPIN',
  STOP = 'STOP',
  SHOW_WAYS = 'SHOW_WAYS',
  SHOW_FORTUNE_SYMBOLS_RESULT = 'SHOW_FORTUNE_SYMBOLS_RESULT',
  ADD_LINE = 'ADD_LINE',
  RESET_LINES = 'RESET_LINES',
  START_FREESPINS = 'START_FREESPINS',
  STOP_FREESPINS = 'STOP_FREESPINS',
  FINAL = 'FINAL',
}

export const GameStatesPriority = {
  SHOW_FORTUNE_SYMBOLS_RESULT: 1,
  SHOW_WAYS: 2,
  ADD_LINE: 3,
  RESET_LINES: 3,
  START_FREESPINS: 4,
  STOP_FREESPINS: 4,
  START_BONUS: 4,
  STOP_BONUS: 4,
}