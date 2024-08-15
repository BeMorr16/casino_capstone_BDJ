import { useEffect, useRef, useState } from "react";
import "./BJ.css";
import useStore from "../BJstore/BJstore";
import { sendMiniGame, sendTransaction } from "../BJutils/BJgameUtils";
import { useMutation } from "@tanstack/react-query";
import { addMiniGame, addTransaction } from "../../Utils/APIRequests";
import cardCount from "../BJutils/cardCount";
import useUserState from "../../../store/store";
import { useNavigate } from "react-router-dom";
import BJCardSection from "./BJCardSection";
import BJTurnControls from "./BJTurnControls";
import BJUserBetControls from "./BJUserBetControls";
import BJnavigations from "./BJnavigations";
import BJTableMinSection from "./BJTableMinSection";

export default function Blackjack() {
  const {
    randomizedDecks,
    betAmount,
    lockedBet,
    previousBet,
    dealerCount,
    isBlackjack,
    isPlayerBusted,
    isHandComplete,
    winner,
    setRandomizedDecks,
    setDealersCards,
    setIsBlackjack,
    setWinner,
    resetGame,
    reshuffleDecks,
  } = useStore((state) => ({
    randomizedDecks: state.randomizedDecks,
    betAmount: state.betAmount,
    lockedBet: state.lockedBet,
    previousBet: state.previousBet,
    dealerCount: state.dealerCount,
    isBlackjack: state.isBlackjack,
    isPlayerBusted: state.isPlayerBusted,
    isHandComplete: state.isHandComplete,
    winner: state.winner,
    setRandomizedDecks: state.setRandomizedDecks,
    setDealersCards: state.setDealersCards,
    setIsBlackjack: state.setIsBlackjack,
    setWinner: state.setWinner,
    resetGame: state.resetGame,
    drawCards: state.drawCards,
    reshuffleDecks: state.reshuffleDecks,
  }));
  const [showWinner, setShowWinner] = useState(false);
  const dealerCountRef = useRef(0);
  const dealersCardsRef = useRef([]);
  const deckRef = useRef(randomizedDecks);
  const playerCountRef = useRef(0);
    const playerCardsRef = useRef([]);
    const insuranceRef = useRef(false);
  const transactionMutation = useMutation({
    mutationFn: addTransaction,
  });
    const miniGameMutation = useMutation({
        mutationFn: addMiniGame,
    })
  const navigate = useNavigate();
    const { tableChips, isLoggedIn, adjustTableChips, isMiniGame, setUserMoney, setTableChips, setIsMiniGame } = useUserState();
    const miniGameMarker = window.sessionStorage.getItem("isMiniGame") === "true" || isMiniGame;
    const miniGameChipCount = parseInt(window.sessionStorage.getItem("miniGameChipCount") || "100", 10);
  const betsRemainingSS = parseInt(window.sessionStorage.getItem("betsRemaining") || "10", 10);
  console.log(miniGameMarker)
  const [chipCount, setChipCount] = useState(() => {
    if (isLoggedIn) {
      if (tableChips > 0 && !miniGameMarker) {
        return tableChips;
      } else if (miniGameMarker) {
          window.sessionStorage.setItem("isMiniGame", miniGameMarker);
          window.sessionStorage.setItem("miniGameChipCount", miniGameChipCount);
          window.sessionStorage.setItem("betsRemaining", betsRemainingSS);
        return miniGameChipCount;
      }
    }
    return 1000;
  });
    const [betOutcomes, setBetOutcomes] = useState([]);
    const [sideBetAmount, setSideBetAmount] = useState(0);
    const [lockedSideBet, setLockedSideBet] = useState(0);
    const [sideBetResult, setSideBetResult] = useState(0);
  const [showInsuranceResult, setShowInsuranceResult] = useState(false);
  
    useEffect(() => {
        if (isLoggedIn && tableChips === 0 && !isMiniGame) {
            navigate("/casino");
        }
    },[isLoggedIn, tableChips, navigate, isMiniGame])



  function dealerHitAgain() {
    const [drawnDealerCard, ...remainingDeck] = deckRef.current;
    setDealersCards((prev) => {
      const newCards = [...prev, drawnDealerCard];
      dealersCardsRef.current = newCards;
      return newCards;
    });
    deckRef.current = remainingDeck;
    setRandomizedDecks(() => remainingDeck);
    updatedDealerCount();
  }

  function updatedDealerCount() {
    const allCards = [...dealersCardsRef.current];
    const total = cardCount(allCards);
    dealerCountRef.current = total;
    dealersCardsRef.current = allCards;
  }

  function handleDealersTurn() {
    if (dealerCountRef.current < 17 && dealerCount < 17 && !isPlayerBusted && !isBlackjack) {
      setTimeout(() => {
        dealerHitAgain();
        handleDealersTurn();
      }, 500);
    } else {
      handleEndOfGame();
    }
  }

    function handleEndOfGame() {
        const playerCountToCompare = playerCountRef.current;
        const dealerCountToCompare = dealerCount > dealerCountRef.current ? dealerCount : dealerCountRef.current;
        const bet = useStore.getState().lockedBet;
        if (lockedSideBet > 0) {
            if (sideBetResult === 1) {
                sendTransaction(false, lockedSideBet, transactionMutation, false, sideBetResult)
            } else if (sideBetResult === 6) {
                sendTransaction(true, (lockedSideBet * 6), transactionMutation, false, sideBetResult)
                setChipCount((prev) => prev + (lockedSideBet * 7));
            } else if (sideBetResult === 12) {
                sendTransaction(true, (lockedSideBet * 12), transactionMutation, false, sideBetResult)
                setChipCount((prev) => prev + (lockedSideBet * 13));
            } else if (sideBetResult === 25) {
                sendTransaction(true, (lockedSideBet * 25), transactionMutation, false, sideBetResult)
                setChipCount((prev) => prev + (lockedSideBet * 26));
            }
        }
        const betInsurance = lockedBet / 2
        if (insuranceRef.current && dealersCardsRef.current.length === 2 && dealerCountToCompare === 21) {
        setChipCount((prev) => prev + lockedBet);
        sendTransaction(true, lockedBet, transactionMutation, insuranceRef);
        sendTransaction(false, lockedBet, transactionMutation);
        if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, false ]);
        setWinner("Dealer 21! Insurance wins");
        setShowWinner(true);
        setTimeout(() => {
            setShowWinner(false);
        }, 1500);
        setTimeout(() => {
        resetGame();
        dealerCountRef.current = 0;
        dealersCardsRef.current = [];
        playerCardsRef.current = [];
        playerCountRef.current = 0;
        insuranceRef.current = false;
        setSideBetAmount(0);
        }, 2500);
        return
        } else if (insuranceRef.current) {
        sendTransaction(false, betInsurance, transactionMutation, insuranceRef);
        adjustTableChips((-betInsurance))
        setChipCount((prev) => prev - betInsurance);
      }
    if (playerCardsRef.current.length === 2 && playerCountRef.current === 21) {
      setWinner(`Player wins ${bet * 2.5} with Blackjack!`);
      setChipCount((prev) => prev + bet * 2.5);
      sendTransaction(true, (bet * 1.5), transactionMutation);
        adjustTableChips(bet * 1.5);
    if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, true]);
    } else if (isPlayerBusted || playerCountToCompare > 21) {
      setWinner("Busted! Dealer wins");
      sendTransaction(false, bet, transactionMutation);
        adjustTableChips(-bet);
        if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, false]);
    } else if (dealerCountToCompare > 21) {
      setWinner(`Player wins ${bet * 2}!`);
      setChipCount((prev) => prev + bet * 2);
      sendTransaction(true, bet, transactionMutation);
        adjustTableChips(bet);
        if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, true]);
    } else if (dealerCountToCompare >= 17) {
      if (playerCountToCompare > dealerCountToCompare) {
        setWinner(`Player wins ${bet * 2}!`);
        setChipCount((prev) => prev + lockedBet * 2);
        sendTransaction(true, bet, transactionMutation);
          adjustTableChips(bet);
          if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, true]);
      } else if (playerCountToCompare < dealerCountToCompare) {
        setWinner("Dealer wins!");
        sendTransaction(false, bet, transactionMutation);
          adjustTableChips(-bet);
          if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, false]);
      } else if (playerCountToCompare === dealerCountToCompare) {
        setWinner("Push");
        setChipCount((prev) => prev + bet);
        sendTransaction(false, 0, transactionMutation);
        if (isMiniGame) setBetOutcomes((prevOutcomes) => [...prevOutcomes, "push"]);
      }
    }

        if (isMiniGame) {
            if (chipCount === 0) {
                window.sessionStorage.removeItem("miniGameChipCount");
                window.sessionStorage.removeItem("betsRemaining");
                window.sessionStorage.removeItem("isMiniGame");
                sendMiniGame(chipCount, betOutcomes, miniGameMutation)
                setBetOutcomes([]);
                setIsMiniGame(false);
                setTableChips(0);
                navigate('/casino');
                resetGame();
                dealerCountRef.current = 0;
                dealersCardsRef.current = [];
                playerCardsRef.current = [];
                playerCountRef.current = 0;
                setIsBlackjack(false);
                setSideBetAmount(0);
                insuranceRef.current = false;
                return
            }
            window.sessionStorage.setItem("miniGameChipCount", chipCount);
            if (betsRemainingSS === 1) {
                sendMiniGame(chipCount, betOutcomes, miniGameMutation)
                setUserMoney((prev) => prev + (chipCount-100));
                setTableChips(0)
                setBetOutcomes([])
                setIsMiniGame(false);
                window.sessionStorage.removeItem("miniGameChipCount");
                window.sessionStorage.removeItem("betsRemaining");
                window.sessionStorage.removeItem("isMiniGame");
                navigate('/casino')
                resetGame();
                dealerCountRef.current = 0;
                dealersCardsRef.current = [];
                playerCardsRef.current = [];
                playerCountRef.current = 0;
                setIsBlackjack(false);
                setSideBetAmount(0);
                insuranceRef.current = false;
                return
            }
            const betsRemain = parseInt(window.sessionStorage.getItem("betsRemaining"), 10);
            window.sessionStorage.setItem("betsRemaining", betsRemain - 1);
        }
    setShowWinner(true);
    setTimeout(() => {
      setShowWinner(false);
    }, 1500);
    setTimeout(() => {
      resetGame();
      dealerCountRef.current = 0;
      dealersCardsRef.current = [];
      playerCardsRef.current = [];
      playerCountRef.current = 0;
        setIsBlackjack(false);
        setSideBetAmount(0);
        insuranceRef.current = false;
      if (deckRef.current.length < 30) {
        reshuffleDecks();
      }
    }, 2500);
    }

  return (
    <>
      <div className="BJBody">
      <BJnavigations/>
        <div className="blackjackTopOuterContainer">
          {showWinner && <h2 className="BJWinnerDisplay">{winner}</h2>}
          <div className="blackjackMainSection">
            <BJTableMinSection sideBetAmount={sideBetAmount} setSideBetAmount={setSideBetAmount} chipCount={chipCount}/>
            <BJCardSection />
            {!isHandComplete && (
                          <BJTurnControls chipCount={chipCount} setChipCount={setChipCount} playerCardsRef={playerCardsRef}
                              playerCountRef={playerCountRef} deckRef={deckRef} handleDealersTurn={handleDealersTurn}
                              handleEndOfGame={handleEndOfGame} dealersCardsRef={dealersCardsRef} insuranceRef={insuranceRef} setShowInsuranceResult={setShowInsuranceResult} /> )}
          </div>
          <BJUserBetControls chipCount={chipCount} setChipCount={setChipCount} dealersCardsRef={dealersCardsRef}
            deckRef={deckRef} handleEndOfGame={handleEndOfGame} playerCountRef={playerCountRef}
            playerCardsRef={playerCardsRef} setSideBetResult={setSideBetResult} setLockedSideBet={setLockedSideBet} sideBetAmount={sideBetAmount} setSideBetAmount={setSideBetAmount}/>
        </div>
        {winner && isHandComplete && (
          <div className="BJPreviousBetContainer">
          <h2 className="BJPreviousBetHeader">Previous Bet:</h2>
          <div className="BJPreviousBetContent">
            <p>{winner}</p>
            <p>Wagered: {previousBet}</p>
          </div>
        </div>
              )}
              {winner && (lockedSideBet > 0 || insuranceRef.current) && isHandComplete && (
                   <div className="BJSideBetContainer">
                   <h2 className="BJSideBetHeader">Side Bets:</h2>
                   <div className="BJSideBetContent">
                     {sideBetResult !== 0 && lockedSideBet > 0 && (
                       <p>
                         {sideBetResult === 1 ? "Lost Pair Bet:" : "Won Pair Bet:"} ${lockedSideBet * sideBetResult}
                       </p>
                     )}
                     {showInsuranceResult && (
                       <p>
                         {dealersCardsRef.current.length === 2 && (cardCount(dealersCardsRef.current) === 21 || dealerCountRef.current === 21)
                           ? `Won Insurance $${previousBet}`
                           : `Lost Insurance: $${previousBet / 2}`}
                       </p>
                     )}
                   </div>
                 </div>
               )}

              <div className="BJChipCountContainer">
          <h2 className="BJChipCountHeader">{!isMiniGame ? 'CHIPS' : 'MINIGAME'}</h2>
          <div className="BJChipCount">
            <p>{chipCount - betAmount - sideBetAmount}</p>
            <p>{isMiniGame && `${10 - betOutcomes.length} bets remaining`}</p>
          </div>
          
          </div>
      </div>
    </>
  );
}