import useUserState from "../../../store/store";
import useStore from "../BJstore/BJstore";
import cardCount, { evalPerfectPair } from "./cardCount";

  
  
export function handleStand(setIsDealersTurn, handleDealersTurn) {
  setIsDealersTurn(true);
  handleDealersTurn();
}

export function handleInsurance(insuranceRef, setShowInsuranceResult, handleDealersTurn, setIsDealersTurn) {
  insuranceRef.current = true;
  setShowInsuranceResult(true)
  setIsDealersTurn(true);
  handleDealersTurn();
}
  
  export function handleHit(playerCardsRef, deckRef, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleEndOfGame, playerCountRef) {
    const [drawnUserCard, ...remainingDeck] = deckRef.current;
    if (!drawnUserCard) {
      return;
  }
    setPlayersCards((prev) => {
      const newCards = [...prev, drawnUserCard];
      const newCount = cardCount(newCards);
      playerCountRef.current = newCount;
      playerCardsRef.current = newCards;
      if (newCount > 21) {
        setIsPlayerBusted(true);
        handleEndOfGame();
      }
      return newCards;
    });
    deckRef.current = remainingDeck;
    setRandomizedDecks(() => remainingDeck);
  }

  export function handleDouble(deckRef, lockedBet, setChipCount, handleHit, setIsDealersTurn, setLockedBet, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleDealersTurn, handleEndOfGame, playerCardsRef, playerCountRef){
    setChipCount((prev) => prev - lockedBet);
    setLockedBet(lockedBet * 2);
    handleHit(playerCardsRef, deckRef, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleEndOfGame, playerCountRef)
    if (playerCountRef.current < 22) {
      handleStand(setIsDealersTurn, handleDealersTurn);
    }
  }
  
  export function handleSubmit(e, setIsDealersTurn, setIsHandComplete, setLockedBet, betAmount, setChipCount, randomizedDecks,
    setPlayersCards, setDealersCards, setRandomizedDecks, setBetAmount, setIsBlackjack, dealersCardsRef, deckRef,
    handleEndOfGame, playerCountRef, playerCardsRef, setSideBetResult, setLockedSideBet, sideBetAmount, setSideBetAmount, setPreviousBet) {
    e.preventDefault();
    setIsDealersTurn(false);
    setIsHandComplete(false);
    setLockedBet(betAmount);
    setPreviousBet(betAmount);
    setChipCount((prev) => prev - betAmount - sideBetAmount);
      setBetAmount(() => 0);
    const drawnUserCards = randomizedDecks.slice(0, 2);
    setPlayersCards((prev) => [...prev, ...drawnUserCards]);
    const drawnHouseCards = randomizedDecks.slice(2, 4);
    setDealersCards((prev) => {
      const newCards = [...prev, ...drawnHouseCards];
      dealersCardsRef.current = newCards;
      return newCards;
    });
    const remainingDeck = randomizedDecks.slice(4);
    deckRef.current = remainingDeck;
    setRandomizedDecks(()=> remainingDeck);

    let userCount = cardCount(drawnUserCards);
    playerCountRef.current = userCount;
    playerCardsRef.current = drawnUserCards
    const SideMultiply = evalPerfectPair(drawnUserCards);
    setSideBetAmount(0);
    setLockedSideBet(sideBetAmount);
    setSideBetResult(SideMultiply);
    if (drawnUserCards.length === 2 && userCount === 21) {
      setIsBlackjack(true);
      setIsDealersTurn(true);
      handleEndOfGame();
    }
  }
  

export function sendTransaction(bool, lockedBet, transactionMutation, insuranceRef = false, sideBetResult = 0) {
  let money;
  if (!bool && lockedBet !== 0) {
    money = lockedBet * (-1)
  } else {
    money = lockedBet
  }
  let result = `Player: ${useStore.getState().playerCount}, Dealer: ${useStore.getState().dealerCount}`;
  if (insuranceRef) {
    result = "Insurance taken"
  } else if (sideBetResult === 1) {
    result = "No Match side bet"
  } else if (sideBetResult === 6) {
    result = "Mixed Pair side bet"
  } else if (sideBetResult === 12) {
    result = "Color Pair side bet"
  } else if (sideBetResult === 25) {
    result = "Perfect Pair!"
  }
  const transaction = {
    id: useUserState.getState().id,
    game: 'blackjack',
    win_loss: bool,
    money: money,
    result: result
  };
  if (useUserState.getState().isLoggedIn) {
    transactionMutation.mutate(transaction)
  } else {
    console.log("not logged in")
  }
}

export function sendMiniGame(chipCount, betOutcomes, miniGameMutation) {
  let wins = 0;
  for (let bet of betOutcomes) {
    if (bet === true) {
      wins += 1;
    }
  }
  console.log("bet Outcomes", betOutcomes)
  let perfect = false;
  if (wins === 10) {
    perfect = true;
  }
  const miniGame = {
    id: useUserState.getState().id,
    miniGame: true,
    game: 'blackjack',
    endTotal: chipCount,
    perfectGame: perfect,
    total_wins: wins, 
  }
  console.log("miniGame", miniGame)

  if (useUserState.getState().isLoggedIn) {
    miniGameMutation.mutate(miniGame);
  } else {
    console.log("not logged in")
  }
  
}
