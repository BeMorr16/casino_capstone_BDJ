import { useNavigate } from "react-router-dom";
import useUserState from "../../../store/store";


export default function BJnavigations() {
    const navigate = useNavigate();
    const { returnChipsToTotal } = useUserState();

    function handleToCasino() {
        returnChipsToTotal();
        navigate("/casino");
      }
    
      function handleToSlots() {
        navigate("/slots");
      }
    
      function handleToRoulette() {
        navigate("/roulette");
      }
    
    return (
      <div>
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
