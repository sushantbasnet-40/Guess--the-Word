
import Tile from "./Tile";
import { checkGuess } from "./checkGuess";

function Row({ guess, solutionWord }) {
  const results =
    guess.length === 5 && solutionWord
      ? checkGuess(guess, solutionWord)
      : [];

  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Tile
          key={index}
          letter={guess[index] || ""}
          status={results[index] || ""}
        />
      ))}
    </div>
  );
}

export default Row;
