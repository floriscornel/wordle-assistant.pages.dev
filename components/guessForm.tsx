import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Word } from '../generated/dto';

export default function GuessForm({ onSubmit }: { onSubmit: (guess: Word) => void }): JSX.Element {
  const [guess, setGuess] = useState('');

  const upperCaseInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const result = event.target.value.toUpperCase();
    setGuess(result);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(guess);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          minLength={5}
          maxLength={5}
          size={5}
          pattern='[a-zA-Z]{5}'
          spellCheck={false}
          autoCorrect='off'
          className='border p-2 border-gray-300 bg-gray-600 text-sm rounded-lg mr-2 w-20 text-white'
          value={guess}
          onChange={upperCaseInput}
        />
        <input
          type='submit'
          value='Guess'
          className='border p-2 ml-2 border-gray-300 bg-gray-500 text-sm rounded-lg text-white'
        />
      </form>
    </>
  );
}
