import Head from 'next/head';
import { useState } from 'react';
import Guess from '../components/guess';
import GuessForm from '../components/guessForm';
import Suggestion from '../components/suggestion';
import ValidationForm from '../components/validationForm';
import { Guess as GuessDto, Word as WordDto } from '../generated/dto';

export default function Home(): JSX.Element {
  const [state, setState] = useState<GuessDto[]>([]);

  const [guess, setGuess] = useState<WordDto | null>(null);

  const formSubmit = (guess: WordDto): void => {
    setGuess(guess);
  };
  const validationSubmit = (guess: GuessDto): void => {
    const newState = [...state];
    newState.push(guess);
    setState(newState);
    setGuess(null);
    console.log(state);
  };

  const Form = (): JSX.Element => {
    if (guess === null) {
      return <GuessForm onSubmit={formSubmit} />;
    } else {
      return <ValidationForm word={guess} onSubmit={validationSubmit} />;
    }
  };

  const guesses = (): JSX.Element[] => {
    return state.map((guess, idx) => {
      return <Guess guess={guess} key={idx} />;
    });
  };

  const selectWord = (word: WordDto): void => {
    setGuess(word);
  };

  return (
    <>
      <Head>
        <title>Wordle Assistant</title>
        <meta name='description' content='Wordle Assistant webui' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='center'>
        <div className='container-sm flex flex-col items-center'>
          <h1 className='text-3xl font-bold underline m-3'>Wordle Assistant</h1>
          <Form />
          <h2 className='text-xl font-bold underline mt-3'>Guesses</h2>
          {guesses().map(function (guess, i) {
            return guess;
          })}

          <Suggestion guesses={state} selectWord={selectWord} />
        </div>
      </main>
    </>
  );
}
