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
          <p><span className="label">Bets:</span> <span className="value">{totalGames}</span></p>
          <p><span className="label">Rec:</span> <span className="value">{totalWins}W - {totalLosses}L</span></p>
          <p><span className="label">Win %:</span> <span className="value">{totalWinPercentage}%</span></p>
          <p><span className="label">+/- $:</span> <span className="value">{totalMoneyChange.toFixed(2)}</span></p>
        </div>
    
        <div className="stat-section blackjack">
          <h3>Blackjack</h3>
          <p><span className="label">% of Bets:</span> <span className="value">{getPercentage(blackjackGames, totalGames)}% ({blackjackGames})</span></p>
          <p><span className="label">Rec:</span> <span className="value">{blackjackWins}W - {blackjackLosses}L - {blackjackPushes}</span></p>
          <p><span className="label">Win %:</span> <span className="value">{getPercentage(blackjackWins, blackjackGames)}%</span></p>
          <p><span className="label">+/- $:</span> <span className="value">{blackjackMoney.toFixed(2)}</span></p>
          <p><span className="label">Avg Win:</span> <span className="value">{getAverage(blackjackWinMoney, blackjackWins)}</span></p>
          <p><span className="label">Avg Loss:</span> <span className="value">{getAverage(blackjackLossMoney, blackjackLosses)}</span></p>
        </div>
    
        <div className="stat-section roulette">
          <h3>Roulette</h3>
          <p><span className="label">% of Bets:</span> <span className="value">{getPercentage(rouletteGames, totalGames)}% ({rouletteGames})</span></p>
          <p><span className="label">Rec:</span> <span className="value">{rouletteWins}W - {rouletteLosses}L</span></p>
          <p><span className="label">Win %:</span> <span className="value">{getPercentage(rouletteWins, rouletteGames)}%</span></p>
          <p><span className="label">+/- $:</span> <span className="value">{rouletteMoney.toFixed(2)}</span></p>
          <p><span className="label">Avg Win:</span> <span className="value">{getAverage(rouletteWinMoney, rouletteWins)}</span></p>
          <p><span className="label">Avg Loss:</span> <span className="value">{getAverage(rouletteLossMoney, rouletteLosses)}</span></p>
        </div>
    
        <div className="stat-section slots">
          <h3>Slots</h3>
          <p><span className="label">% of Bets:</span> <span className="value">{getPercentage(slotGames, totalGames)}% ({slotGames})</span></p>
          <p><span className="label">Rec:</span> <span className="value">{slotWins}W - {slotLosses}L</span></p>
          <p><span className="label">Win %:</span> <span className="value">{getPercentage(slotWins, slotGames)}%</span></p>
          <p><span className="label">+/- $:</span> <span className="value">{slotMoney.toFixed(2)}</span></p>
          <p><span className="label">Avg Win:</span> <span className="value">{getAverage(slotWinMoney, slotWins)}</span></p>
          <p><span className="label">Avg Loss:</span> <span className="value">{getAverage(slotLossMoney, slotLosses)}</span></p>
        </div>
    
      </div>
    </div>
    
    )
}
