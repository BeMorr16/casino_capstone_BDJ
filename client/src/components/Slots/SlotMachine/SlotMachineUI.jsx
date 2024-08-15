import React from "react";
import SlotMachineIMG from "../assets/images/SlotMachine3.png";
import SlotMachineIMG2 from "../assets/images/SlotMachine5.png"
import Options from "../Options/Options";
import "./SlotMachine.css";

const SlotMachineUI = ({
  handleToBlackjack,
  handleToCasino,
  handleToRoulette,
  message,
  reels,
  spin,
  betAmount,
  setBetAmount,
  spinReels,
  selectedBet,
  setSelectedBet,
  chipCount,
  jackpot,
  lastWin,
  toggleAudio,
  audioOn,
}) => {
  return (
    <div className="SLTM-slot-machine-background">
      <div className="SLTM-buttons-container">
        <button className="SLTMtoBlackJackButton" onClick={handleToBlackjack}>
          To BlackJack
        </button>
        <button className="SLTMtoCasinoFloorButton" onClick={handleToCasino}>
          Back to Casino Floor
        </button>
        <button className="SLTMtoRouletteButton" onClick={handleToRoulette}>
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
        <img
            className="SLTM-SlotMachineIMG2"
            src={SlotMachineIMG2}
            alt="Slot Machine"
          />
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

export default SlotMachineUI;
