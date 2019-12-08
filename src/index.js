import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { sample } from "lodash";

function App() {
  const [participants, setParticipants] = useState([]);
  const [text, setText] = useState("");
  const textRef = useRef();

  const handleShuffleClick = () => {
    // eligble santas => all the participants that are not Santa yet
    let eligibleSantas = participants.filter(participant =>
      participants.every(p => p.secretSanta !== participant.name)
    );

    const newParticipants = participants.map(participant => {
      if (participant.secretSanta !== null) return participant;

      // get a random Santa from the eligible Santas
      // the participant can't be his own Santa
      const randomParticipant = sample(
        eligibleSantas.filter(santa => santa.name !== participant.name)
      );

      // remove the new Santa attribution from the eligible Santas
      eligibleSantas = eligibleSantas.filter(
        participant => participant.name !== randomParticipant.name
      );

      return { ...participant, secretSanta: randomParticipant.name };
    });

    setParticipants(newParticipants);
  };

  const handleResetClick = name => {
    const newParticipants = [
      { name, secretSanta: null },
      ...participants.filter(participant => participant.name !== name)
    ];

    setParticipants(newParticipants);
  };

  const handleResetAllClick = () => {
    const newParticipants = participants.map(participant => {
      return { ...participant, secretSanta: null };
    });

    setParticipants(newParticipants);
  };

  const handleNewParticipantClick = name => {
    const newParticipants = [
      ...participants,
      { name, secretSanta: null }
    ].sort();

    setText("");
    setParticipants(newParticipants);
    textRef.current.focus();
  };

  const handleDeleteParticipantClick = name => {
    const newParticipants = participants
      .filter(participant => participant.name !== name)
      .map(participant => {
        return { ...participant, secretSanta: null };
      });

    setParticipants(newParticipants);
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleShuffleClick}>Shuffle</button>
        <button onClick={handleResetAllClick}>Reset All</button>
      </div>
      <br />
      <div>
        <input
          placeholder="name"
          value={text}
          onChange={e => setText(e.target.value)}
          ref={textRef}
        />
        <button onClick={() => handleNewParticipantClick(text)}>Add</button>
      </div>
      <ul>
        {participants.map(participant => (
          <li key={participant.name}>
            {participant.name}
            {participant.secretSanta ? ` -> ${participant.secretSanta}` : ""}
            {participant.secretSanta ? (
              <button
                name="reset"
                onClick={() => handleResetClick(participant.name)}
              >
                reset
              </button>
            ) : (
              <button
                name="reset"
                onClick={() => handleDeleteParticipantClick(participant.name)}
              >
                remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
