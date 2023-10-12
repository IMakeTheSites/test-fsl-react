export const findLessCostPath = (board: number[][]): number => {
  let minCost = Number.MAX_SAFE_INTEGER;

  const ROW = board.length;
  const COL = board[0].length;

  let posGrid = Array(ROW).fill(1).map(() => Array(COL).fill(0));
  const moveArr = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  function findCost(rIndex: number, cIndex: number, tempSum: number) {
    tempSum += board[rIndex][cIndex];

    if (tempSum > minCost) return;

    posGrid[rIndex][cIndex] = 1; // mark as passed

    if (rIndex === ROW - 1 && cIndex === COL - 1) { // last item
      minCost = tempSum;
    }

    for (let i = 0; i < moveArr.length; i++) {
      const nrIndex = rIndex + moveArr[i][0];
      const ncIndex = cIndex + moveArr[i][1];

      if (nrIndex >=0 && nrIndex < ROW && ncIndex >= 0 && ncIndex < COL) {
        if (posGrid[nrIndex][ncIndex] === 0) { // 0 => not passed, 1 => passed
          findCost(nrIndex, ncIndex, tempSum);
        }
      }

    }
    posGrid[rIndex][cIndex] = 0;
  }

  findCost(0, 0, 0);

  return minCost - board[ROW - 1][COL - 1];
};
