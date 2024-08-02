import HTP from "../Slots/assets/images/HTP-2.png";
import "./HTPBlackjack.css";

export default function HTPBlackjack() {
  return (
    <div className="BJ-HTP-background">
      <div className="BJ-instructions">
        <div className="BJ-inst1">
          <h1 className="BJ-Title">Blackjack:</h1>
          <p>
            Welcome to our thrilling <strong>Blackjack game!</strong> Here’s a
            comprehensive guide on how to play and aim for that{" "}
            <strong>21</strong>.
          </p>

          <h2 className="BJ-SubTitle">Objective</h2>
          <p>
            The goal of Blackjack is to beat the dealer by having a hand value
            as close to 21 as possible without going over.
          </p>

          <h2 className="BJ-SubTitle">Card Values</h2>
          <ul>
            <li>
              <strong>Number cards (2-10):</strong> Worth their face value.
            </li>
            <li>
              <strong>Face cards (Jacks, Queens, Kings):</strong> Worth 10
              points each.
            </li>
            <li>
              <strong>Aces:</strong> Can be worth either 1 point or 11 points,
              depending on which value benefits your hand the most.
            </li>
          </ul>

          <h2 className="BJ-SubTitle">Basic Gameplay</h2>
          <ol>
            <li>
              <strong>Place Your Bet:</strong> Choose how much you want to wager
              for the round. Betting options include{" "}
              <strong>$5, $25, $50, $100, etc</strong>.
            </li>
            <li>
              <strong>Initial Deal:</strong> Both you and the dealer are dealt
              two cards. Your cards are both face up, while the dealer has one
              card face up and one card face down.
            </li>
            <li>
              <strong>Player&#39;s Turn:</strong>
              <ul>
                <li>
                  <strong>Hit:</strong> Draw another card to try to get closer
                  to 21. You can hit as many times as you want.
                </li>
                <li>
                  <strong>Stand:</strong> Keep your current hand and end your
                  turn.
                </li>
                <li>
                  <strong>Double Down:</strong> Double your initial bet and
                  receive only one more card.
                </li>
              </ul>
            </li>
            <li>
              <strong>Dealer&#39;s Turn:</strong>
              <p>
                The dealer reveals their face-down card and must hit until their
                hand totals at least 17 points.
              </p>
            </li>
          </ol>
        </div>
        <img className="BJ-IMG-HTP-3" src={HTP} alt="BlackJack" />
        <div className="BJ-inst2">
          <h2 className="BJ-SubTitle">Winning Conditions</h2>
          <ul>
            <li>
              If your hand value is closer to 21 than the dealer&#39;s without
              exceeding 21, you win.
            </li>
            <li>If the dealer busts (goes over 21), you win.</li>
            <li>If you bust, you lose your bet.</li>
            <li>
              If you and the dealer have the same hand value, it&#39;s a push,
              and your bet is returned.
            </li>
          </ul>

          <h2 className="BJ-SubTitle">Special Hands</h2>
          <ul>
            <li>
              <strong>Blackjack:</strong> An Ace and any 10-point card in your
              initial deal. Blackjack pays 3:2.
            </li>
            <li>
              <strong>Insurance:</strong> If the dealer&#39;s face-up card is an
              Ace, you can take insurance, a side bet that the dealer has
              Blackjack. Insurance pays 2:1 if the dealer has Blackjack.
            </li>
          </ul>

          <h2 className="BJ-SubTitle">Strategy</h2>
          <ul>
            <li>
              <strong>Basic Strategy:</strong> Use a basic strategy chart to
              make the statistically best decisions based on your hand and the
              dealer&#39;s up card.
            </li>
            <li>
              <strong>Card Counting:</strong> An advanced technique to track the
              ratio of high to low cards remaining in the deck. This can
              influence your betting and playing decisions, but be cautious as
              it’s not always permitted.
            </li>
          </ul>

          <h2 className="BJ-SubTitle">Doubling</h2>
          <p>
            <strong>Double Down:</strong> Double your bet and receive one more
            card.
          </p>

          <h2 className="BJ-SubTitle">Jackpot</h2>
          <p>
            If you achieve a winning streak of five consecutive wins, you hit
            the jackpot! The jackpot starts at <strong>$10,000</strong> and
            increases with each subsequent win.
          </p>
          <p>
            Get ready to test your skills, place your bets, and aim for 21 in
            our exciting Blackjack game. May the cards be in your favor!
          </p>
        </div>
        <img className="BJ-IMG-HTP-2" src={HTP} alt="BlackJack" />
      </div>
    </div>
  );
}
