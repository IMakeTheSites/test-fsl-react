import { Id, RelationMappings, Model } from 'objection';
import Base from './base';
import { Battle } from './battle.model';

export class Monster extends Base {
  id!: Id;
  name!: string;
  attack!: number;
  defense!: number;
  hp!: number;
  speed!: number;
  imageUrl!: string;

  static tableName = 'monster';

  static get relationMappings(): RelationMappings {
    return {
      battles: {
        relation: Model.ManyToManyRelation,
        modelClass: Battle,
        join: {
          from: 'monster.id',
          through: {
            from: 'battle.monsterA.id',
            to: 'battle.monsterB.id',
          },
          to: 'battle.id',
        },
      },
    };
  }
}
