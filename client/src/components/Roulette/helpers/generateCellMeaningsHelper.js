// Define all the constants
const topRow = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const middleRow = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const bottomRow = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

const firstDozen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const secondDozen = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const thirdDozen = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

const firstHalf = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];
const secondHalf = [
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
];

const even = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];
const odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];

const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const black = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

// Define helper functions
const getVerticalSplit = (rowArray1, rowArray2, index) => {
  return [rowArray1[index], rowArray2[index]];
};

const getCorner = (row, col) => {
  if (row === 1) {
    const index = Math.floor(col / 2);
    const topArr = middleRow;
    const bottomArr = topRow;
    const index1 = index - 1;
    const index2 = index;

    if (
      index1 >= 0 &&
      index1 < topArr.length &&
      index2 >= 0 &&
      index2 < topArr.length
    ) {
      const split1 = getVerticalSplit(topArr, bottomArr, index1);
      const split2 = getVerticalSplit(topArr, bottomArr, index2);

      const [left1, left2] = split1;
      const [right1, right2] = split2;

      return [left1, left2, right1, right2];
    }
  } else if (row === 3) {
    const index = Math.floor(col / 2);
    const topArr = middleRow;
    const bottomArr = bottomRow;
    const index1 = index - 1;
    const index2 = index;

    if (
      index1 >= 0 &&
      index1 < topArr.length &&
      index2 >= 0 &&
      index2 < topArr.length
    ) {
      const split1 = getVerticalSplit(topArr, bottomArr, index1);
      const split2 = getVerticalSplit(topArr, bottomArr, index2);

      const [left1, left2] = split1;
      const [right1, right2] = split2;

      return [left1, left2, right1, right2];
    }
  }

  return "Not a Placable Bet";
};

// generates cell meanings so that each cell knows what it is
// then we can calculate winnings be checking the meaning of the bets
// allows us to know what multipliers to use for each bet
const generateCellMeaning = (row, col) => {
  if (col === 0) {
    switch (row) {
      case 0:
        return ["Basket", 0, 3];
      case 1:
        return ["Basket", 0, 2, 3];
      case 2:
        return ["Basket", 0, 2];
      case 3:
        return ["Basket", 0, 1, 2];
      case 4:
        return ["Basket", 0, 1];
      case 5:
        return "Not a Placable Bet";
      default:
        return "";
    }
  }
  if (col === 24) return "Not Clickable";
  if (col === 25) {
    if (row === 0) return topRow;
    if (row === 1) return "Not Clickable";
    if (row === 2) return middleRow;
    if (row === 3) return "Not Clickable";
    if (row === 4) return bottomRow;
    if (row === 5) return "Not Clickable";
  }

  if (row === 0) {
    const number = 3 * Math.ceil(col / 2);
    if (col === 24) return "Not Clickable";
    if (col % 2 === 0) {
      const prevNumber = number - 3;
      return [prevNumber + 3, number + 3];
    } else {
      return [number];
    }
  }

  if (row === 2) {
    const number = 3 * Math.ceil(col / 2) - 1;
    if (col % 2 === 0) {
      const prevNumber = number - 3;
      return [prevNumber + 3, number + 3];
    } else {
      return [number];
    }
  }

  if (row === 4) {
    const number = 3 * Math.ceil(col / 2) - 2;
    if (col % 2 === 0) {
      const prevNumber = number - 3;
      return [prevNumber + 3, number + 3];
    } else {
      return [number];
    }
  }

  const isEvenCol = col % 2 === 0;

  if (row === 1) {
    if (!isEvenCol) {
      return getVerticalSplit(topRow, middleRow, Math.floor(col / 2));
    } else {
      return getCorner(row, col);
    }
  }

  if (row === 3) {
    if (!isEvenCol) {
      return getVerticalSplit(middleRow, bottomRow, Math.floor(col / 2));
    } else {
      return getCorner(row, col);
    }
  }

  if (row === 5) {
    const index = Math.floor(col / 2);
    if (isEvenCol) {
      const baseNumber_1 = bottomRow[index - 1];
      const baseNumber_2 = bottomRow[index];
      const numbers = [
        baseNumber_1,
        baseNumber_1 + 1,
        baseNumber_1 + 2,
        baseNumber_2,
        baseNumber_2 + 1,
        baseNumber_2 + 2,
      ];
      return numbers;
    } else {
      const baseNumber = bottomRow[index];
      const numbers = [baseNumber, baseNumber + 1, baseNumber + 2];
      return numbers;
    }
  }

  return [];
};

const getOuterCellMeaning = (row, col) => {
  if (row === 6) {
    if (col === 0) return firstDozen;
    if (col === 1) return secondDozen;
    if (col === 2) return thirdDozen;
  }
  if (row === 7) {
    if (col === 0) return firstHalf;
    if (col === 1) return even;
    if (col === 2) return red;
    if (col === 3) return black;
    if (col === 4) return odd;
    if (col === 5) return secondHalf;
  }

  return [];
};

// Export the functions
export { generateCellMeaning, getOuterCellMeaning };
