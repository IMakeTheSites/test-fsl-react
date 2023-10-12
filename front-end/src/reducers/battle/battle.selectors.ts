import { RootState } from '../../app/store';

export const selectCurrentBattle = (state: RootState) =>
  state.battle.currentBattle;
