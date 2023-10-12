import { createReducer } from '@reduxjs/toolkit';
import { postBattleData } from './battle.actions';
import { Battle } from '../../models/interfaces/battle.interface';

interface BattleState {
  currentBattle: Battle | null
}

const initialState: BattleState = {
  currentBattle: null,
};

export const battleReducer = createReducer(initialState, (builder) => {
  builder.addCase(postBattleData.pending, (state) => ({
    ...state,
    currentBattle: null,
  }));

  builder.addCase(postBattleData.rejected, (state) => ({
    ...state,
    currentBattle: null,
  }));

  builder.addCase(postBattleData.fulfilled, (state, action) => ({
    ...state,
    currentBattle: action.payload,
  }));
});
