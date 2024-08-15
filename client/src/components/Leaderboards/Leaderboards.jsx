import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  betLeaderboardRequest,
  moneyLeaderboardRequest,
  recordLeaderboardRequest,
  minigameLeaderboardRequest,
  perfectMinigameLeaderboardRequest,
} from "../Utils/APIRequests";
import "./leaderboards.css";

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState("bet");

  // Log when the component is mounted
  useEffect(() => {
    console.log("Leaderboards component mounted");
  }, []);

  const {
    data: betLeaderboard,
    isLoading: isLoadingBetLeaderboard,
    error: errorBetLeaderboard,
  } = useQuery({
    queryKey: ["bet"],
    queryFn: betLeaderboardRequest,
  });

  const {
    data: recordLeaderboard,
    isLoading: isLoadingRecordLeaderboard,
    error: errorRecordLeaderboard,
  } = useQuery({
    queryKey: ["record"],
    queryFn: recordLeaderboardRequest,
  });

  const {
    data: moneyLeaderboard,
    isLoading: isLoadingMoneyLeaderboard,
    error: errorMoneyLeaderboard,
  } = useQuery({
    queryKey: ["money"],
    queryFn: moneyLeaderboardRequest,
  });

  const {
    data: minigameLeaderboard,
    isLoading: isLoadingMinigameLeaderboard,
    error: errorMinigameLeaderboard,
  } = useQuery({
    queryKey: ["minigame"],
    queryFn: minigameLeaderboardRequest,
    onSuccess: (data) => {
      console.log("Minigame Leaderboard Data:", data);
    },
    onError: (error) => {
      console.error("Error fetching minigame leaderboard:", error);
    },
  });

  const {
    data: perfectMinigameLeaderboard,
    isLoading: isLoadingPerfectMinigameLeaderboard,
    error: errorPerfectMinigameLeaderboard,
  } = useQuery({
    queryKey: ["perfectMinigame"],
    queryFn: perfectMinigameLeaderboardRequest,
    onSuccess: (data) => {
      console.log("Perfect Minigame Leaderboard Data:", data);
    },
    onError: (error) => {
      console.error("Error fetching perfect minigame leaderboard:", error);
    },
  });

  // Log data to check if it's being fetched
  useEffect(() => {
    if (betLeaderboard) {
      console.log("Bet Leaderboard Data:", betLeaderboard);
    }
    if (recordLeaderboard) {
      console.log("Record Leaderboard Data:", recordLeaderboard);
    }
    if (moneyLeaderboard) {
      console.log("Money Leaderboard Data:", moneyLeaderboard);
    }
    if (minigameLeaderboard) {
      console.log(
        "Minigame Leaderboard Data after useEffect:",
        minigameLeaderboard
      );
    }
    if (perfectMinigameLeaderboard) {
      console.log(
        "Perfect Minigame Leaderboard Data after useEffect:",
        perfectMinigameLeaderboard
      );
    }
  }, [
    betLeaderboard,
    recordLeaderboard,
    moneyLeaderboard,
    minigameLeaderboard,
    perfectMinigameLeaderboard,
  ]);

  if (
    isLoadingBetLeaderboard ||
    isLoadingRecordLeaderboard ||
    isLoadingMoneyLeaderboard ||
    isLoadingMinigameLeaderboard ||
    isLoadingPerfectMinigameLeaderboard
  ) {
    return <div>Loading leaderboards...</div>;
  }

  if (
    errorBetLeaderboard ||
    errorRecordLeaderboard ||
    errorMoneyLeaderboard ||
    errorMinigameLeaderboard ||
    errorPerfectMinigameLeaderboard
  ) {
    return (
      <div>
        <div>Error getting leaderboards</div>
        {errorBetLeaderboard && (
          <div>
            Error fetching bet leaderboard: {errorBetLeaderboard.message}
          </div>
        )}
        {errorRecordLeaderboard && (
          <div>
            Error fetching record leaderboard: {errorRecordLeaderboard.message}
          </div>
        )}
        {errorMoneyLeaderboard && (
          <div>
            Error fetching money leaderboard: {errorMoneyLeaderboard.message}
          </div>
        )}
        {errorMinigameLeaderboard && (
          <div>
            Error fetching minigame leaderboard:{" "}
            {errorMinigameLeaderboard.message}
          </div>
        )}
        {errorPerfectMinigameLeaderboard && (
          <div>
            Error fetching perfect minigame leaderboard:{" "}
            {errorPerfectMinigameLeaderboard.message}
          </div>
        )}
      </div>
    );
  }

  const renderBetLeaderboard = (data) => (
    <>
      <p className="leaderboard-message"> The amount bet is not included in amount won.</p>
      <div className="leaderboard-grid">
        <div className="header" style={{ gridColumn: "1" }}>
          Username
        </div>
        <div className="header" style={{ gridColumn: "2" }}>
          Game
        </div>
        <div className="header" style={{ gridColumn: "3" }}>
          Amount Won
        </div>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="cell" style={{ gridColumn: "1" }}>
              {item.username}
            </div>
            <div className="cell" style={{ gridColumn: "2" }}>
              {item.game}
            </div>
            <div className="cell" style={{ gridColumn: "3" }}>
              {item.money}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );

  const renderRecordLeaderboard = (data) => (
    <div className="leaderboard-grid">
      <div className="header" style={{ gridColumn: "1" }}>
        Username
      </div>
      <div className="header" style={{ gridColumn: "2" }}>
        Wins
      </div>
      <div className="header" style={{ gridColumn: "3" }}>
        Losses
      </div>
      <div className="header" style={{ gridColumn: "4" }}>
        Win Rate
      </div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cell" style={{ gridColumn: "1" }}>
            {item.username}
          </div>
          <div className="cell" style={{ gridColumn: "2" }}>
            {item.wins}
          </div>
          <div className="cell" style={{ gridColumn: "3" }}>
            {item.losses}
          </div>
          <div className="cell" style={{ gridColumn: "4" }}>
            {item.win_percentage}%
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const renderMoneyLeaderboard = (data) => (
    <div className="leaderboard-grid">
      <div className="header" style={{ gridColumn: "1" }}>
        Username
      </div>
      <div className="header" style={{ gridColumn: "2" }}>
        Money
      </div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cell" style={{ gridColumn: "1" }}>
            {item.username}
          </div>
          <div className="cell" style={{ gridColumn: "2" }}>
            ${item.user_money}
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const renderMinigameLeaderboard = (data) => (
    <div className="leaderboard-grid">
      <div className="header" style={{ gridColumn: "1" }}>
        Username
      </div>
      <div className="header" style={{ gridColumn: "2" }}>
        Game
      </div>
      <div className="header" style={{ gridColumn: "3" }}>
        Amount Won
      </div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cell" style={{ gridColumn: "1" }}>
            {item.username}
          </div>
          <div className="cell" style={{ gridColumn: "2" }}>
            {item.game}
          </div>
          <div className="cell" style={{ gridColumn: "3" }}>
            {item.endtotal}
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const renderPerfectMinigameLeaderboard = (data) =>
    data.length === 0 ? (
      <div className="leaderboard-grid">
        <div className="no-data-message">
          Be The First To Have a Perfect Game!
        </div>
      </div>
    ) : (
      <div className="leaderboard-grid">
        <div className="header" style={{ gridColumn: "1" }}>
          Username
        </div>
        <div className="header" style={{ gridColumn: "2" }}>
          Game
        </div>
        <div className="header" style={{ gridColumn: "3" }}>
          Amount Won
        </div>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="cell" style={{ gridColumn: "1" }}>
              {item.username}
            </div>
            <div className="cell" style={{ gridColumn: "2" }}>
              {item.game}
            </div>
            <div className="cell" style={{ gridColumn: "3" }}>
              {item.endtotal}
            </div>
          </React.Fragment>
        ))}
      </div>
    );

  const getActiveLeaderboard = () => {
    switch (activeTab) {
      case "bet":
        return renderBetLeaderboard(betLeaderboard);
      case "record":
        return renderRecordLeaderboard(recordLeaderboard);
      case "money":
        return renderMoneyLeaderboard(moneyLeaderboard);
      case "minigame":
        return renderMinigameLeaderboard(minigameLeaderboard);
      case "perfectMinigame":
        return renderPerfectMinigameLeaderboard(perfectMinigameLeaderboard);
      default:
        return null;
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "bet" ? "active" : ""}`}
          onClick={() => setActiveTab("bet")}
        >
          Biggest Bets
        </button>
        <button
          className={`tab-button ${activeTab === "record" ? "active" : ""}`}
          onClick={() => setActiveTab("record")}
        >
          Best Records
        </button>
        <button
          className={`tab-button ${activeTab === "money" ? "active" : ""}`}
          onClick={() => setActiveTab("money")}
        >
          Most Money
        </button>
        <button
          className={`tab-button ${activeTab === "minigame" ? "active" : ""}`}
          onClick={() => setActiveTab("minigame")}
        >
          Minigame Winners
        </button>
        <button
          className={`tab-button ${
            activeTab === "perfectMinigame" ? "active" : ""
          }`}
          onClick={() => setActiveTab("perfectMinigame")}
        >
          Perfect Minigame
        </button>
      </div>
      <div className="leaderboard">{getActiveLeaderboard()}</div>
    </div>
  );
}
