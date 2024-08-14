import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Slots from "../Slots/Slots";
import coinSound from "../assets/sounds/coin.mp3";
import loseSound from "../assets/sounds/lose.mp3";
import spinSound from "../assets/sounds/spin.mp3";
import winSound from "../assets/sounds/win.mp3";
import { addTransaction } from "../../Utils/APIRequests";
import { useMutation } from "@tanstack/react-query";
import useUserState from "../../../store/store";
import SlotMachineUI from "./SlotMachineUI";

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
  const { id, isLoggedIn, tableChips, adjustTableChips, returnChipsToTotal } =
    useUserState();

  // Redirect user to casino page if no chips are selected when entering a game
  const [chipCount, setChipCount] = useState(() => {
    if (isLoggedIn) {
      if (tableChips > 0) {
        return tableChips;
      } else if (tableChips === 0) {
        setTimeout(() => {
          navigate("/casino");
        }, 10000);
        return 0;
      }
    }
    return 1000;
  });
  // Redirect user to casino page if they don't have more chips
  useEffect(() => {
    if (isLoggedIn && tableChips === 0) {
      const timeout = setTimeout(() => {
        navigate("/casino");
      }, 10000);

      return () => clearTimeout(timeout);
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

  //Transactions Logic
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

    transactionMutation.mutate(transaction);
  };

  //Return your chips money when you go back to the casino page
  const handleToCasino = () => {
    returnChipsToTotal();
    navigate("/casino");
  };

  const handleToBlackjack = () => {
    navigate("/blackjack");
  };

  const handleToRoulette = () => {
    navigate("/roulette");
  };

  return (
    <SlotMachineUI
      handleToBlackjack={handleToBlackjack}
      handleToCasino={handleToCasino}
      handleToRoulette={handleToRoulette}
      message={message}
      reels={reels}
      spin={spin}
      betAmount={betAmount}
      setBetAmount={setBetAmount}
      spinReels={spinReels}
      selectedBet={selectedBet}
      setSelectedBet={setSelectedBet}
      chipCount={chipCount}
      jackpot={jackpot}
      lastWin={lastWin}
      toggleAudio={toggleAudio}
      audioOn={audioOn}
    />
  );
};

export default SlotMachine;
