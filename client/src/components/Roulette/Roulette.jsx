import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board/Board";
import ChipsSelector from "./ChipSelector/ChipSelector";
import NumberHistory from "./NumberHistory/NumberHistory";
import "./Roulette.css";
import {
  getRotationFromNumber,
  getRandomEndRotation,
  getZeroEndRotation,
  getBallEndRotation,
  getBallNumberOfRotations,
  spinWheelAnimation,
} from "./helpers/wheelHelper";
import { getRandomInt } from "./helpers/utils";
import { addTransaction } from "../Utils/APIRequests";
import useUserState from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import calculateWinningsHelper from "./helpers/calculateWinningsHelper";

const Roulette = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [placedBets, setPlacedBets] = useState([]);
  const [betHistory, setBetHistory] = useState([]);
  const [lastBets, setLastBets] = useState([]);
  const [result, setResult] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [totalBet, setTotalBet] = useState(0);

  const [selectedChip, setSelectedChip] = useState(1);
  const [numberHistory, setNumberHistory] = useState([]);
  const [lastNumber, setLastNumber] = useState(0);
  const [rouletteData] = useState({
    numbers: [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
      24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
    ],
  });
  const { tableChips, isLoggedIn, adjustTableChips, id } = useUserState();

  // useEffect(() => {
  //   if (!isLoggedIn && tableChips === 0) {
  //     setChipCount(1000)
  //   }
  // }, [isLoggedIn, tableChips]);
  


  // Mutation setup
  const transactionMutation = useMutation({
    mutationFn: addTransaction,
    onError: (error) => {
      console.error("Error sending transaction:", error);
    },
  });

  const [chipCount, setChipCount] = useState(() => {
    if (isLoggedIn) {
      if (tableChips > 0) {
        // adjustTableChips(0);
        return tableChips;
      } else {
        return 0;
      }
    } else {
      if (tableChips === 0) {
        adjustTableChips(1000)

      }
      return tableChips;
    }
  });

  // useEffect(() => {
  //   if (tableChips === 0) {
  //     if (!isLoggedIn) {
  //       adjustTableChips(1000);
  //       // setChipCount(1000);
  //     }
  //   }
  // }, [isLoggedIn, tableChips, adjustTableChips]);

  const spinWheel = (number) => {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const ballMinNumberOfSpins = 2;
    const ballMaxNumberOfSpins = 4;
    const wheelMinNumberOfSpins = 2;
    const wheelMaxNumberOfSpins = 4;
    const lastNumberRotation = getRotationFromNumber(
      lastNumber.toString(),
      rouletteData,
      360 / 37
    );
    const endRotation = -getRandomEndRotation(
      ballMinNumberOfSpins,
      ballMaxNumberOfSpins,
      37,
      360 / 37
    );
    const zeroFromEndRotation = getZeroEndRotation(endRotation);
    const ballEndRotation =
      getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
      getBallEndRotation(zeroFromEndRotation, number, rouletteData, 360 / 37);
    spinWheelAnimation(
      lastNumberRotation,
      endRotation,
      ballEndRotation,
      5000,
      bezier
    );
    setLastNumber(number);
  };

  const sendRouletteTransaction = async (win, money, result) => {
    const transaction = {
      id: id,
      game: "roulette",
      win_loss: win,
      money,
      result: `Winning number: ${result.winningNumber}. Bets that hit: ${result.betResults}`,
    };

    console.log("Sending transaction:", transaction);

    try {
      const response = await transactionMutation.mutateAsync(transaction);
      console.log("Transaction response:", response);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const handleEndOfGame = (randomNumber) => {
    const { totalWinnings, betResults, totalBetAmount, totalWonAmount } =
      calculateWinningsHelper(randomNumber, placedBets);
    console.log(`calc winnings helper: betAmount`)
    console.log(
      ` totalWinnings: ${totalWinnings}    totalBetAmount: ${totalBetAmount}`
    );
    console.log(
      ` betResults: ${betResults}    totalWonAmount: ${totalWonAmount}`
    );
    console.log("---------------")
    console.log("---------------")
    console.log("---------------")

    const newBalance = totalWinnings + chipCount;
    adjustTableChips(totalWinnings);
    setChipCount(newBalance);
    setResult(totalWinnings);
    setLastBets(placedBets);
    setPlacedBets([]);
    setTotalBet(0); // Reset total bet after the game ends
    const win = totalWonAmount > 0 ? true : false;
    const money = totalWonAmount;

    const resultDetails = {
      winningNumber: randomNumber,
      betResults: betResults
        .map((result) => `Bet: ${result.bet}, Payout: ${result.payout}`)
        .join(", "),
    };
    sendRouletteTransaction(win, money, resultDetails);

    if (isLoggedIn) {
      if (newBalance === 0) {
        navigate("/casino");
      }
    } else {
      if (newBalance === 0) {
        adjustTableChips(1000);
        setChipCount(1000)
      }
    }
  };

  const handleSpinClick = () => {
    if (isSpinning) return; // Prevent multiple spins while already spinning
    const randomNumber = getRandomInt(0, 36);
    spinWheel(randomNumber);
    setIsSpinning(true);
    setTimeout(() => {
      setNumber(randomNumber);
      setIsSpinning(false);
      handleEndOfGame(randomNumber);
      setNumberHistory((prevHistory) => [
        randomNumber,
        ...prevHistory.slice(0, 11),
      ]);
    }, 5000);
  };

  const handlePlaceBet = (newBet) => {
    if (chipCount < newBet.amount) {
      alert("You cannot bet more than your current balance.");
      return;
    }
    setPlacedBets([...placedBets, newBet]);
    setBetHistory((prevHistory) => [...prevHistory, newBet]);
    setChipCount(chipCount - newBet.amount); // Directly update chipCount
    adjustTableChips(-newBet.amount);
    setTotalBet(totalBet + newBet.amount);
  };

  const handleUndoLastBet = () => {
    if (betHistory.length === 0) return;
    const lastBet = betHistory[betHistory.length - 1];
    setPlacedBets((prevBets) => {
      const betIndex = prevBets.findIndex(
        (bet) => JSON.stringify(bet.meaning) === JSON.stringify(lastBet.meaning)
      );
      if (betIndex !== -1) {
        const updatedBets = [...prevBets];
        if (updatedBets[betIndex].amount > lastBet.amount) {
          updatedBets[betIndex].amount -= lastBet.amount;
        } else {
          updatedBets.splice(betIndex, 1);
        }
        return updatedBets;
      }
      return prevBets;
    });
    setChipCount((prevBalance) => prevBalance + lastBet.amount);
    adjustTableChips(lastBet.amount);
    setBetHistory((prevHistory) => prevHistory.slice(0, -1));
    setTotalBet((prevTotal) => prevTotal - lastBet.amount); // Update total bet
  };

  const handleClearBets = () => {
    const totalBets = placedBets.reduce((acc, bet) => acc + bet.amount, 0);
    setChipCount((prevBalance) => prevBalance + totalBets);
    adjustTableChips(totalBets);
    setPlacedBets([]);
    setTotalBet(0); // Reset total bet
  };

  const handleRepeatLastBets = () => {
    const totalLastBets = lastBets.reduce((acc, bet) => acc + bet.amount, 0);
    if (chipCount < totalLastBets) {
      alert("You cannot bet more than your current balance.");
      return;
    }
    setChipCount((prevBalance) => prevBalance - totalLastBets);
    adjustTableChips(-totalLastBets);
    setPlacedBets(lastBets.map((bet) => ({ ...bet })));
    setTotalBet(totalLastBets); // Update total bet
  };

  const handleChipSelect = (chip) => {
    setSelectedChip(chip);
  };

  return (
    <div className="roulette-game">
      <div className="nav-buttons">
        <div className="nav-btn" onClick={() => navigate("/blackjack")}>
          To BlackJack
        </div>
        <div className="nav-btn" onClick={() => navigate("/slots")}>
          To Slots
        </div>
        <div className="nav-btn" onClick={() => navigate("/casino")}>
          Back To Casino
        </div>
      </div>
      <div className="roulette-info">
        <div className="roulette-info-content">
          <h2>Winning Number: {number}</h2>
        </div>
        <div className="roulette-info-content">
          <h2>Total Payout: ${result}</h2>
        </div>
        <div className="roulette-info-content">
          <h2>Balance: ${tableChips}</h2>
        </div>
        <div className="roulette-info-content">
          <h2>Total Bet: ${totalBet}</h2> {/* Display total bet */}
        </div>
      </div>

      <div className="board">
        <Board
          selectedChip={selectedChip}
          placeBet={handlePlaceBet}
          placedBets={placedBets}
        />
        <div className={"roulette-wheel"}>
          <div className={"layer-2 wheel"}></div>
          <div className={"layer-3"}></div>
          <div className={"layer-4 wheel"}></div>
          <div className={"layer-5"}></div>
          <div className={"ball-container"}>
            <div className={"ball"}></div>
          </div>
        </div>
        <NumberHistory history={numberHistory} />
        <button
          className="spin-btn"
          onClick={handleSpinClick}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning" : "Spin!"}
        </button>
      </div>

      <div className="wheel-and-history"></div>

      <ChipsSelector
        className="chip-selectors"
        selectedChip={selectedChip}
        onChipSelect={handleChipSelect}
        onRepeatLastBets={handleRepeatLastBets}
        onUndoLastBet={handleUndoLastBet}
        onClearBets={handleClearBets}
      />
    </div>
  );
};

export default Roulette;
