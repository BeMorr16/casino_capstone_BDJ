// import React from 'react';
import "./HTPRoulette.css";
import HTP from "../Slots/assets/images/HTP-2.png";

export default function HTPRoulette() {
  return (
    <div className="RLT-HTP-background">
      <div className="RLT-instructions">
        <div className="RLT-inst1">
          <h2 className="RLT-SubTittle">Roulette Basics</h2>
          <p>
            Roulette is a classic casino game where players place bets on where
            a ball will land on a spinning wheel. The wheel has numbered slots
            ranging from 0 to 36.
          </p>
          <h2 className="RLT-SubTittle">Bet Types and Payouts</h2>
          <p>
            Here are the main types of bets you can place, along with their
            respective payouts:
          </p>
          <ul>
            <li>
              <strong>Single Number:</strong> 35 to 1
            </li>
            <li>
              <strong>Split:</strong> 17 to 1
            </li>
            <li>
              <strong>Street:</strong> 11 to 1
            </li>
            <li>
              <strong>Double Street:</strong> 5 to 1
            </li>
            <li>
              <strong>Corner:</strong> 8 to 1
            </li>
            <li>
              <strong>Column:</strong> 2 to 1
            </li>
            <li>
              <strong>Dozen:</strong> 2 to 1
            </li>
            <li>
              <strong>Even Money (Red/Black, Odd/Even, High/Low):</strong> 1 to
              1
            </li>
          </ul>
        </div>
        <img className="RLT-IMG-HTP-2" src={HTP} alt="Roulette Wheel" />
        <div className="RLT-inst2">
          <h2 className="RLT-SubTittle">Placing Your Bets</h2>
          <p>
            To place a bet, select your chip value and click on the desired area
            of the betting table. You can place multiple bets in a single round.
          </p>

          <h2 className="RLT-SubTittle">Understanding the Wheel</h2>
          <p>
            The roulette wheel is divided into 37 or 38 slots, depending on the
            game variant. European Roulette has a single zero (0) while American
            Roulette has both a single zero (0) and a double zero (00).
          </p>

          <h2 className="RLT-SubTittle">Winning the Game</h2>
          <p>
            After all bets are placed, the dealer spins the wheel and drops the
            ball. The winning number is the slot where the ball lands. Payouts
            are made based on the types of bets placed.
          </p>

          <p>
            Get ready to test your luck and strategy on the roulette wheel.
            Place your bets and may fortune favor you!
          </p>
        </div>
        <img className="RLT-IMG-HTP-3" src={HTP} alt="Roulette Table" />
      </div>
    </div>
  );
}
