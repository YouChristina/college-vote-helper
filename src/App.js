// src/App.js
import React, { useState } from 'react';
import UsMap from './components/UsMap';
import stateValues from './stateValues';

const App = () => {
  const [party, setParty] = useState('');
  const [homeState, setHomeState] = useState('');
  const [collegeState, setCollegeState] = useState('');
  const [voteState, setVoteState] = useState('');

  const handleVoteClick = () => {
    const homeValue = stateValues[homeState.toLowerCase()];
    const collegeValue = stateValues[collegeState.toLowerCase()];
    if (homeValue === undefined || collegeValue === undefined) {
      alert('Please enter valid states.');
      return;
    }
    if (Math.abs(homeValue - 3) < Math.abs(collegeValue - 3)) {
      setVoteState(homeState.toLowerCase());
    } else if (Math.abs(homeValue - 3) > Math.abs(collegeValue - 3)) {
      setVoteState(collegeState.toLowerCase());
    } else {
      setVoteState(`${homeState.toLowerCase()}-${collegeState.toLowerCase()}`);
    }
  };

  const renderVoteMessage = () => {
    if (!voteState) return '';
    if (voteState.includes('-')) {
      return 'You can cast your vote in either state depending on local districts or elections.';
    } else {
      return `You should cast your vote in ${voteState.charAt(0).toUpperCase() + voteState.slice(1)}.`;
    }
  };

  return (
    <div className="container">
      <h1>Where should I vote?</h1>
      <form>
        <div>
          <label>
            Which political party do you want to vote for?
            <select value={party} onChange={e => setParty(e.target.value)}>
              <option value="">Select</option>
              <option value="democrat">Democrat</option>
              <option value="republican">Republican</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Home State:
            <input
              type="text"
              value={homeState}
              onChange={e => setHomeState(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            College State:
            <input
              type="text"
              value={collegeState}
              onChange={e => setCollegeState(e.target.value)}
            />
          </label>
        </div>
      </form>
      <button onClick={handleVoteClick}>Where should I vote?</button>
      <UsMap
        homeState={homeState}
        collegeState={collegeState}
        voteState={voteState}
      />
      <div className="vote-message">
        {renderVoteMessage()}
      </div>
    </div>
  );
};

export default App;
