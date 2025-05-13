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
    "Learning new technologies opens up endless possibilities."
  ];

  const [sentence, setSentence] = useState('');
  const [time, setTime] = useState(60);
  const [hasStarted, setHasStarted] = useState(false);
  const [input, setInput] = useState('');

  const [words, setWords] = useState(0);
  const [chars, setChars] = useState(0);
  const [score ,setScore]=useState(false)
 
  const [isComplete, setIsComplete] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  
const [totalChars, setTotalChars] = useState(0);


  // Initialize with a random sentence
  useEffect(() => {
    if(input.length >= sentence.length)
  {  const random = Math.floor(Math.random() * messages.length);
    setSentence(messages[random].toLowerCase());}
  }, []);

  // Handle completion of current sentence
  useEffect(() => {
 
    if (input.length >= sentence.length && hasStarted) {
      // Save current session stats before resetting
      const wordsTyped = input.trim().split(' ').filter(word => word.length > 0);
      const sentenceWords = sentence.trim().split(' ');
      
      let correctWordCount = 0;
      let correctCharCount = 0;
      
  
      wordsTyped.forEach((word, idx) => {
        if (idx < sentenceWords.length && word === sentenceWords[idx]) {
          correctWordCount++;
          correctCharCount += word.length;

          // correctacc = Math.round((correctCharCount/ wordsTyped.length)*100)
        }
      });
  
      setTotalWords(prev => prev + correctWordCount);
      setTotalChars(prev => prev + correctCharCount);
     
      
      
      
  
      // Reset input and load a new sentence
      setInput('');
      const random = Math.floor(Math.random() * messages.length);
      setSentence(messages[random].toLowerCase());
    }
  }, [input, sentence, hasStarted]);
  

  // Calculate typing metrics
  useEffect(() => {
    if (hasStarted) {
      const wordsTyped = input.trim().split(' ').filter(word => word.length > 0);
      const sentenceWords = sentence.trim().split(' ');
      
      let correctWordCount = 0;
      let correctCharCount = 0;
 
      
      wordsTyped.forEach((word, idx) => {
        if (idx < sentenceWords.length && word === sentenceWords[idx]) {
          correctWordCount++;
          correctCharCount += word.length;
        }
      });
      
      setWords(correctWordCount);
      setChars(correctCharCount);
      
      
     
    }
  }, [input, sentence, hasStarted]);

  // Timer countdown
  useEffect(() => {
    if (hasStarted && time > 0) {
      const timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 && hasStarted) {
      setIsComplete(true);
      setHasStarted(false);
    }
  }, [time, hasStarted]);

  const start = () => {
    setTime(60);
    setInput('');
   
    setTotalChars(0)
    setTotalWords(0)
  
    setWords(0);
    setChars(0);
  
    setIsComplete(false);
    setHasStarted(true);
    
    const random = Math.floor(Math.random() * messages.length);
    setSentence(messages[random].toLowerCase());
  };

  const stop = () => {
    setTime(0);
    setHasStarted(false);
    setIsComplete(true);
  };

  useEffect(()=>{
{time===0?setScore(true):null}
  },[time])

  // Render the text with highlighting to show correct/incorrect characters
  const renderHighlightedText = () => {
    const words = sentence.split(' ');
    
    return words.map((word, wordIdx) => {
      const characters = word.split('');
      
      return (
        <React.Fragment key={`word-${wordIdx}`}>
          {wordIdx > 0 && " "}
          <span className="word">
            {characters.map((char, charIdx) => {
              const globalCharIndex = sentence.indexOf(word) + charIdx;
              const typedChar = input[globalCharIndex];
              
              let className = "text-gray-400"; // Default color for not-yet-typed
              
              if (typedChar !== undefined) {
                className = typedChar === char ? "text-gray-800" : "text-red-500";
              }
              
              return (
                <span key={`char-${wordIdx}-${charIdx}`} className={className}>
                  {char}
                </span>
              );
            })}
          </span>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 pb-32">
      {/* Page header */}
      <div className="text-center w-full py-8">
        <h1 className="text-xl  text-gray-800 mb-2">TYPING SPEED TEST</h1>
        <h2 className="text-6xl font-black text-gray-900">Test your typing skills</h2>
      </div>
      
      {/* Stats display */}
      <div className="flex justify-center gap-16 mt-12">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-yellow-300 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold">{time}</div>
              <div className="text-sm text-gray-500">seconds</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">{totalWords}</div>
            <div className="text-sm text-gray-500">words/min</div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">{totalChars}</div>
            <div className="text-sm text-gray-500">chars/min</div>
          </div>
          
         
        </div>
      </div>
      
      {/* Typing area */}
      <div className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="relative w-full">
          <div className="text-3xl font-normal mb-4 min-h-16">
            {renderHighlightedText()}
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => {
              if (!hasStarted && !isComplete) setHasStarted(true);
              setInput(e.target.value);
            }}
            disabled={time === 0 || isComplete}
            className="w-full p-4 text-2xl border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
            placeholder="Start typing..."
            autoFocus
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-8">
        <div className="flex justify-center gap-4">
          <button 
            onClick={start} 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            {isComplete ? "Try Again" : "Reset"}
          </button>
          {hasStarted && (
            <button 
              onClick={stop} 
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {score && (
  <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl p-8 w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Typing Spirit Animal</h2>
      
      {totalWords < 24 ? (
        <>
          <div className="text-5xl">🐢</div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            You’re a Turtle! Slow and steady... but maybe try a little less steady next time 🐌
          </p>
        </>
      ) : totalWords < 45 ? (
        <>
          <div className="text-5xl">🐇</div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            You’re a Rabbit! Quick and curious. Keep practicing and you might just gallop next time!
          </p>
        </>
      ) : (
        <>
          <div className="text-5xl">🐎</div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            You’re a Horse! Fast, focused, and powerful. Keep charging ahead!
          </p>
        </>
      )}

      <button
        onClick={() => setScore(false)}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

      
      
      
    </div>
  );
}

export default App;