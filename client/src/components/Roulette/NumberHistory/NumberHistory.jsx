/* eslint-disable react/prop-types */
// NumberHistory.jsx
import "./NumberHistory.css"; // Ensure this CSS file is imported
import { isRed } from "../helpers/utils";

const NumberHistory = ({ history }) => {
  const redNumbers = [];
  const blackNumbers = [];

  // Distribute numbers into their respective arrays
  history.forEach((num) => {
    if (isRed(num)) {
      redNumbers.push(num);
    } else {
      blackNumbers.push(num);
    }
  });

  return (
    <div className="number-history">
      <h3>Number History</h3>
      <div className="history-list">
        {history.map((num, index) => (
          <div
            key={index}
            className={`history-item ${isRed(num) ? "red" : "black"}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberHistory;
