import './App.scss';

function App() {
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
                onClick={null}
              />
              <span id="break-length">5</span>
              <i 
                id="break-increment"
                className="fa fa-arrow-up fa-2x"
                onClick={null}
              />
            </div>
          </div>
          <div id="session-label">
            <p>Session Length</p>
            <div className="session-control">
              <i 
                id="session-decrement"
                className="fa fa-arrow-down fa-2x"
                onClick={null}
              />
              <span id="session-length">25</span>
              <i 
                id="session-increment"
                className="fa fa-arrow-up fa-2x"
                onClick={null}
              />
            </div>
          </div>
        </div>
        <div className="clock-timer">
          <p id="timer-label">Session</p>
          <p id="time-left">25:00</p>
        </div>
        <div className="timer-control">
          <i 
            id="start_stop"
            className="fa fa-play fa-2x" 
            onClick={null}
          />
          <i 
            id="start_stop"
            className="fa fa-pause fa-2x" 
            onClick={null}
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
