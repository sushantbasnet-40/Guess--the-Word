
import Row from "./Row";

function GameBoard({ currentGuess, pastGuesses, solutionWord }) {
  const emptyRows = 6 - pastGuesses.length;

  return (
    <div className="game-board">
      {pastGuesses.map((guess, index) => (
        <Row
          key={index}
          guess={guess}
          solutionWord={solutionWord}
        />
      ))}

      {emptyRows > 0 && (
        <>
          <Row guess={currentGuess} />

          {Array.from({ length: emptyRows - 1 }).map((_, index) => (
            <Row key={index} guess="" />
          ))}
        </>
      )}
    </div>
  );
}

export default GameBoard;
