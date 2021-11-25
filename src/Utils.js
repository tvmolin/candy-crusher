import CandyTypes from "./CandyTypes";
import Colors from "./Colors";

const FIELD_WIDTH = 13;
const FIELD_HEIGHT = 6;

export function resolvePosition(position, type) {
  const offset = type === CandyTypes.DIAMOND ? 215 : 200;
  const gap = 14;
  const size = 104;
  return {
    left: position.x * size + offset + gap * position.x,
    top: position.y * size + offset + gap * position.y,
  };
}

export function generateMoreCandies(candies) {
  return [...candies, ...generateRandomCandies(candies)];
}

export function createRandomStartPosition() {
  return generateRandomCandies();
}

function generateRandomCandies(existingCandies = []) {
  const candies = [];
  for (let x = 0; x < FIELD_WIDTH; x++) {
    for (let y = 0; y < FIELD_HEIGHT; y++) {
      if (
        !existingCandies.filter(
          (candy) => candy.position.x === x && candy.position.y === y
        ).length
      ) {
        candies.push(generateRandomCandy({ x, y }));
      }
    }
  }
  return candies;
}

function generateRandomCandy(position) {
  return {
    id: Math.random(),
    color: generateRandomColor(),
    type: generateRandomType(),
    position,
  };
}

function generateRandomColor() {
  const number = Math.round(Math.random() * 4);
  switch (number) {
    case 0:
      return Colors.BLUE;
    case 1:
      return Colors.YELLOW;
    case 2:
      return Colors.CYAN;
    case 3:
      return Colors.GREEN;
    case 4:
      return Colors.RED;
  }
}

function generateRandomType() {
  const number = Math.round(Math.random() * 2);
  switch (number) {
    case 0:
      return CandyTypes.DIAMOND;
    case 1:
      return CandyTypes.SQUARE;
    case 2:
      return CandyTypes.CIRCLE;
  }
}

export function resolveCandiesToDelete(clickedCandy, candies) {
  const neighbours = getNeighbours(clickedCandy, candies);
  const candiesToDelete = [];
  candiesToDelete.push(clickedCandy);
  neighbours.forEach((candy) => {
    if (
      candy.type === clickedCandy.type &&
      candy.color === clickedCandy.color
    ) {
      candiesToDelete.push(candy);
    }
  });
  return candiesToDelete;
}

function getNeighbours(clickedCandy, candies) {
  return candies.filter(
    (candy) =>
      (candy.position.x === clickedCandy.position.x - 1 &&
        candy.position.y === clickedCandy.position.y) ||
      (candy.position.x === clickedCandy.position.x + 1 &&
        candy.position.y === clickedCandy.position.y) ||
      (candy.position.x === clickedCandy.position.x &&
        candy.position.y === clickedCandy.position.y - 1) ||
      (candy.position.x === clickedCandy.position.x &&
        candy.position.y === clickedCandy.position.y + 1)
  );
}
