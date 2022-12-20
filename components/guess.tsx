import { Guess as GuessDto, GuessItemFeedback } from '../generated/dto';

export default function Guess({ guess }: { guess: GuessDto }): JSX.Element {
  function getBackgroundColor(feedback: GuessItemFeedback): string {
    switch (feedback) {
      case GuessItemFeedback.NotCorrect:
        return 'bg-red-200';
      case GuessItemFeedback.OtherLocation:
        return 'bg-gray-200';
      case GuessItemFeedback.Correct:
        return 'bg-green-200';
    }
  }

  return (
    <div className='flex flec-row'>
      {guess.map((guess, idx) => {
        return (
          <div
            key={idx}
            className={`${getBackgroundColor(
              guess.feedback,
            )} border p-2 m-1 border-gray-300 text-gray-900 text-sm rounded-lg`}
          >
            {guess.letter}
          </div>
        );
      })}
    </div>
  );
}
