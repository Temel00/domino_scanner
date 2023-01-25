import React, {useState, useRef} from "react";
import "../App.css";
import Scanner from "../components/Scanner";
import Result from "../components/Result";
import Popup from "../components/Popup";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const inputRef = useRef<any>(null);
  const player1Ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [inGame, setInGame] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3Score, setPlayer3Score] = useState(0);
  const [player4Score, setPlayer4Score] = useState(0);
  const [playerNames, setPlayerNames] = useState<any>({
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const scannerRef = useRef(null);

  let scan = "hidden";
  let notScan = "show";

  const onPlayerClick = (index: number) => {
    setCurrentPlayer(index);
    setScanning(true);
  };

  const saveNames = () => {
    const in1 = document.getElementById("name1") as HTMLInputElement;
    const in2 = document.getElementById("name2") as HTMLInputElement;
    const in3 = document.getElementById("name3") as HTMLInputElement;
    const in4 = document.getElementById("name4") as HTMLInputElement;
    let val1 = "";
    let val2 = "";
    let val3 = "";
    let val4 = "";

    if (in1 !== null) {
      val1 = in1.value;
    }

    if (in2 !== null) {
      val2 = in2.value;
    }

    if (in3 !== null) {
      val3 = in3.value;
    }

    if (in4 !== null) {
      val4 = in4.value;
    }

    setPlayerNames({
      player1: val1,
      player2: val2,
      player3: val3,
      player4: val4,
    });
  };

  // const reloadNames = () => {
  //   const in1 = document.getElementById("name1") as HTMLInputElement;
  //   const in2 = document.getElementById("name2") as HTMLInputElement;
  //   const in3 = document.getElementById("name3") as HTMLInputElement;
  //   const in4 = document.getElementById("name4") as HTMLInputElement;

  //   if (in1 !== null) {
  //     console.log("in1 not null: " + in1.value);
  //     in1.value = "This";
  //     console.log(in1.value);
  //   }

  //   if (in2 !== null) {
  //     in2.placeholder = "That";
  //   }

  //   if (in3 !== null) {
  //     in3.value = "The";
  //   }

  //   if (in4 !== null) {
  //     in4.value = "Other";
  //   }
  //   console.log("fired reload");
  // };

  const startGame = () => {
    saveNames();
    setInGame(true);
  };

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer3Score(0);
    setPlayer4Score(0);
    setInGame(false);
  };

  const Player = ({index}: {index: number}) => {
    return (
      <>
        {/* START Player Manual Score Popup */}
        {isOpen && (
          <Popup
            content={
              <>
                <h3>Manually Add To Score</h3>
                <p>Enter value:</p>
                <input
                  type="number"
                  id="scoreAdd"
                  name="scoreAdd"
                  ref={inputRef}
                />
                <button
                  className="Prim-button"
                  onClick={() => {
                    switch (currentPlayer) {
                      case 1:
                        setPlayer1Score(
                          player1Score + Number(inputRef.current.value)
                        );
                        break;
                      case 2:
                        setPlayer2Score(
                          player2Score + Number(inputRef.current.value)
                        );
                        break;
                      case 3:
                        setPlayer3Score(
                          player3Score + Number(inputRef.current.value)
                        );
                        break;
                      case 4:
                        setPlayer4Score(
                          player4Score + Number(inputRef.current.value)
                        );
                        break;
                      default:
                        break;
                    }
                    togglePopup();
                  }}
                >
                  Add
                </button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
        {/* END Player Manual Score Popup */}
        {/* START Player Card */}
        <div className="playerCard" id={"player" + index}>
          {inGame && (
            <>
              <button
                className="hid-button cardIcon"
                onClick={() => {
                  onPlayerClick(index);
                }}
              >
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>
              {index === 1 && <h3>{playerNames.player1}</h3>}
              {index === 2 && <h3>{playerNames.player2}</h3>}
              {index === 3 && <h3>{playerNames.player3}</h3>}
              {index === 4 && <h3>{playerNames.player4}</h3>}
            </>
          )}
          {!inGame && (
            <input
              type="text"
              id={"name" + String(index)}
              maxLength={8}
              name={"player" + String(index)}
              placeholder={"Player" + String(index)}
              size={6}
            />
          )}
          {inGame && (
            <button
              className="hid-button cardScore"
              onClick={() => {
                setCurrentPlayer(index);
                togglePopup();
              }}
            >
              {index === 1 && <h3>{player1Score}</h3>}
              {index === 2 && <h3>{player2Score}</h3>}
              {index === 3 && <h3>{player3Score}</h3>}
              {index === 4 && <h3>{player4Score}</h3>}
            </button>
          )}
        </div>
        {/* END Player Card */}
      </>
    );
  };

  const Loading = () => {
    if (scanning) {
      scan = "visible";
      notScan = "hidden";
    } else {
      scan = "hidden";
      notScan = "visible";
    }

    console.log("results: " + results);
    let resultSet = results.filter((v, i, a) => a.indexOf(v) === i);

    return (
      <>
        <div id="Loading-screen" className={scan}>
          <ul className="results">
            {resultSet.map((result) => (
              <>
                <Result result={result} />
                {/* <Result key={result.codeResult.code} result={result} /> */}
              </>
            ))}
          </ul>
          <div id="viewbox">
            <div className="btnBox">
              <button
                className="Accent-button"
                onClick={() => {
                  setResults([]);
                  setScanning(!scanning);
                }}
              >
                {scanning ? "Stop" : "Start"}
              </button>
              <button
                className="Accent-button"
                onClick={() => {
                  setScanning(!scanning);
                  let sum = 0;
                  for (let i of resultSet) {
                    sum = sum + Number(i);
                  }
                  switch (currentPlayer) {
                    case 1:
                      setPlayer1Score(player1Score + sum);
                      break;
                    case 2:
                      setPlayer2Score(player2Score + sum);
                      break;
                    case 3:
                      setPlayer3Score(player3Score + sum);
                      break;
                    case 4:
                      setPlayer4Score(player4Score + sum);
                      break;
                    default:
                      break;
                  }
                  setResults([]);
                }}
              >
                Add to Score
              </button>
            </div>

            <div
              ref={scannerRef}
              style={{
                position: "relative",
                display: "grid",
                placeItems: "center",
              }}
            >
              <video
                id="video"
                style={{
                  width: window.innerWidth,
                  height: 480,
                  border: "3px solid orange",
                }}
              />
              <canvas
                className="drawingBuffer"
                style={{
                  position: "absolute",
                  top: "0px",
                  // left: '0px',
                  // height: '100%',
                  // width: '100%',
                }}
                width="640"
                height="480"
              />
              {scanning ? (
                <Scanner
                  scannerRef={scannerRef}
                  onDetected={(result) => setResults([...results, result])}
                />
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Loading />
      <div id="Home-page" className={notScan}>
        <h1>Add Players</h1>
        <div id="home-players">
          {numPlayers === 1 && <Player key="player1" index={1} />}
          {numPlayers === 2 && (
            <>
              <Player key="player1" index={1} />
              <Player key="player2" index={2} />
            </>
          )}
          {numPlayers === 3 && (
            <>
              <Player key="player1" index={1} />
              <Player key="player2" index={2} />
              <Player key="player3" index={3} />
            </>
          )}
          {numPlayers === 4 && (
            <>
              <Player key="player1" index={1} />
              <Player key="player2" index={2} />
              <Player key="player3" index={3} />
              <Player key="player4" index={4} />
            </>
          )}
        </div>
        {!inGame && (
          <>
            <div className="Home-buttons">
              <button
                id="addButton"
                className="Prim-button"
                onClick={() => {
                  if (numPlayers < 4) {
                    // saveNames();
                    setNumPlayers(numPlayers + 1);
                  } else {
                    console.log("Already 4 Players");
                  }
                }}
              >
                <span className="material-symbols-outlined">person_add</span>
              </button>
              <button
                id="delButton"
                className="Prim-button"
                onClick={() => {
                  if (numPlayers > 0) {
                    switch (numPlayers) {
                      case 1:
                        setPlayer1Score(0);
                        break;
                      case 2:
                        setPlayer2Score(0);
                        break;
                      case 3:
                        setPlayer3Score(0);
                        break;
                      case 4:
                        setPlayer4Score(0);
                        break;
                      default:
                        break;
                    }

                    setNumPlayers(numPlayers - 1);
                  } else {
                    console.log("Can't Delete More Players");
                  }
                }}
              >
                <span className="material-symbols-outlined">person_remove</span>
              </button>
            </div>
            <button
              className="Prim-button"
              id="startButton"
              onClick={startGame}
            >
              Keep Score
            </button>
          </>
        )}
        {inGame && (
          <button className="Prim-button" id="resetButton" onClick={resetGame}>
            Reset Game
          </button>
        )}
      </div>
    </>
  );
};

export default HomePage;
