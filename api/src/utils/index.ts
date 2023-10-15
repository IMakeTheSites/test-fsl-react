import { Monster } from '../models';

export function calculateDamage(attacker: Monster, defender: Monster): number {
  const damage = attacker.attack - defender.defense;
  return damage > 0 ? damage : 1;
}

export function battle(monster1: Monster, monster2: Monster): Monster {
  while (monster1.hp > 0 && monster2.hp > 0) {
    if (
      monster1.speed > monster2.speed ||
      (monster1.speed === monster2.speed && monster1.attack > monster2.attack)
    ) {
      const damage = calculateDamage(monster1, monster2);
      monster2.hp -= damage;
      if (monster2.hp <= 0) {
        return monster1;
      }
    } else {
      const damage = calculateDamage(monster2, monster1);
      monster1.hp -= damage;
      if (monster1.hp <= 0) {
        return monster2;
      }
    }
  }

  return monster1.hp > 0 ? monster1 : monster2;
}
