
const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

function Keyboard({ onKeyPress, keyboardStatuses }) {
  return (
    <div className="keyboard">
      {keyboardRows.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {row.map((key) => (
            <button
              key={key}
              className={`key ${
                key.length === 1
                  ? keyboardStatuses[key] || ""
                  : "wide-key"
              }`}
              onClick={() => onKeyPress(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
