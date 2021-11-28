import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { TOTAL_AMOUNT_OF_CANDIES } from "./App";

test("should render a board with 78 tiles (6 rows of 13 items)", () => {
  //Arrange & act
  render(<App />);
  const candies = screen.getAllByRole("Candy");
  const scoreCounter = screen.getByRole("ScoreCounter");
  const candiesLeftCounter = screen.getByRole("CandiesLeftCounter");

  //Assert
  expect(candies.length).toBe(78);
  expect(scoreCounter.textContent).toBe(" 0");
  expect(candiesLeftCounter.textContent).toBe(" " + TOTAL_AMOUNT_OF_CANDIES);
});

test("should reset the board, score, and amount of candies left, when user presses reset", () => {
  //Arrange
  render(<App />);
  const initialCandies = screen.getAllByRole("Candy");
  userEvent.click(initialCandies[0]);
  const scoreCounter = screen.getByRole("ScoreCounter");
  const candiesLeftCounter = screen.getByRole("CandiesLeftCounter");

  //Act
  const resetButton = screen.getByRole("Reset");
  userEvent.click(resetButton);

  //Assert
  const candiesAfterReset = screen.getAllByRole("Candy");
  expect(initialCandies).not.toEqual(candiesAfterReset);
  expect(scoreCounter.textContent).toBe(" 0");
  expect(candiesLeftCounter.textContent).toBe(" " + TOTAL_AMOUNT_OF_CANDIES);
});

test("Should show GameOver screen after the candies have been depleted", () => {
  //Arrange
  render(<App />);
  const initialCandies = screen.getAllByRole("Candy");

  //Act
  for (let i = 0; i < TOTAL_AMOUNT_OF_CANDIES; i++) {
    userEvent.click(initialCandies[i]);
  }

  //Assert
  const gameOverText = screen.getByRole("GameOverMessage");
  expect(gameOverText).toBeDefined();
});
