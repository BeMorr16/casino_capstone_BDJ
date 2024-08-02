/* eslint-disable react/prop-types */
import "./Board.css"; // Ensure this CSS file is imported
import {
  generateCellMeaning,
  getOuterCellMeaning,
} from "../helpers/generateCellMeaningsHelper";

const Board = ({ selectedChip, placeBet, placedBets }) => {
  const handleCellClick = (meaning) => {
    if (meaning === "Not Clickable" || meaning === "Not a Placable Bet") {
      console.log("This cell is not clickable.");
      return;
    }

    placeBet({ meaning, amount: selectedChip });
  };

  const getCellMeaning = (row, col) => {
    if (row === 0 && col === 0) return 0; // Zero cell
    if (row >= 6) return getOuterCellMeaning(row, col); // Outer cells
    return generateCellMeaning(row, col); // Number cells
  };

  const renderCell = (row, col, className = "cell", key) => {
    const meaning = getCellMeaning(row, col);

    return (
      <div
        className={className}
        key={key}
        onClick={() => handleCellClick(meaning)}
      >
        {placedBets.find(
          (bet) => JSON.stringify(bet.meaning) === JSON.stringify(meaning)
        ) && (
          <div className="chip">
            {
              placedBets.find(
                (bet) => JSON.stringify(bet.meaning) === JSON.stringify(meaning)
              ).amount
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="board-container">
      <div className="outer-grid">
        <div className="top-row">
          <div className="zero-cell">
            {renderCell(0, 0, "cell zero-cell", "zero")}
          </div>
          <div className="middle-column">
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 26 }).map((_, col) =>
                renderCell(row, col, "cell number", `${row}-${col}`)
              )
            )}
          </div>
          <div className="top-right">
            {renderCell(0, 26, "cell", "top-right")}
          </div>
        </div>

        <div className="bottom-row">
          <div className="bottom-row-top">
            {renderCell(6, 0, "bet-cell", "bet-1st-12")}
            {renderCell(6, 1, "bet-cell", "bet-2nd-12")}
            {renderCell(6, 2, "bet-cell", "bet-3rd-12")}
          </div>
          <div className="bottom-row-bottom">
            {renderCell(7, 0, "bet-cell", "7-0")}
            {renderCell(7, 1, "bet-cell", "7-1")}
            {renderCell(7, 2, "bet-cell", "7-2")}
            {renderCell(7, 3, "bet-cell", "7-3")}
            {renderCell(7, 4, "bet-cell", "7-4")}
            {renderCell(7, 5, "bet-cell", "7-5")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
