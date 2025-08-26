import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./question";
import ProgressBar from "./progressBar";

export default function Quiz({ difficulty, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch questions when quiz starts
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await axios.get(
          `https://opentdb.com/api.php?amount=5&category=18&difficulty=${difficulty}&type=multiple`
        );
        const formatted = res.data.results.map((q, i) => {
          const options = [...q.incorrect_answers];
          const randIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(randIndex, 0, q.correct_answer);
          return {
            id: i + 1,
            question: q.question,
            options,
            answerIndex: randIndex,
            chosen: null,
          };
        });
        setQuestions(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    }
    fetchQuestions();
  }, [difficulty]);

  const handleSelect = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    const current = questions[index];
    const correct = selected === current.answerIndex;

    // update score
    if (correct) setScore((s) => s + 1);

    // store chosen answer
    questions[index].chosen = selected;

    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      setSelected(null);
    } else {
      onFinish(score + (correct ? 1 : 0), questions);
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <div>
      <ProgressBar current={index + 1} total={questions.length} />
      <Question
        q={questions[index]}
        selectedIndex={selected}
        onSelect={handleSelect}
      />
      <button
        onClick={handleNext}
        disabled={selected === null}
        className="next"
      >
        {index === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
