// import React from 'react'
import { useState } from "react"
import './userHistory.css'
import {  useBetSlips } from "./getBetSlips";

export default function UserHistory() {
    const [gameSelection, setGameSelection] = useState('all');
    const [winOrLoss, setWinOrLoss] = useState("");

    const { data: filteredData, isLoading, isError } = useBetSlips(gameSelection, winOrLoss);
    const isDataLoading = isLoading && !filteredData?.length;
    if (isDataLoading) {
        return <div>Is Loading...</div>
    }

    if (isError) {
        return <div>Error with bets</div>
    }

    const headers = ['#', 'Game', 'Win/Loss', 'Money $', 'Result', 'Placed At'];
    return (
      <div className="bet-table">
             <h2 className = "User-History-h2">User History</h2>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="game-select">Game:</label>
            <select id="game-select" value={gameSelection} onChange={(e) => setGameSelection(e.target.value)}>
              <option value="all">All</option>
              <option value="blackjack">Blackjack</option>
              <option value="roulette">Roulette</option>
              <option value="slots">Slots</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="win-loss-select">Win/Loss:</label>
            <select id="win-loss-select" value={winOrLoss} onChange={(e) => setWinOrLoss(e.target.value)}>
              <option value="">No Selection</option>
              <option value="true">Win</option>
              <option value="false">Loss</option>
            </select>
          </div>
        </div>
        <div className="table-headers">
          {headers.map((header, index) => (
            <div key={index} className="table-header">{header}</div>
          ))}
        </div>
        <div className="table-body">
          {filteredData.map((bet, index) => (
            <div key={bet.transaction_id} className="table-row">
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{bet.game}</div>
              <div className="table-cell">{bet.win_loss ? 'Win' : bet.money === 0 ? 'Push' : 'Loss'}</div>
              <div className="table-cell">{bet.money}</div>
              <div className="table-cell">{bet.result}</div>
              <div className="table-cell">{new Date(bet.placed_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    );
}
