import './App.scss'
import { useState } from 'react'

let timeInterval;
let isTimerStart = false;
let defBreakLength = 5;
let defSessionLength = 25;
let defTimerTime = "25:00";
let defTimerMode = "Session";

// For time correcting
function getCorrectTime(time) {
  return time < 10 ? `0${time}` : time;
}

function App() {
  const [breakLength, setBreakLength] = useState(defBreakLength)
  const [sessionLength, setSessionLength] = useState(defSessionLength)
  const [timer, setTimer] = useState(defTimerTime)
  const [timeOut, setTimeOut] = useState(false)
  const [timerMode, setTimerMode] = useState("Session")

  const incrementBreak = () => {
    if (defBreakLength === 60 || isTimerStart) return
    
    defBreakLength++;

    setBreakLength(defBreakLength)

    // Check Timer mode for change
    if (defTimerMode === "Break") {
      defTimerTime = `${getCorrectTime(defBreakLength)}:00`;
      setTimer(`${getCorrectTime(defBreakLength)}:00`)
    }
  }
  
  const decrementBreak = () => {
    if (defBreakLength === 1 || isTimerStart) return
    
    defBreakLength--;
    
    setBreakLength(defBreakLength)

    // Check Timer mode for change
    if (defTimerMode === "Break") {
      defTimerTime = `${getCorrectTime(defBreakLength)}:00`;
      setTimer(`${getCorrectTime(defBreakLength)}:00`)
    }
  }
  
  const incrementSession = () => {
    if (defSessionLength === 60 || isTimerStart) return
    
    defSessionLength++;
    
    setSessionLength(defSessionLength)

    // Check Timer mode for change
    if (defTimerMode === "Session") {
      defTimerTime = `${getCorrectTime(defSessionLength)}:00`;
      setTimer(`${getCorrectTime(defSessionLength)}:00`)
    }
  }
  
  const decrementSession = () => {
    if (defSessionLength === 1 || isTimerStart) return
    
    defSessionLength--;
    
    setSessionLength(defSessionLength)

    // Check Timer mode for change
    if (defTimerMode === "Session") {
      defTimerTime = `${getCorrectTime(defSessionLength)}:00`;
      setTimer(`${getCorrectTime(defSessionLength)}:00`)
    }
  }

  const countDownTimer = () => {
    // Selected minute and second
    let min = defTimerTime.substring(0, 2)
    let sec = defTimerTime.substring(3, 5)

    timeInterval = setInterval(() => {
      // Check if timer second is 0
      if (sec === "00") {
        min--;

        // If minute is less than 10 then correct it 
        min = getCorrectTime(min)
        
        sec = "60";
      }

      // Add class "time-out" if time is less than 1 minute
      if (min === "00") {
        setTimeOut(true)
      } else {
        setTimeOut(false)
      }

      sec--;
      
      // If second is less than 10 then correct it 
      sec = getCorrectTime(sec)

      // Change Time
      defTimerTime = `${min}:${sec}`;
      setTimer(defTimerTime)

      // If time is out
      if (defTimerTime === "00:00") {
        // Stop timer
        clearInterval(timeInterval)

        // For Beep sound
        const audio = document.getElementById("beep")
        audio.currentTime = 0
        audio.play()

        // Change timer mode
        if (defTimerMode === "Session") {
          defTimerTime = `${getCorrectTime(defBreakLength)}:01`;
          defTimerMode = "Break"
        } else {
          defTimerTime = `${getCorrectTime(defSessionLength)}:01`;
          defTimerMode = "Session"
        }
        
        // For change time and mode the same time
        setTimeout(() => {
          setTimerMode(defTimerMode)
        }, 1000);

        countDownTimer()
      }
    }, 1000);
  }

  const startStopTimer = () => {
    if (isTimerStart) {
      clearInterval(timeInterval)
      isTimerStart = false;
    } else {
      countDownTimer();
      isTimerStart = true;
    }
  }

  const resetTimer = () => {
    // Stop timer 
    clearInterval(timeInterval)

    // Stop beep sound
    const audio = document.getElementById("beep")
    audio.currentTime = 0
    audio.pause()

    defBreakLength = 5;
    setBreakLength(defBreakLength)

    defSessionLength = 25;
    setSessionLength(defSessionLength)

    defTimerTime = "25:00";
    setTimer(defTimerTime)

    defTimerMode = "Session";
    setTimerMode(defTimerMode)

    isTimerStart = false;
    setTimeOut(false)
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
          <p id="timer-label" className={timeOut ? "time-out" : null}>{timerMode}</p>
          <p id="time-left" className={timeOut ? "time-out" : null}>{timer}</p>
          <audio 
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
          />
        </div>
        <div className="timer-control">
          <i 
            id="start_stop"
            className="fa fa-play fa-2x" 
            onClick={startStopTimer}
          />
          <i 
            id="start_stop"
            className="fa fa-pause fa-2x" 
            onClick={startStopTimer}
          />
          <i 
            id="reset"
            className="fa fa-refresh fa-2x" 
            onClick={resetTimer}
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
