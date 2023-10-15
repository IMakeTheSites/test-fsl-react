import { BattleService } from './battle.service';
import monstersData from '../../../../data/monsters.json';

describe('Battle Service', () => {
  it('should return the valid winner', async () => {
    jest.spyOn(BattleService, 'create').mockResolvedValue({
      id: '1',
      winner: monstersData.monsters[0]
    });
    const response = await BattleService.create([monstersData.monsters[0], monstersData.monsters[1]]);
    expect(response).toEqual({
      id: '1',
      winner: monstersData.monsters[0]
    });
  });
});
