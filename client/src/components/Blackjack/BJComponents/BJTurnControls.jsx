import PropTypes from "prop-types";
import useStore from "../BJstore/BJstore";
import { handleDouble, handleHit, handleInsurance, handleStand } from "../BJutils/BJgameUtils";

export default function BJTurnControls({
  chipCount,
  setChipCount,
  playerCardsRef,
  playerCountRef,
  deckRef,
  handleDealersTurn,
    handleEndOfGame,
    dealersCardsRef,
  insuranceRef,
  setShowInsuranceResult
}) {
  const {
    isDealersTurn,
    isHandComplete,
    lockedBet,
    setLockedBet,
    setPlayersCards,
    setIsPlayerBusted,
    setRandomizedDecks,
      setIsDealersTurn,
  } = useStore((state) => ({
    isDealersTurn: state.isDealersTurn,
    isHandComplete: state.isHandComplete,
    lockedBet: state.lockedBet,
    setLockedBet: state.setLockedBet,
    setPlayersCards: state.setPlayersCards,
    setIsPlayerBusted: state.setIsPlayerBusted,
    setRandomizedDecks: state.setRandomizedDecks,
    setIsDealersTurn: state.setIsDealersTurn,
  }));
  return (
    <div className="BJTurnContainer">
      <div className="blackjackTurnControls">
        <button
          onClick={() =>
            handleHit(
              playerCardsRef,
              deckRef,
              setPlayersCards,
              setIsPlayerBusted,
              setRandomizedDecks,
              handleEndOfGame,
              playerCountRef
            )
          }
          disabled={isDealersTurn || isHandComplete}
        >
          HIT
        </button>
        <button
          onClick={() => handleStand(setIsDealersTurn, handleDealersTurn)}
          disabled={isDealersTurn || isHandComplete}
        >
          STAND
        </button>
        <button
          onClick={() =>
            handleDouble(
              deckRef,
              lockedBet,
              setChipCount,
              handleHit,
              setIsDealersTurn,
              setLockedBet,
              setPlayersCards,
              setIsPlayerBusted,
              setRandomizedDecks,
              handleDealersTurn,
              handleEndOfGame,
              playerCardsRef,
              playerCountRef
            )
          }
          disabled={
            isDealersTurn || isHandComplete || lockedBet > chipCount
          }
        >
          DOUBLE
              </button>
              {dealersCardsRef.current.length && dealersCardsRef.current[0].weight === 11 && 
                  <button disabled={chipCount < lockedBet / 2} onClick={() => handleInsurance(insuranceRef, setShowInsuranceResult, handleDealersTurn, setIsDealersTurn)}>
                      INSURANCE
                  </button>
              }
                  
             
      </div>
    </div>
  );
}

BJTurnControls.propTypes = {
  chipCount: PropTypes.number.isRequired,
  setChipCount: PropTypes.func.isRequired,
  playerCardsRef: PropTypes.shape({
    current: PropTypes.arrayOf(
      PropTypes.shape({
        frontImage: PropTypes.string.isRequired,
        backImage: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  playerCountRef: PropTypes.shape({
    current: PropTypes.number,
  }).isRequired,
    insuranceRef: PropTypes.shape({
      current: PropTypes.bool
  }).isRequired,
  deckRef: PropTypes.shape({
    current: PropTypes.arrayOf(
      PropTypes.shape({
        frontImage: PropTypes.string.isRequired,
        backImage: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  handleDealersTurn: PropTypes.func.isRequired,
  setShowInsuranceResult: PropTypes.func.isRequired,
    handleEndOfGame: PropTypes.func.isRequired,
    dealersCardsRef: PropTypes.shape({
        current: PropTypes.arrayOf(
            PropTypes.shape({
              weight: PropTypes.number.isRequired,
          })
      )
  })
};
