import React, {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import quizzes from '@site/src/data/quizzes.json';

import styles from './quiz.module.css';

type Question = {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  related: string;
};

type QuizData = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

type QuizProps = {
  quizId: string;
};

function rotateQuestionOptions(question: Question, questionIndex: number, quizId: string): Question {
  const shift = (questionIndex + quizId.length) % question.options.length;
  const optionEntries = question.options.map((option, optionIndex) => ({
    option,
    isAnswer: optionIndex === question.answerIndex,
  }));
  const rotatedEntries = optionEntries.slice(shift).concat(optionEntries.slice(0, shift));

  return {
    ...question,
    options: rotatedEntries.map((entry) => entry.option),
    answerIndex: rotatedEntries.findIndex((entry) => entry.isAnswer),
  };
}

export default function Quiz({quizId}: QuizProps) {
  const quiz = (quizzes as QuizData[]).find((item) => item.id === quizId);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const questions = useMemo(
    () => quiz?.questions.map((question, index) => rotateQuestionOptions(question, index, quiz.id)) ?? [],
    [quiz],
  );

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      return total + (answers[index] === question.answerIndex ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  if (!quiz) {
    return <p>Quiz not found.</p>;
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className={styles.quiz}>
      <div className={styles.summary}>
        <div>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
        <div className={styles.progress}>
          {answeredCount}/{questions.length}
        </div>
      </div>

      {submitted && (
        <div className={styles.result}>
          得分：{score}/{questions.length}
        </div>
      )}

      <ol className={styles.questions}>
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const isCorrect = selected === question.answerIndex;

          return (
            <li className={styles.question} key={question.prompt}>
              <p className={styles.prompt}>{question.prompt}</p>
              <div className={styles.options}>
                {question.options.map((option, optionIndex) => {
                  const checked = selected === optionIndex;
                  const optionState =
                    submitted && optionIndex === question.answerIndex
                      ? styles.correct
                      : submitted && checked && !isCorrect
                        ? styles.incorrect
                        : '';

                  return (
                    <label className={`${styles.option} ${optionState}`} key={option}>
                      <input
                        checked={checked}
                        name={`${quiz.id}-${questionIndex}`}
                        onChange={() => {
                          setAnswers((current) => ({
                            ...current,
                            [questionIndex]: optionIndex,
                          }));
                        }}
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <div className={styles.explanation}>
                  <strong>{isCorrect ? '答对了' : '再看一眼'}：</strong>
                  {question.explanation}{' '}
                  <Link to={question.related}>相关文档</Link>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className={styles.actions}>
        <button
          className="button button--primary"
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
          type="button">
          提交测验
        </button>
        <button
          className="button button--secondary"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          type="button">
          重新开始
        </button>
      </div>
    </div>
  );
}
