import './App.scss'
import { useState } from 'react'

let timeInterval;

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timer, setTimer] = useState("25:00")
  const [timeOut, setTimeOut] = useState(false)

  const incrementBreak = () => {
    if (breakLength === 60) return
    
    setBreakLength(breakLength + 1)
  }

  const decrementBreak = () => {
    if (breakLength === 1) return
    
    setBreakLength(breakLength - 1)
  }

  const incrementSession = () => {
    if (sessionLength === 60) return
    
    setSessionLength(sessionLength + 1)
  }

  const decrementSession = () => {
    if (sessionLength === 1) return
    
    setSessionLength(sessionLength - 1)
  }

  const countDownTimer = () => {
    // Selected minute and second
    let min = timer.substring(0, 2)
    let sec = timer.substring(3, 5)
    let tempTimer;

    timeInterval = setInterval(() => {
      // Check if timer second is 0
      if (sec === "00") {
        min--;

        // If minute is less than 10 then correct it 
        if (min < 10) {
          min = "0" + min;
        }
        
        sec = "60";
      }

      // Add class "time-out" if time is less than 1 minute
      if (min === "00") {
        setTimeOut(true)
      }

      sec--;
      
      // If second is less than 10 then correct it 
      if (sec < 10) {
        sec = "0" + sec;
      }

      // If time is out
      if (tempTimer === "00:01") {
        clearInterval(timeInterval)
      }

      tempTimer = `${min}:${sec}`;
      setTimer(`${min}:${sec}`)
    }, 1000);
  }


  return (
    <div className="App">
      <div className="clock-cont">
        <h2>25 + 5 Clock</h2>
        <div className="clock-options">
          <div id="break-label">
            <p>Break Length</p>
            <div className="break-control">
              <i 
                id="break-decrement"
                className="fa fa-arrow-down fa-2x"
                onClick={decrementBreak}
              />
              <span id="break-length">{breakLength}</span>
              <i 
                id="break-increment"
                className="fa fa-arrow-up fa-2x"
                onClick={incrementBreak}
              />
            </div>
          </div>
          <div id="session-label">
            <p>Session Length</p>
            <div className="session-control">
              <i 
                id="session-decrement"
                className="fa fa-arrow-down fa-2x"
                onClick={decrementSession}
              />
              <span id="session-length">{sessionLength}</span>
              <i 
                id="session-increment"
                className="fa fa-arrow-up fa-2x"
                onClick={incrementSession}
              />
            </div>
          </div>
        </div>
        <div className="clock-timer">
          <p id="timer-label">Session</p>
          <p id="time-left" className={timeOut ? "time-out" : null}>{timer}</p>
        </div>
        <div className="timer-control">
          <i 
            id="start_stop"
            className="fa fa-play fa-2x" 
            onClick={countDownTimer}
          />
          <i 
            id="start_stop"
            className="fa fa-pause fa-2x" 
            onClick={() => clearInterval(timeInterval)}
          />
          <i 
            id="reset"
            className="fa fa-refresh fa-2x" 
            onClick={null}
          />
        </div>
        <div className="author">
          <p>Designed and Coded by</p>
          <a href="#">Gigi Jishkariani</a>
        </div>
      </div>
    </div>
  );
}

export default App;
