import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { createRandomStartPosition } from "./Utils";

jest.mock("./Utils", () => ({
  ...jest.requireActual("./Utils"),
  createRandomStartPosition: jest.fn(),
  generateMoreCandies: () => (candies) => {
    const newCandies = [];
    for (let x = 0; x < 13; x++) {
      for (let y = 0; y < 6; y++) {
        if (
          !candies.filter(
            (candy) => candy.position.x === x && candy.position.y === y
          ).length
        ) {
          newCandies.push({
            id: Math.random(),
            color: "red",
            type: "Circle",
            position: { x, y },
          });
        }
      }
    }
    return [...candies, ...newCandies];
  },
}));

describe("Scoring and candy movement", () => {
  test("Should add the correct amount of points for combos of 3, 4 and 5 candies", () => {
    // Arrange
    createRandomStartPosition.mockImplementation(startPositionTestHighCombos);
    render(<App />);
    const scoreCounter = screen.getByRole("ScoreCounter");

    // Act && Assert
    // 5 candies
    const candyWith4Neighbours = screen.getByTestId("Candy@4x,2y");
    userEvent.click(candyWith4Neighbours);
    expect(scoreCounter.textContent).toBe(" 125");

    // 4 candies
    const candyWith3Neighbours = screen.getByTestId("Candy@12x,1y");
    userEvent.click(candyWith3Neighbours);
    expect(scoreCounter.textContent).toBe(" 189");

    // 3 candies
    const candyWith2Neighbours = screen.getByTestId("Candy@12x,5y");
    userEvent.click(candyWith2Neighbours);
    expect(scoreCounter.textContent).toBe(" 216");
  });

  test("Should add the correct amount of point for combos of 1 and 2 candies", () => {
    // Arrange
    createRandomStartPosition.mockImplementation(startPositionTestLowCombos);
    render(<App />);
    const scoreCounter = screen.getByRole("ScoreCounter");

    // Act && Assert
    // 1 candy
    const candyWith0Neighbours = screen.getByTestId("Candy@0x,0y");
    userEvent.click(candyWith0Neighbours);
    expect(scoreCounter.textContent).toBe(" 1");

    // 2 candies
    const candyWith1Neighbours = screen.getByTestId("Candy@2x,2y");
    userEvent.click(candyWith1Neighbours);
    expect(scoreCounter.textContent).toBe(" 9");
  });
});

function startPositionTestHighCombos() {
  const candies = [];
  for (let x = 0; x < 13; x++) {
    for (let y = 0; y < 6; y++) {
      candies.push({
        id: Math.random(),
        color: "blue",
        type: "Diamond",
        position: { x, y },
      });
    }
  }
  return candies;
}

function startPositionTestLowCombos() {
  const candies = [];
  for (let x = 0; x < 13; x++) {
    for (let y = 0; y < 6; y++) {
      if (
        (x === 0 && y === 0) ||
        (x === 2 && y === 1) ||
        (x === 2 && y === 2)
      ) {
        candies.push({
          id: Math.random(),
          color: "red",
          type: "Circle",
          position: { x, y },
        });
      } else {
        candies.push({
          id: Math.random(),
          color: "blue",
          type: "Diamond",
          position: { x, y },
        });
      }
    }
  }
  return candies;
}
