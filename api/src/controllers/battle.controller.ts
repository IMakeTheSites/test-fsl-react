import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import { battle } from '../utils';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const add = async (req: Request, res: Response): Promise<Response> => {
  const reqMonsters = req.body;

  if (!reqMonsters[0] || !reqMonsters[1]) {
    return res.status(StatusCodes.BAD_REQUEST).json({})
  }

  let monsters;

  try {
    monsters = await Monster.query().findByIds(reqMonsters.map((rM: Monster) => rM.id));
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
  }

  
  if (monsters.length < 2) { // if inexistent
    return res.status(StatusCodes.BAD_REQUEST).json({})
  }

  const newBat = battle(monsters[0], monsters[1]);

  try {
    const result = await Battle.query().insert({
      winner: newBat,
      monsterA: monsters[0],
      monsterB: monsters[1]
    });
    return res.status(StatusCodes.OK).json({
      id: result.id,
      winner: result.winner
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  
};

export const BattleController = {
  list,
  add,
};
