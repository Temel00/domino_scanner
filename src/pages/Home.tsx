import React, {useState, useRef} from "react";
import "../App.css";
import Scanner from "../components/Scanner";
import Result from "../components/Result";
import Popup from "../components/Popup";

// function onPlayerClick(index: number) {
//   console.log("onPlayerclick");

//   document.getElementById("Loading-screen")?.classList.add("show");
//   document.getElementById("Loading-screen")?.classList.remove("hidden");
//   document.getElementById("Home-page")?.classList.add("hidden");
//   document.getElementById("Home-page")?.classList.remove("show");
// }

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const inputRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3Score, setPlayer3Score] = useState(0);
  const [player4Score, setPlayer4Score] = useState(0);

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

  const Player = ({index}: {index: number}) => {
    return (
      <>
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
                    switch (index) {
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
        <div className="playerCard">
          <button
            className="hid-button"
            onClick={() => {
              onPlayerClick(index);
            }}
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <input
            type="text"
            id="name"
            maxLength={8}
            name="name"
            placeholder={"Player" + String(index)}
            size={6}
          />
          <button className="hid-button" onClick={togglePopup}>
            {index === 1 && <h3>{player1Score}</h3>}
            {index === 2 && <h3>{player2Score}</h3>}
            {index === 3 && <h3>{player3Score}</h3>}
            {index === 4 && <h3>{player4Score}</h3>}
          </button>
        </div>
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

    console.log(results);
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
              {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
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
          {numPlayers === 1 && <Player index={1} />}
          {numPlayers === 2 && (
            <>
              <Player index={1} />
              <Player index={2} />
            </>
          )}
          {numPlayers === 3 && (
            <>
              <Player index={1} />
              <Player index={2} />
              <Player index={3} />
            </>
          )}
          {numPlayers === 4 && (
            <>
              <Player index={1} />
              <Player index={2} />
              <Player index={3} />
              <Player index={4} />
            </>
          )}
        </div>
        <div className="Home-buttons">
          <button
            className="Prim-button"
            onClick={() => {
              if (numPlayers < 4) {
                setNumPlayers(numPlayers + 1);
              } else {
                console.log("Already 4 Players");
              }
            }}
          >
            <span className="material-symbols-outlined">person_add</span>
          </button>
          <button
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
        <button className="Prim-button">Keep Score</button>
      </div>
    </>
  );
};

export default HomePage;
