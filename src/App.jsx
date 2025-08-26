import React, { useState } from "react";
import Quiz from "./components/quiz";
import Result from "./components/result";

export default function App() {
  const [stage, setStage] = useState("start");
  const [difficulty, setDifficulty] = useState("easy");
  const [summary, setSummary] = useState({ score: 0, questions: [] });

  const startQuiz = () => setStage("quiz");

  const finishQuiz = (score, questions) => {
    setSummary({ score, questions });
    setStage("result");
  };

  const restartQuiz = () => {
    setStage("start");
    setSummary({ score: 0, questions: [] });
  };

  if (stage === "start") {
    return (
      <div className="container">
        <h1>General Quiz</h1>
        <p>Select difficulty:</p>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (stage === "quiz") {
    return <Quiz difficulty={difficulty} onFinish={finishQuiz} />;
  }

  return (
    <Result
      score={summary.score}
      questions={summary.questions}
      onRestart={restartQuiz}
    />
  );
}
