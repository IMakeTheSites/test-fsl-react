import { createAsyncThunk } from '@reduxjs/toolkit';
import { Battle } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';
import { BattleService } from './battle.service';

export const postBattleData = createAsyncThunk<Battle, Monster[]>(
  'battle/postBattleData',
  BattleService.create
);

