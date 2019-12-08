import React, { useState } from "react";
import ReactDOM from "react-dom";
import { sample } from "lodash";

const allParticipants = [
  { name: "André", secretSanta: null },
  { name: "Ana Filipa", secretSanta: null },
  { name: "Ana Luísa", secretSanta: null },
  { name: "Beatriz", secretSanta: null },
  { name: "Claudia", secretSanta: null },
  { name: "Coelho", secretSanta: null },
  { name: "Daniel", secretSanta: null },
  { name: "David Sêco", secretSanta: null },
  { name: "Francisco", secretSanta: null },
  { name: "Guilherme", secretSanta: null },
  { name: "Hélder Barril", secretSanta: null },
  { name: "Inês Barros", secretSanta: null },
  { name: "Inês Henriques", secretSanta: null },
  { name: "Joana Coelho", secretSanta: null },
  { name: "João Sequeira", secretSanta: null },
  { name: "Leonor", secretSanta: null },
  { name: "Lili", secretSanta: null },
  { name: "Luísito", secretSanta: null },
  { name: "Mara", secretSanta: null },
  { name: "Maria (filha Rita Carvalho)", secretSanta: null },
  { name: "Mariana", secretSanta: null },
  { name: "Mário", secretSanta: null },
  { name: "Marta Simões", secretSanta: null },
  { name: "Milton", secretSanta: null },
  { name: "Ricardo", secretSanta: null },
  { name: "Rita Carvalho", secretSanta: null },
  { name: "Romeu", secretSanta: null },
  { name: "Solange", secretSanta: null },
  { name: "Teresa", secretSanta: null },
  { name: "Vitor", secretSanta: null }
];

function App() {
  const [participants, setParticipants] = useState(allParticipants.sort());

  const handleRaffleClick = () => {
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

  const handleClearAllClick = () => {
    const newParticipants = participants.map(participant => {
      return { ...participant, secretSanta: null };
    });

    setParticipants(newParticipants);
  };

  return (
    <div className="App">
      <button onClick={handleRaffleClick}>Raffle</button>
      <button onClick={handleClearAllClick}>Clear All</button>
      <ul>
        {participants.map(participant => (
          <li key={participant.name}>
            {participant.name}
            {participant.secretSanta ? ` -> ${participant.secretSanta}` : ""}
            {participant.secretSanta && (
              <button
                name="reset"
                onClick={() => handleResetClick(participant.name)}
              >
                reset
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
