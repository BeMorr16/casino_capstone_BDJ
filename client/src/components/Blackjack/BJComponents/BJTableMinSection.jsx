import useStore from "../BJstore/BJstore"

// eslint-disable-next-line react/prop-types
export default function BJTableMinSection({sideBetAmount, setSideBetAmount, chipCount}) {
    const {isHandComplete} = useStore((state) => ({
    isHandComplete: state.isHandComplete
}))

    function handleDecrement() {
        if (sideBetAmount >= 5) {
            setSideBetAmount((prev) => prev - 5)
        }
    }
    function handleIncrement() {
        if (sideBetAmount + 5 <= chipCount) {
            setSideBetAmount((prev) => prev + 5)
        }
    }

  return (
    <section className="BJTableMinSection">
                          <h3 className="BJTableMin">$5 Table minimum</h3>
        <div className="side-bet-container">
  <h2 className="side-bet-header">Perfect Pair</h2>
  <div className="side-bet-controls">
    <button className="side-bet-button" onClick={ handleDecrement} disabled={!isHandComplete}>-</button>
                  <span className="side-bet-number">{sideBetAmount}</span>
    <button className="side-bet-button" onClick={ handleIncrement} disabled={!isHandComplete}>+</button>
              </div>
  <button className="place-side-bet-button" onClick={()=> setSideBetAmount(0)} disabled={!isHandComplete}>Undo Side Bet</button>
</div>
            </section>
  )
}
