import useUserState from "../../../store/store";

const isRed = (number) => {
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  return redNumbers.includes(number);
};

const calculateWinningsHelper = (number, placedBets) => {
  let totalWinnings = 0;
  let totalBetAmount = 0;
  let totalPayoutAmount = 0;
  const betResults = [];

  placedBets.forEach((bet) => {
    const meaning = bet.meaning;
    let payout = 0;

    // Add the bet amount to the total bet amount
    totalBetAmount += bet.amount;

    // Check if the bet is a single number bet stored as an array with one number
    if (
      Array.isArray(meaning) &&
      meaning.length === 1 &&
      meaning[0] === number
    ) {
      payout = bet.amount * 35; // Straight-up bet (35 to 1)
      totalWinnings += payout + bet.amount; // Include the initial bet amount in the payout
      totalPayoutAmount += payout; // Add the payout to the total payout amount
      betResults.push({ bet: meaning, payout: payout + bet.amount });
    } else if (Array.isArray(meaning)) {
      if (meaning.includes(number)) {
        if (meaning.length === 2) {
          payout = bet.amount * 17; // Split bet (17 to 1)
        } else if (meaning.length === 3) {
          payout = bet.amount * 11; // Street bet (11 to 1)
        } else if (meaning.length === 4) {
          payout = bet.amount * 8; // Corner bet (8 to 1)
        } else if (meaning.length === 6) {
          payout = bet.amount * 5; // Double street bet (5 to 1)
        } else if (meaning.length === 12) {
          payout = bet.amount * 2; // Dozen bet (2 to 1)
        } else if (meaning.length === 18) {
          payout = bet.amount * 1; // Column bet (2 to 1)
        }
        totalWinnings += payout + bet.amount; // Include the initial bet amount in the payout
        totalPayoutAmount += payout; // Add the payout to the total payout amount
        betResults.push({ bet: meaning, payout: payout + bet.amount });
      }
    } else if (typeof meaning === "string") {
      if (
        (meaning === "red" && isRed(number)) ||
        (meaning === "black" && !isRed(number)) ||
        (meaning === "even" && number % 2 === 0 && number !== 0) ||
        (meaning === "odd" && number % 2 !== 0) ||
        (meaning === "1-18" && number >= 1 && number <= 18) ||
        (meaning === "19-36" && number >= 19 && number <= 36)
      ) {
        payout = bet.amount; // Even money bet (1 to 1)
        totalWinnings += payout + bet.amount; // Include the initial bet amount in the payout
        totalPayoutAmount += payout; // Add the payout to the total payout amount
        betResults.push({ bet: meaning, payout: payout + bet.amount });
      }
    }
  });

  const totalWonAmount = totalWinnings - totalBetAmount;  

  return { totalWinnings, betResults, totalBetAmount, totalWonAmount };
};

export const sendRouletteTransaction = (
  win,
  money,
  result,
  transactionMutation
) => {
  const transaction = {
    id: useUserState.getState().id,
    game: "roulette",
    win_loss: Boolean(win), // Ensure this is a boolean and the correct field name
    money: money,
    result: `Winning number: ${result.winningNumber}. Bets that hit: ${result.betResults}`,
  };
  if (useUserState.getState().isLoggedIn) {
    transactionMutation.mutate(transaction);
  } else {
    console.log("not logged in");
  }
};

export default calculateWinningsHelper;
