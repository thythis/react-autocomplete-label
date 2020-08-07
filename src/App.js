import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-lg-6 col-lg-offset-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
