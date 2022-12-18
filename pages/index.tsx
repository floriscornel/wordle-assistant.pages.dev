import Head from 'next/head';

export default function Home(): JSX.Element {
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
          <h1 className='text-3xl font-bold underline'>Wordle Assistant</h1>
          <p>Enter your guess:</p>
          <form className='w-24 flex flex-row justify-between'>
            <input
              type='text'
              minLength={5}
              maxLength={5}
              size={5}
              spellCheck={false}
              autoCorrect='off'
              className='border border-gray-300 text-gray-900 text-sm rounded-lg'
            />
            <input
              type='submit'
              value='Guess'
              className='border border-gray-300 text-gray-900 text-sm rounded-lg'
            />
          </form>
        </div>
      </main>
    </>
  );
}
