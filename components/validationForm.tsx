import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Guess, Word, GuessItemFeedback } from '../generated/dto';

export default function ValidationForm({
  word,
  onSubmit,
}: {
  word: Word;
  onSubmit: (guess: Guess) => void;
}): JSX.Element {
  const [validation, setValidation] = useState<Guess | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (validation == null) return;
    onSubmit(validation);
  };

  useEffect(() => {
    const guess: Guess = word.split('').map((letter) => ({
      letter,
      feedback: GuessItemFeedback.NotCorrect,
    }));
    setValidation(guess);
  }, [word]);

  function getBackgroundColor(feedback: GuessItemFeedback): string {
    switch (feedback) {
      case GuessItemFeedback.NotCorrect:
        return 'bg-gray-700';
      case GuessItemFeedback.OtherLocation:
        return 'bg-yellow-400';
      case GuessItemFeedback.Correct:
        return 'bg-emerald-600';
    }
  }

  function getNextFeedback(feedback: GuessItemFeedback): GuessItemFeedback {
    switch (feedback) {
      case GuessItemFeedback.NotCorrect:
        return GuessItemFeedback.OtherLocation;
      case GuessItemFeedback.OtherLocation:
        return GuessItemFeedback.Correct;
      case GuessItemFeedback.Correct:
        return GuessItemFeedback.NotCorrect;
    }
  }

  const buttons = (): JSX.Element[] => {
    if (validation == null) return [];
    const letters: JSX.Element[] = validation.map((guess, idx) => {
      const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        const newValidation = [...validation];
        newValidation[idx].feedback = getNextFeedback(guess.feedback);
        setValidation(newValidation);
      };
      return (
        <button
          key={idx}
          type='button'
          className={`${getBackgroundColor(
            guess.feedback,
          )} text-white border p-4 m-1 border-gray-300 text-sm rounded-lg`}
          onClick={handleClick}
        >
          {guess.letter}
        </button>
      );
    });
    return letters;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {buttons().map(function (object, i) {
          return object;
        })}
        <input
          type='submit'
          value='Submit'
          className='border p-2 ml-2 border-gray-300 bg-gray-500 text-sm rounded-lg text-white'
        />
      </form>
    </>
  );
}
