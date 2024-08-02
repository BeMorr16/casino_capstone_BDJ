import {create} from 'zustand';
import getDecks from '../BJutils/createShuffleCards';
import cardCount from '../BJutils/cardCount';

const initialDecks = getDecks();

const useStore = create((set) => ({
  randomizedDecks: initialDecks,
  betAmount: 0,
  lockedBet: 0,
  previousBet: 0,
  dealersCards: [],
  dealerCount: 0,
  playersCards: [],
  playerCount: 0,
  isBlackjack: false,
  isPlayerBusted: false,
  isDealersTurn: false,
  isHandComplete: true,
  winner: "",
  setRandomizedDecks: (updateFn) => set((state) => ({ randomizedDecks: updateFn(state.randomizedDecks) })),
    setBetAmount: (updateFn) => set((state) => {
        const amount = updateFn(state.betAmount);
        return {
            betAmount: amount
        }
    }),
  setLockedBet: (amount) => set({ lockedBet: amount }),
  setPreviousBet: (amount) => set({ previousBet: amount }),
  // eslint-disable-next-line no-unused-vars
    setDealersCards: (updateFn) => set((state) => {
        const newCards = updateFn(state.dealersCards);
        return {
            dealersCards: newCards,
            dealerCount: cardCount(newCards)
          };
    }),
  // eslint-disable-next-line no-unused-vars
    setPlayersCards: (updateFn) => set((state) => {
        const newCards = updateFn(state.playersCards);
        return {
            playersCards: newCards,
            playerCount: cardCount(newCards),
          };
    }),
            
  setIsBlackjack: (value) => set({ isBlackjack: value }),
  setIsPlayerBusted: (value) => set({ isPlayerBusted: value }),
  setIsDealersTurn: (value) => set({ isDealersTurn: value }),
  setIsHandComplete: (value) => set({ isHandComplete: value }),
  setWinner: (winner) => set({ winner }),
  resetGame: () => set({
    dealersCards: [],
    dealerCount: 0,
    playersCards: [],
      playerCount: 0,
    isPlayerBusted: false,
    isDealersTurn: false,
    isHandComplete: true,
    lockedBet: 0
  }),
reshuffleDecks: () => set({ randomizedDecks: getDecks() }),
}));

export default useStore;
