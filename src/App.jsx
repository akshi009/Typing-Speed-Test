import React, { useEffect, useState } from 'react';

function App() {
  const messages = [
    "The quick brown fox jumps over the lazy dog.",
    "Coding is fun and challenging at the same time.",
    "React.js is a popular JavaScript library for building user interfaces.",
    "Practice makes perfect in programming.",
    "Always strive for continuous improvement in your skills.",
    "Keep calm and code on!",
    "Programming is a creative process of problem-solving.",
    "Efficiency and readability are key factors in writing good code.",
    "Success in coding requires patience and perseverance.",
    "Learning new technologies opens up endless possibilities.",
  ];

  const [sentence, setSentence] = useState('');
  const [time, setTime] = useState(60);
  const [hasStarted, setHasStarted] = useState(false);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [words, setWords] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const random = Math.floor(Math.random() * messages.length);
    setSentence(messages[random].toLowerCase());
  }, []);

  useEffect(() => {
    if (input.length >= sentence.length) {
      setInput('');
      
      const random = Math.floor(Math.random() * messages.length);
      setSentence(messages[random].toLowerCase());
      setScore((prev) => prev + 10);
    }
  }, [input, sentence]);

  useEffect(() => {
    const wordsTyped = input.trim().toLowerCase().split(' ');
    const sentenceWords = sentence.trim().toLowerCase().split(' ');
  
    let correctWordCount = 0;
    let correctCharCount = 0;
  
    wordsTyped.forEach((word, idx) => {
      if (word === sentenceWords[idx]) {
        correctWordCount++;
        correctCharCount += word.length; //NICE
      }
    });
  
    setWords(correctWordCount);
    setChar(correctCharCount);
  }, [input, sentence]);
  

  useEffect(() => {
    if (hasStarted && time > 0) {
      const timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, hasStarted]);

  const start = () => {
    setTime(60);
    setInput('');
    setScore(0);
    setHasStarted(false);
  };

  const stop = () => {
    setTime(0);
    setInput('');
    setHasStarted(false);
  };

  // This function renders the input text with colored words instead of characters
  const renderHighlightedInput = () => {
    const wordsTyped = input.toLowerCase().split(' ');
    const sentenceWords = sentence.toLowerCase().split(' ');
  
    return wordsTyped.map((typedWord, wordIdx) => {
      const correctWord = sentenceWords[wordIdx] || '';
      let isWordCorrect = true;

  
      
      // Check if the word is correct
      if (typedWord !== correctWord && typedWord !== '') {
        isWordCorrect = false;
      }
      
      return (
        //NICE
        <React.Fragment key={wordIdx}>
          <span className={isWordCorrect ? "text-green-600 cursor-not-allowed" : "text-red-600 cursor-not-allowed"}>
            {typedWord}
          </span>
          
          {wordIdx < wordsTyped.length - 1 && <span> </span>}  
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-4">
      {/* Timer and Stats */}
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        <div className="w-24 h-24 flex items-center justify-center text-3xl font-bold bg-white rounded-full shadow-md text-gray-900">
          {time}
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold bg-white p-5 rounded-2xl text-gray-900 shadow-md">{words}</div>
          <div className="text-sm text-gray-400 mt-2">words/min</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold bg-white p-5 rounded-2xl text-gray-900 shadow-md">{char}</div>
          <div className="text-sm text-gray-400 mt-2">chars/min</div>
        </div>
      </div>

      {/* Sentence */}
      <div className="mt-12 text-center text-2xl sm:text-3xl font-bold text-gray-900">
        {sentence}
      </div>

      {/* Input with colored text overlay */}
      <div className="w-full max-w-xl mt-8 relative">
        {/* This is the visible, colored text layer */}
        <div className="absolute inset-0 p-3 font-mono text-lg z-10 pointer-events-none overflow-hidden">
          {renderHighlightedInput()}
        </div>
        
        {/* This is the actual input field (transparent text) */}
        <input
          type="text"
          value={input}
          onChange={(e) => {
            if (!hasStarted) setHasStarted(true);
            setInput(e.target.value);
          }}
          disabled={time === 0}
          className={`w-full text-transparent p-3 rounded-lg bg-white border border-gray-300  text-lg font-mono caret-black
            ${time === 0 ? 'cursor-not-allowed' : ''} 
            focus:outline-none focus:ring-2 focus:ring-teal-400`}
          placeholder="Start typing here..."
          autoFocus
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-12">
        <button
          onClick={start}
          className="px-6 py-3 bg-gray-200 text-gray-900 font-bold rounded hover:bg-gray-300 transition shadow-md"
        >
          Reset
        </button>
        <button
          onClick={stop}
          className="px-6 py-3 bg-gray-200 text-gray-900 font-bold rounded hover:bg-gray-300 transition shadow-md"
        >
          Stop
        </button>
      </div>

      {/* Optional Score */}
      {/* <div className='text-center text-3xl font-bold text-gray-900 mt-4'>Score: {score}</div> */}
    </div>
  );
}

export default App;