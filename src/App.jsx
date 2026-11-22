
import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import { checkGuess } from "./components/checkGuess";
import "./App.css";

const words = [
  "APPLE",
  "GRAPE",
  "MANGO",
  "BREAD",
  "PLANT",
  "CHAIR",
  "HOUSE",
  "WATER",
  "TIGER",
  "MOUSE"
];

function getRandomWord(previousWord = "") {
  const availableWords = words.filter(
    (word) => word !== previousWord
  );

  return availableWords[
    Math.floor(Math.random() * availableWords.length)
  ];
}

function App() {
  const [solutionWord, setSolutionWord] = useState(
    () => getRandomWord()
  );

  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  const submitGuess = () => {
    if (
      currentGuess.length !== 5 ||
      gameStatus !== "IN_PROGRESS"
    ) return;

    const updatedGuesses = [...pastGuesses, currentGuess];

    setPastGuesses(updatedGuesses);
    setCurrentGuess("");

    if (currentGuess === solutionWord) {
      setGameStatus("WON");
    } else if (updatedGuesses.length === 6) {
      setGameStatus("LOST");
    }
  };

  const handleKeyPress = (key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) =>
        prev.length < 5 ? prev + key : prev
      );
    }
  };

  useEffect(() => {
    const handlePhysicalKeyboard = (event) => {
      const key = event.key.toUpperCase();

      if (key === "ENTER") {
        handleKeyPress("ENTER");
      } else if (key === "BACKSPACE") {
        handleKeyPress("BACKSPACE");
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyboard);

    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyboard);
    };
  }, [currentGuess, pastGuesses, gameStatus]);

  const keyboardStatuses = {};
  const priority = {
    absent: 1,
    present: 2,
    correct: 3
  };

  pastGuesses.forEach((guess) => {
    const results = checkGuess(guess, solutionWord);

    results.forEach((result, index) => {
      const letter = guess[index];

      if (
        !keyboardStatuses[letter] ||
        priority[result] > priority[keyboardStatuses[letter]]
      ) {
        keyboardStatuses[letter] = result;
      }
    });
  });

  const playAgain = () => {
    setSolutionWord((previous) => getRandomWord(previous));
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
  };

  return (
    <div className="app">
      <h1>WORDLE</h1>
      <p className="subtitle">
        Guess the hidden 5-letter word in 6 attempts.
      </p>

      <GameBoard
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
        solutionWord={solutionWord}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        keyboardStatuses={keyboardStatuses}
      />

      {gameStatus !== "IN_PROGRESS" && (
        <div className="game-modal">
          <div className="modal-content">
            <h2>
              {gameStatus === "WON" ? "You Won!" : "Game Over!"}
            </h2>

            <p>
              The correct word was: <strong>{solutionWord}</strong>
            </p>

            <button className="play-again" onClick={playAgain}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
