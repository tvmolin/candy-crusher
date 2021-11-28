import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import Candy from "./Candy";
import {
  createRandomStartPosition,
  generateMoreCandies,
  resolveCandiesToDelete,
} from "./Utils";

export const TOTAL_AMOUNT_OF_CANDIES = 50;

function App() {
  //Game board is a 13 rows 6 columns grid
  const [candies, setCandies] = useState(createRandomStartPosition());
  const [score, setScore] = useState(0);
  const [scoreToAdd, setScoreToAdd] = useState(0);
  const [candiesLeft, setCandiesLeft] = useState(TOTAL_AMOUNT_OF_CANDIES);

  return (
    <>
      {candiesLeft > 0 ? (
        <>
          <Header>
            <Instructions>
              Scoring is based on neighbouring tiles. Try to click on tiles that
              have 4 neighbours for the biggest amount of combo points :)
            </Instructions>
            <Score>
              <div style={{ display: "flex" }}>
                SCORE: <div role="ScoreCounter"> {score}</div>
              </div>
              <div>{scoreToAdd > 0 ? `LAST: +${scoreToAdd}` : null}</div>
            </Score>
            <div style={{ display: "flex" }}>
              Candies left: <div role="CandiesLeftCounter"> {candiesLeft}</div>
            </div>
            <button role="Reset" onClick={resetGame}>
              RESET
            </button>
          </Header>
          <CandyContainer>
            {candies.map((candy) => (
              <Candy
                key={candy.id}
                id={candy.id}
                type={candy.type}
                color={candy.color}
                position={candy.position}
                onCandyClick={handleCandyClick}
              />
            ))}
          </CandyContainer>
        </>
      ) : (
        <GameOverScreen>
          <div role="GameOverMessage">GAME OVER! Your score: {score}</div>
          <div>
            <button onClick={resetGame}>PLAY AGAIN?</button>
          </div>
        </GameOverScreen>
      )}
    </>
  );

  function resetGame() {
    setScore(0);
    setScoreToAdd(0);
    setCandiesLeft(TOTAL_AMOUNT_OF_CANDIES);
    setCandies(createRandomStartPosition());
  }

  function handleCandyClick(clickedCandy) {
    let tempCandies = [...candies];
    const candiesToDelete = resolveCandiesToDelete(clickedCandy, tempCandies);
    let scoreToAdd = 0;
    if (candiesToDelete.length) {
      deleteCandies();
      updateScore();
      dropCandies();
      setCandiesLeft(candiesLeft - (candies.length - tempCandies.length));
      tempCandies = generateMoreCandies(tempCandies);
      setCandies(tempCandies);
    }

    function deleteCandies() {
      scoreToAdd = candiesToDelete.length;
      candiesToDelete.forEach((candy) => deleteCandy(candy));
    }

    function deleteCandy(candyToDelete) {
      tempCandies = tempCandies.filter(
        (candy) => candy.id !== candyToDelete.id
      );
    }

    function updateScore() {
      const calculatedScoreToAdd = scoreToAdd * scoreToAdd * scoreToAdd;
      setScoreToAdd(calculatedScoreToAdd);
      setScore(score + calculatedScoreToAdd);
    }

    function dropCandies() {
      const columnsToRebalance = [];
      candiesToDelete.forEach((candy) =>
        columnsToRebalance.push(candy.position.x)
      );
      tempCandies.forEach((candy) => {
        columnsToRebalance.forEach((x) => {
          if (
            candy.position.x === x &&
            candy.position.y <= clickedCandy.position.y
          ) {
            candy.position.y++;
          }
        });
      });
    }
  }
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 100px 200px 50px 200px;
  font-size: 40px;
  font-family: "Courier New", Courier, monospace;
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CandyContainer = styled.div`
  padding: 0px 200px;
`;

const Instructions = styled.div`
  font-size: 20px;
  width: 33%;
`;

const GameOverScreen = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  font-size: 60px;
  font-family: "Courier New", Courier, monospace;
  animation: fadeIn 2s;
`;

export default App;
