import { API_URL } from '../../constants/env';
import { Battle } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';

const create = async (players: Monster[]): Promise<Battle> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(players)
  }).then((response) => response.json());

export const BattleService = {
  create,
};
