import { MouseEventHandler, useEffect, useState } from 'react';
import { postState } from '../generated/api/wordleAssistantAPI';
import { Guess as GuessDto, StateBody, Word as WordDto } from '../generated/dto';

export default function Suggestion({
  guesses,
  selectWord,
}: {
  guesses: GuessDto[];
  selectWord: (word: WordDto) => void;
}): JSX.Element {
  const [results, setResults] = useState<WordDto[]>([]);

  useEffect(() => {
    console.log(guesses);

    const state: StateBody = {
      guesses,
    };

    postState(state, {
      baseURL: 'https://wordle-api.vcx.workers.dev',
    })
      .then((res) => {
        setResults(res.data.recommendations);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [guesses]);

  const click: MouseEventHandler<HTMLButtonElement> = (e) => {
    selectWord(e.currentTarget.innerText);
  };

  return (
    <div className='flex flex-col items-center mt-2 '>
      <h2 className='text-xl font-bold underline'>Suggestions</h2>
      <div className='grid grid-cols-4 gap-2'>
        {results.map((word, idx) => {
          return (
            <button
              type='button'
              key={idx}
              className='border p-2 m-1 text-sm rounded-lg bg-gray-700 text-white'
              onClick={click}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
