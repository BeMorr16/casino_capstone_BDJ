// import React from 'react'
import './userStats.css'
import { analyzeUserBets, useBetSlips } from "./getBetSlips";

export default function UserStats() {
    const { data, isLoading, isError } = useBetSlips("all", "");
    if (isLoading || data == undefined) {
        return <div>Is Loading stats</div>
    }

    if (isError) {
        return <p>Error loading user stats</p>
    }

  const {
    rouletteGames,
    slotGames,
    blackjackGames,
    rouletteMoney,
    slotMoney,
    blackjackMoney,
    rouletteWins,
    slotWins,
    blackjackWins,
    rouletteLosses,
    slotLosses,
      blackjackLosses,
      rouletteWinMoney, 
      slotWinMoney, 
      blackjackWinMoney,
      rouletteLossMoney, 
      slotLossMoney,
      blackjackLossMoney,
      blackjackPushes
  } = analyzeUserBets(data);
    
    
    
    const totalGames = rouletteGames + slotGames + blackjackGames
    const totalWins = rouletteWins + slotWins + blackjackWins;
    const totalLosses = rouletteLosses + slotLosses + blackjackLosses;
    const totalMoneyChange = rouletteMoney + slotMoney + blackjackMoney;
    const totalWinPercentage = ((totalWins / totalGames) * 100).toFixed(2);

    const getPercentage = (game, total) => ((game / total) * 100).toFixed(2);
    const getAverage = (total, count) => (count ? (total / count).toFixed(2) : 0);
    
    

    return (
      <div className="user-stats">
      <h2 className="Cashier-User-Stats">User Stats</h2>
        <div className="user-stats-content">
      <div className="stat-section total">
        <h3>Total</h3>
        <p>Bets: {totalGames}</p>
        <p>Record: {totalWins}W - {totalLosses}L</p>
        <p>Win Percentage: {totalWinPercentage}%</p>
        <p>+/- Money: ${totalMoneyChange.toFixed(2)}</p>
      </div>
      
      <div className="stat-section blackjack">
        <h3>Blackjack</h3>
        <p>Percentage of Bets: {getPercentage(blackjackGames, totalGames)}% ({blackjackGames} bets)</p>
        <p>Record: {blackjackWins}W - {blackjackLosses}L - {blackjackPushes}P</p>
        <p>Win Percentage: {getPercentage(blackjackWins, blackjackGames)}%</p>
        <p>+/-$ Money: {blackjackMoney.toFixed(2)}</p>
        <p>Average Win: ${getAverage(blackjackWinMoney, blackjackWins)}</p>
        <p>Average Loss: ${getAverage(blackjackLossMoney, blackjackLosses)}</p>
      </div>
      
      <div className="stat-section roulette">
        <h3>Roulette</h3>
        <p>Percentage of Bets: {getPercentage(rouletteGames, totalGames)}% ({rouletteGames} bets)</p>
        <p>Record: {rouletteWins}W - {rouletteLosses}L</p>
        <p>Win Percentage: {getPercentage(rouletteWins, rouletteGames)}%</p>
        <p>+/-$ Money: {rouletteMoney.toFixed(2)}</p>
        <p>Average Win: ${getAverage(rouletteWinMoney, rouletteWins)}</p>
        <p>Average Loss: ${getAverage(rouletteLossMoney, rouletteLosses)}</p>
      </div>
      
      <div className="stat-section slots">
        <h3>Slots</h3>
        <p>Percentage of Bets: {getPercentage(slotGames, totalGames)}% ({slotGames} bets)</p>
        <p>Record: {slotWins}W - {slotLosses}L</p>
        <p>Win Percentage: {getPercentage(slotWins, slotGames)}%</p>
        <p>+/-$ Money: {slotMoney.toFixed(2)}</p>
        <p>Average Win: ${getAverage(slotWinMoney, slotWins)}</p>
        <p>Average Loss: ${getAverage(slotLossMoney, slotLosses)}</p>
      </div>
    </div>
    </div>
    )
}
