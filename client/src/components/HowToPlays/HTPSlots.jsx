// import React from 'react';
import "./HTPSlot.css";
import HTP from "../Slots/assets/images/HTP-2.png";

export default function HTPSlots() {
  return (
    <div className="SLTM-HTP-background">
      <div className="SLTM-instructions">
        <div className="SLTM-inst1">
          <h1 className="SLTM-Tittle">How to Play the Slot Machine Game</h1>
          <p>
            Welcome to our exciting <strong>Slot Machine game!</strong> Here’s a
            simple guide on how to play and potentially <strong>win big</strong>
            .
          </p>
          <h2 className="SLTM-SubTittle">Game Icons and Multipliers</h2>
          <p>
            Our game features seven different icons, each acting as a multiplier
            when forming <strong>winning combinations</strong>:
          </p>
          <ul>
            <li>
              <strong>7️⃣ (Seven):</strong> 1x Multiplier
            </li>
            <li>
              <strong>❤️ (Heart):</strong> 2x Multiplier
            </li>
            <li>
              <strong>🍒 (Cherry):</strong> 3x Multiplier
            </li>
            <li>
              <strong>💰 (Money Bag):</strong> 4x Multiplier
            </li>
            <li>
              <strong>👑 (Crown):</strong> 5x Multiplier
            </li>
            <li>
              <strong>💎 (Diamond):</strong> 6x Multiplier
            </li>
            <li>
              <strong>🃏 (Joker):</strong> 7x Multiplier
            </li>
          </ul>
          <h2 className="SLTM-SubTittle">Winning Combinations</h2>
          <p>
            You can score a win by lining up either two or three identical icons
            on the reels. The more icons you match, the bigger your{" "}
            <strong>multiplier</strong> and hence, <strong>payout</strong>.
          </p>
        </div>
        <img
            className="SLTM-IMG-HTP-2"
            src={HTP}
            alt="Slot Machine"
          />

        <div className="SLTM-inst2">
          <h2 className="SLTM-SubTittle">Selected Bets</h2>
          <p>
            Before spinning, you can choose to place a Selected Bet on one of
            these four icons: 🍒, 💰, 👑, or 💎. Selecting one of these icons
            means you are choosing to win only with that specific icon for the
            next spin. If other icons appear, they won’t contribute to a win in
            that round.
          </p>

          <h2 className="SLTM-SubTittle">Betting Options</h2>
          <p>
            Choose how much you want to bet from the following options:{" "}
            <strong>$5, $10, $25, or $50</strong>. The amount you bet will
            influence your potential winnings, so choose wisely based on your
            strategy and balance.
          </p>

          <h2 className="SLTM-SubTittle">Jackpot</h2>
          <p>
            If you hit three 🃏 (Jokers) on the reels, you win the jackpot! The
            jackpot amount starts at <strong>$25,000</strong> and increases by
            adding the money you’ve spent on winning bets until that point.
          </p>

          <p>
            Get ready, set your bets, and may luck be on your side as you spin
            the reels in our thrilling Slot Machine game!
          </p>
        </div>
        <img
            className="SLTM-IMG-HTP-3"
            src={HTP}
            alt="Slot Machine"
          />
      </div>
    </div>
  );
}
