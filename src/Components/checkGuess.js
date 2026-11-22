
export function checkGuess(guess, solutionWord) {
  const result = Array(5).fill("absent");
  const remainingLetters = solutionWord.split("");

  // Check correct letters first
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solutionWord[i]) {
      result[i] = "correct";
      remainingLetters[i] = null;
    }
  }

  // Check letters in the wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;

    const foundIndex = remainingLetters.indexOf(guess[i]);

    if (foundIndex !== -1) {
      result[i] = "present";
      remainingLetters[foundIndex] = null;
    }
  }

  return result;
}
