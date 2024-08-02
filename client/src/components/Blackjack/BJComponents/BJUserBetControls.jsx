import PropTypes from 'prop-types';
import useStore from "../BJstore/BJstore"
import { handleSubmit } from "../BJutils/BJgameUtils";
import BJButton from "./BJButton"

export default function BJUserBetControls({ chipCount, setChipCount, dealersCardsRef, deckRef, handleEndOfGame, playerCountRef, playerCardsRef, setSideBetResult, setLockedSideBet, sideBetAmount, setSideBetAmount, }) {
    const { setBetAmount, previousBet, betAmount, isHandComplete, setIsDealersTurn, setIsHandComplete, setLockedBet, randomizedDecks, setPlayersCards, setDealersCards, setRandomizedDecks, setIsBlackjack, lockedBet, setPreviousBet } = useStore((state) => ({
        setBetAmount: state.setBetAmount,
        previousBet: state.previousBet,
        betAmount: state.betAmount,
        isHandComplete: state.isHandComplete,
        setIsDealersTurn: state.setIsDealersTurn,
        setIsHandComplete: state.setIsHandComplete,
        setLockedBet: state.setLockedBet,
        randomizedDecks: state.randomizedDecks,
        setPlayersCards: state.setPlayersCards,
        setDealersCards: state.setDealersCards,
        setRandomizedDecks: state.setRandomizedDecks,
      setIsBlackjack: state.setIsBlackjack,
      lockedBet: state.lockedBet,
      setPreviousBet: state.setPreviousBet,
    }));
  return (
    <div className="blackjackUserControls">
      <div className='BJBetCircles'>
      <div className="BJbetAmountBeforeHand">
        {(betAmount > 0 || lockedBet > 0) && <h3>{lockedBet > 0 ? lockedBet : betAmount}</h3>}
        </div>
        {sideBetAmount > 0 &&
          <div className="BJbetAmountBeforeHand">
            <small>Side</small>
            <h3>{sideBetAmount}</h3>
          </div>}
      </div>
      
      <div className="BJButtonsContainer">
            {[5, 25, 50, 100, 500, 1000, 5000].map((amount) => {
              return  <BJButton setBetAmount={setBetAmount} key={amount} num={amount} chipCount={chipCount} />
            })}
          </div>
          <form onSubmit={(e)=>  handleSubmit(e, setIsDealersTurn, setIsHandComplete, setLockedBet, betAmount, setChipCount, randomizedDecks,
                setPlayersCards, setDealersCards, setRandomizedDecks, setBetAmount, setIsBlackjack, dealersCardsRef, deckRef,
                handleEndOfGame, playerCountRef, playerCardsRef, setSideBetResult, setLockedSideBet, sideBetAmount, setSideBetAmount, setPreviousBet)}>
            <div className="betControls">
              <button disabled={!isHandComplete || previousBet < 1 || previousBet > chipCount}
                onClick={() => setBetAmount(() => previousBet)}>
                SAME BET
              </button>
              <button disabled={!isHandComplete || betAmount < 1 || betAmount > chipCount}>
                BET
              </button>
              <button type="button" disabled={!isHandComplete}
            onClick={() => {
              setBetAmount(() => 0)
              setSideBetAmount(0)
            }}>
                CLEAR
              </button>
              <button disabled={chipCount < 1 || !isHandComplete}
                onClick={() => setBetAmount(() => chipCount)} type="button" >
                ALL IN
              </button>
            </div>
          </form>
          {/* <div className="BJChipCountContainer">
            <h2 className="BJChipCountHeader">CHIPS</h2>
            <div className="BJChipCount">{chipCount - betAmount}</div>
          </div> */}
        </div>
  )
}

BJUserBetControls.propTypes = {
    chipCount: PropTypes.number.isRequired,
    setChipCount: PropTypes.func.isRequired,
    dealersCardsRef: PropTypes.shape({
        current: PropTypes.arrayOf(PropTypes.shape({
            frontImage: PropTypes.string.isRequired,
            backImage: PropTypes.string.isRequired,
            weight: PropTypes.number.isRequired
        }))
    }).isRequired,
    deckRef: PropTypes.shape({
        current: PropTypes.arrayOf(PropTypes.shape({
            frontImage: PropTypes.string.isRequired,
            backImage: PropTypes.string.isRequired,
            weight: PropTypes.number.isRequired
        }))
    }).isRequired,
  handleEndOfGame: PropTypes.func.isRequired,
  setLockedSideBet: PropTypes.func.isRequired,
  setSideBetAmount: PropTypes.func.isRequired,
  setSideBetResult: PropTypes.func.isRequired,
  sideBetAmount: PropTypes.number.isRequired,
    playerCountRef: PropTypes.shape({
        current: PropTypes.number
    }).isRequired,
    playerCardsRef: PropTypes.shape({
        current: PropTypes.arrayOf(PropTypes.shape({
            frontImage: PropTypes.string.isRequired,
            backImage: PropTypes.string.isRequired,
            weight: PropTypes.number.isRequired
        }))
    }).isRequired
};