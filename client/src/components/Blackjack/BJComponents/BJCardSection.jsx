import useStore from '../BJstore/BJstore';

export default function BJCardSection() {
  const { dealerCount, dealersCards, isDealersTurn, playersCards, playerCount } = useStore((state) => ({
    dealerCount: state.dealerCount,
    dealersCards: state.dealersCards,
    isDealersTurn: state.isDealersTurn,
    playerCount: state.playerCount,
    playersCards: state.playersCards
}));
  return (
    <div className="blackjackCardSection">
    <section className="BJDealerSection">
                {dealersCards.length > 0 && (isDealersTurn ? <div>{dealerCount}</div> : <div>{dealersCards[0].weight}</div>)}
        {dealersCards.map((card, index) => {
            const isSecondChild = index === 1;
            return (
                <div key={index}>
                    <img
                        src={
                            isDealersTurn || !isSecondChild
                                ? card.frontImage
                                : card.backImage
                        }
                        className={`blackjackImages ${!isSecondChild || isDealersTurn ? "" : "BJsecondCard"
                            }`}
                    />
                </div>
            );
        })}
    </section>

    <section className="BJUserSection">
        {playersCards.length > 0 && <div>{playerCount}</div>}
        {playersCards.map((card, index) => {
            return (
                <div key={index}>
                    <img src={card.frontImage} className="blackjackImages" />
                </div>
            );
        })}
    </section>
</div>
  )
}
