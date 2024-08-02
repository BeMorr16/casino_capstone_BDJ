import { useQuery } from "@tanstack/react-query";
import { getUserBetSlipsRequest } from "../Utils/APIRequests";

export function useBetSlips(gameSelection, winOrLoss) {
  return useQuery({
    queryKey: ['betslips', gameSelection, winOrLoss],
    keepPreviousData: true,
    queryFn: () => getUserBetSlipsRequest(gameSelection, winOrLoss)
  });
}


export function analyzeUserBets(data) {
  let rouletteGames = 0;
  let slotGames = 0;
  let blackjackGames = 0;
  let rouletteMoney = 0;
  let slotMoney = 0;
  let blackjackMoney = 0;
  let rouletteWins = 0;
  let slotWins = 0;
  let blackjackWins = 0;
  let rouletteLosses = 0;
  let slotLosses = 0;
  let blackjackLosses = 0;
  let rouletteWinMoney = 0;
  let slotWinMoney = 0;
  let blackjackWinMoney = 0;
  let rouletteLossMoney = 0;
  let slotLossMoney = 0;
  let blackjackLossMoney = 0;
  let blackjackPushes = 0;

  for (let bet of data) {
    if (bet.game === 'roulette') {
        rouletteGames += 1;
        rouletteMoney += bet.money
        if (bet.win_loss === true) {
          rouletteWins += 1;
          rouletteWinMoney += bet.money
        } else {
          rouletteLosses += 1;
          rouletteLossMoney += bet.money
        }
    } else if (bet.game === 'slots') {
        slotGames += 1;
        slotMoney += bet.money
        if (bet.win_loss === true) {
          slotWins += 1;
          slotWinMoney += bet.money
        } else {
          slotLosses += 1;
          slotLossMoney += bet.money
        }
    } else if (bet.game === 'blackjack') {
        blackjackGames += 1;
        blackjackMoney += bet.money
        if (bet.win_loss === true) {
          blackjackWins += 1;
          blackjackWinMoney += bet.money
        } else {
          if (bet.money !== 0) {
            blackjackLosses += 1;
            blackjackLossMoney += bet.money
          } else {
            blackjackPushes += 1;
          }
        }
    }
  }
  return {rouletteGames, slotGames, blackjackGames, rouletteMoney, slotMoney, blackjackMoney, rouletteWins, slotWins, blackjackWins, rouletteLosses, slotLosses, blackjackLosses, rouletteWinMoney, slotWinMoney, blackjackWinMoney, rouletteLossMoney, slotLossMoney, blackjackLossMoney, blackjackPushes}
}