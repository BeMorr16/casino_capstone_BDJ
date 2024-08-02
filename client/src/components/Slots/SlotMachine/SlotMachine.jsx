import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Slots from "../Slots/Slots";
import coinSound from "../assets/sounds/coin.mp3";
import loseSound from "../assets/sounds/lose.mp3";
import spinSound from "../assets/sounds/spin.mp3";
import winSound from "../assets/sounds/win.mp3";
import Options from "../Options/Options";
import { addTransaction } from "../../Utils/APIRequests";
import { useMutation } from "@tanstack/react-query";
import SlotMachineIMG from "../assets/images/SlotMachine2.png";
import useUserState from "../../../store/store";
import "./SlotMachine.css";

//Variables
const SlotMachine = () => {
  const navigate = useNavigate();
  const [reels, setReels] = useState([Slots[0], Slots[0], Slots[0]]);
  const [spin, setSpin] = useState(false);
  const [message, setMessage] = useState("Lets Spin!!");
  const [jackpot, setJackpot] = useState(25000);
  const [lastWin, setLastWin] = useState(0);
  const [audioOn, setAudioOn] = useState(true);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState(5);
  const spinAudio = new Audio(spinSound);
  const winAudio = new Audio(winSound);
  const loseAudio = new Audio(loseSound);
  const coinAudio = new Audio(coinSound);
  const { id, isLoggedIn, tableChips, userMoney, adjustTableChips } =
    useUserState();

  const [chipCount, setChipCount] = useState(() => {
    if (isLoggedIn) {
      if (tableChips > 0) {
        return tableChips;
      } else if (tableChips === 0) {
        navigate("/casino");
        return 0;
      }
    }
    return 1000;
  });

  useEffect(() => {
    if (isLoggedIn && tableChips === 0) {
      navigate("/casino");
    }
  }, [isLoggedIn, tableChips, navigate]);

  //Sounds configuration
  const toggleAudio = () => {
    setAudioOn((prev) => !prev);
  };
  //Play sound logic
  const playSound = (sound) => {
    if (audioOn) {
      sound.play();
    }
  };

  const transactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: (data) => {
      console.log("Transaction response:", data);
      if (data) {
        setChipCount(data.chipCount || chipCount);
        setLastWin(data.lastWin || lastWin);
        console.log(data.message || "Transaction succeeded");
        setJackpot(data.jackpot || jackpot);
      } else {
        console.log("Transaction succeeded but no data returned");
      }
    },
    onError: (error) => {
      console.error("Error adding transaction:", error);
      console.log("Transaction failed");
    },
  });

  //Spin Logic
  const spinReels = () => {
    const adjustedBetAmount = betAmount;

    if (chipCount < adjustedBetAmount) {
      setMessage("insufficient funds. !Reload your coins!");
      return;
    }

    setChipCount((prev) => prev - adjustedBetAmount);
    adjustTableChips(-adjustedBetAmount);
    setSpin(true);
    setMessage("");

    if (audioOn) {
      spinAudio.playbackRate = 15.5;
      spinAudio.loop = true;
      spinAudio.play();
    }

    let spins = 0;
    const maxSpins = 25;
    const interval = setInterval(() => {
      setReels(
        reels.map(() => Slots[Math.floor(Math.random() * Slots.length)])
      );
      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);

        if (audioOn) {
          spinAudio.loop = false;
          spinAudio.pause();
          spinAudio.currentTime = 100;
        }

        const finalReels = reels.map(
          () => Slots[Math.floor(Math.random() * Slots.length)]
        );

        setReels(finalReels);
        setSpin(false);
        checkWin(finalReels);
      }
    }, 100);
  };

  //Winning Logic
  const checkWin = (currentReels) => {
    let winAmount = 0;
    console.log("Selected Bet:", selectedBet);
    console.log("Current Reels:", currentReels);

    // selected Bets
    if (selectedBet) {
      //tree numbers are the same
      if (currentReels.every((reel) => reel === selectedBet)) {
        winAmount = (Slots.indexOf(currentReels[0]) + 1) * betAmount + 5000;
        playSound(winAudio);
      } else if (
        //two numbers are the same
        (currentReels[0] === selectedBet && currentReels[1] === selectedBet) ||
        (currentReels[1] === selectedBet && currentReels[2] === selectedBet) ||
        (currentReels[0] === selectedBet && currentReels[2] === selectedBet)
      ) {
        if (
          (currentReels[0] === selectedBet &&
            currentReels[1] === selectedBet) ||
          (currentReels[0] === selectedBet && currentReels[2] === selectedBet)
        ) {
          let match = 0;
          winAmount =
            (Slots.indexOf(currentReels[match]) + 1) * betAmount + 100;
        } else if (
          currentReels[1] === selectedBet &&
          currentReels[2] === selectedBet
        ) {
          let match = 1;
          winAmount =
            (Slots.indexOf(currentReels[match]) + 1) * betAmount + 100;
        }
        playSound(coinAudio);
      } else {
        playSound(loseAudio);
      }
    } else {
      //Regular Bets
      //tree numbers are the same
      if (
        currentReels[0] === currentReels[1] &&
        currentReels[1] === currentReels[2]
      ) {
        winAmount = (Slots.indexOf(currentReels[0]) + 1) * betAmount + 1000;
        //tree jokers (jackpot)
        if (currentReels[0] === Slots[6]) {
          winAmount = jackpot;
          setJackpot(25000);
        }
        playSound(winAudio);
        //two numbers are the same
      } else if (
        currentReels[0] === currentReels[1] ||
        currentReels[1] === currentReels[2] ||
        currentReels[0] === currentReels[2]
      ) {
        if (
          currentReels[0] === currentReels[1] ||
          currentReels[0] === currentReels[2]
        ) {
          let match = 0;
          winAmount = (Slots.indexOf(currentReels[match]) + 1) * betAmount;
        } else if (currentReels[1] === currentReels[2]) {
          let match = 1;
          winAmount = (Slots.indexOf(currentReels[match]) + 1) * betAmount;
        }
        playSound(coinAudio); // Play the coin sound for partial wins
      } else {
        playSound(loseAudio); // Play the lose sound
      }
    }
    if (winAmount > 0) {
      //increasing coins logic
      adjustTableChips(winAmount);
      setChipCount((prev) => prev + winAmount);
      setLastWin(winAmount);
      setMessage(`You have won ${winAmount} coins.`);
      setJackpot((prev) => prev + betAmount);
    } else {
      setMessage("Sorry, try again!");
    }

    const win_loss = winAmount > 0;
    let chipCountToSend;
    if (win_loss) {
      chipCountToSend = winAmount;
    } else {
      chipCountToSend = betAmount * -1;
    }

    let result;
    if (selectedBet) {
      result = { currentReels: currentReels, selectedBet: selectedBet };
    } else {
      result = currentReels;
    }

    const transaction = {
      id: id,
      game: "slots",
      win_loss: win_loss,
      money: chipCountToSend,
      result: result,
    };

    console.log("Transaction:", transaction);
    transactionMutation.mutate(transaction);
    console.log("Win Amount:", winAmount);
  };

  console.log(userMoney, tableChips);

  return (
    <div className="SLTM-slot-machine-background">
      <div className="SLTM-buttons-container">
        <button
          className="SLTMtoBlackJackButton"
          onClick={() => navigate("/blackjack")}
        >
          To BlackJack
        </button>
        <button
          className="SLTMtoCasinoFloorButton"
          onClick={() => navigate("/casino")}
        >
          Back to Casino Floor
        </button>
        <button
          className="SLTMtoRouletteButton"
          onClick={() => navigate("/roulette")}
        >
          To Roulette
        </button>
      </div>
      <div className="SLTM-Blankspace"></div>
      <div className="SLTM-MainContainer">
        <div className="SLTM-slot-machine-container">
          <div
            className={`SLTM-message-container ${
              message.includes("You have won")
                ? "SLTM-message-success"
                : "SLTM-message-error"
            }`}
          >
            {message}
          </div>
          <img
            className="SLTM-SlotMachineIMG"
            src={SlotMachineIMG}
            alt="Slot Machine"
          />
          <div className="SLTM-reel-container">
            {reels.map((Slot, index) => (
              <div
                key={index}
                className={`SLTM-reel ${spin ? "spinning" : ""}`}
              >
                {Slot}
              </div>
            ))}
          </div>
        </div>
        <div className="SLTM-Blankspace"></div>
        <div className="SLTM-BottomContainer">
          <div className="SLTM-bet-amount-container">
            <h3 className="SLTM-SLTMBetAmount">Bet Amount</h3>
            <button
              onClick={() => setBetAmount(5)}
              className={`SLTM-bet-amount-button ${
                betAmount === 5 ? "selected" : ""
              }`}
            >
              5
            </button>
            <button
              onClick={() => setBetAmount(10)}
              className={`SLTM-bet-amount-button ${
                betAmount === 10 ? "selected" : ""
              }`}
            >
              10
            </button>
            <button
              onClick={() => setBetAmount(25)}
              className={`SLTM-bet-amount-button ${
                betAmount === 25 ? "selected" : ""
              }`}
            >
              25
            </button>
            <button
              onClick={() => setBetAmount(50)}
              className={`SLTM-bet-amount-button ${
                betAmount === 50 ? "selected" : ""
              }`}
            >
              50
            </button>
            <button
              onClick={() => setBetAmount(100)}
              className={`SLTM-bet-amount-button ${
                betAmount === 100 ? "selected" : ""
              }`}
            >
              100
            </button>
            <button
              onClick={() => setBetAmount(1000)}
              className={`SLTM-bet-amount-button ${
                betAmount === 1000 ? "selected" : ""
              }`}
            >
              1000
            </button>
          </div>
          <div className="SLTM-spin-button-container">
            <button
              onClick={spinReels}
              disabled={spin}
              className={`SLTM-spin-button ${spin ? "disabled" : ""}`}
            >
              {spin ? "🔄 Spinning..." : `🎲 Spin (${betAmount} coins)`}
            </button>
          </div>
          <h3 className="SLTM-SLTMSpecialBet">Special Bets</h3>
          <div className="SLTM-betting-container">
            <button
              onClick={() => setSelectedBet("")}
              className={`SLTM-bet-button ${
                selectedBet === "" ? "selected" : ""
              }`}
            >
              ❌
            </button>
            <button
              onClick={() => setSelectedBet("👑")}
              className={`SLTM-bet-button ${
                selectedBet === "👑" ? "selected" : ""
              }`}
            >
              👑
            </button>
            <button
              onClick={() => setSelectedBet("🍒")}
              className={`SLTM-bet-button ${
                selectedBet === "🍒" ? "selected" : ""
              }`}
            >
              🍒
            </button>
            <button
              onClick={() => setSelectedBet("💰")}
              className={`SLTM-bet-button ${
                selectedBet === "💰" ? "selected" : ""
              }`}
            >
              💰
            </button>
            <button
              onClick={() => setSelectedBet("💎")}
              className={`SLTM-bet-button ${
                selectedBet === "💎" ? "selected" : ""
              }`}
            >
              💎
            </button>
          </div>
          <div className="SLTM-info-container">
            <div className="SLTM-Money-info-container">
              <span>💰 Coins: {chipCount}</span>
              <span>🏆 Jackpot: {jackpot}</span>
            </div>
          </div>
          <Options
            className="SLMSoundOnOff"
            toggleAudio={toggleAudio}
            audio={audioOn}
          />
          {lastWin > 0 && (
            <div className="SLTM-last-win">Last win: {lastWin} coins!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
