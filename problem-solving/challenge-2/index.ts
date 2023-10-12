export const diceFacesCalculator = (
  dice1: number,
  dice2: number,
  dice3: number
): number => {
  let max = 0;

  let diceArr: any = [];

  [dice1, dice2, dice3].forEach(item => {
    if (item <=0 || item > 6) {
      throw new Error('Dice out of number range');
    }

    if (!diceArr.includes(item)) {
      diceArr.push(item);

      if (max < item) {
        max = item;
      }
    } else {
      max = item;
    }
  })

  return max * (4 - diceArr.length);
};