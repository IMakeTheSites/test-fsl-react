import { createReducer } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import { fetchMonstersData, setSelectedMonster } from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  comMonster: Monster | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  comMonster: null,
};

const getComMonster = (monsters: Monster[], selectedMonster: Monster | null) => {
  const randomMonsters = monsters.filter(item => item.id !== selectedMonster?.id);
  const comMonsterIdx = (randomMonsters.length * Math.random()).toFixed(0);
  return randomMonsters[parseInt(comMonsterIdx)] ?? randomMonsters[0];
}

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
    comMonster: getComMonster(state.monsters, action.payload)
  }));
});
