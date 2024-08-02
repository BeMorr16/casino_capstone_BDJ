/* eslint-disable react/prop-types */
import "./ChipSelector.css";

const ChipsSelector = ({
  selectedChip,
  onChipSelect,
  onRepeatLastBets,
  onUndoLastBet,
  onClearBets, 
}) => {
  const chipValues = [1, 5, 10, 25, 50, 100];

  return (
    <div className="chips-selector">
      {chipValues.map((value) => (
        <button
          key={value}
          className={`chip-button ${selectedChip === value ? "selected" : ""}`}
          onClick={() => onChipSelect(value)}
        >
          {value}
        </button>
      ))}
      <button className="repeat-btn" onClick={onRepeatLastBets}>
        Repeat
      </button>
      <button className="undo-btn" onClick={onUndoLastBet}>
        Undo
      </button>
      <button className="clear-btn" onClick={onClearBets}>
        Clear
      </button>{" "}
    </div>
  );
};

export default ChipsSelector;
