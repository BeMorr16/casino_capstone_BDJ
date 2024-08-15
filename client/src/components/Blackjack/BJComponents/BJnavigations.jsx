import { useNavigate } from "react-router-dom";
import useUserState from "../../../store/store";


export default function BJnavigations() {
    const navigate = useNavigate();
    const { returnChipsToTotal } = useUserState();

    function handleToCasino() {
      returnChipsToTotal();
      window.sessionStorage.removeItem("isMiniGame");
        navigate("/casino");
      }
    
  function handleToSlots() {
    window.sessionStorage.removeItem("isMiniGame");
        navigate("/slots");
      }
    
  function handleToRoulette() {
    window.sessionStorage.removeItem("isMiniGame");
        navigate("/roulette");
      }
    
    return (
      <div className="BJnavButtons">
    <button className="BJtoCasinoFloorButton" onClick={handleToCasino}>
          Back to Casino Floor
        </button>
        <button className="BJtoSlotsButton" onClick={handleToSlots}>
          To Slots
        </button>
        <button className="BJtoRouletteButton" onClick={handleToRoulette}>
          To Roulette
        </button>
      </div>
  )
}
