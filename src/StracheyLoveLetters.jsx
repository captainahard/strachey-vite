import React, { useState, useEffect, useRef } from 'react';

const StracheyLoveLetters = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [leverPulled, setLeverPulled] = useState(false);
  const [lampsFlickering, setLampsFlickering] = useState(false);
  const typewriterRef = useRef(null);

  // Original Strachey vocabularies
  const SALUTATIONS = [
    'DARLING', 'SWEETHEART', 'DEAR', 'BELOVED', 'HONEY', 'CHERISHED'
  ];

  const ADJECTIVES = [
    'AFFECTIONATE', 'AMOROUS', 'ANXIOUS', 'AVID', 'BEAUTIFUL', 'BREATHLESS',
    'BURNING', 'COVETOUS', 'CRAVING', 'CURIOUS', 'EAGER', 'FERVENT',
    'FONDEST', 'LOVEABLE', 'LOVING', 'PASSIONATE', 'PRECIOUS', 'SEDUCTIVE',
    'SWEET', 'SYMPATHETIC', 'TENDER', 'UNSATISFIED', 'WINNING', 'WISTFUL'
  ];

  const NOUNS = [
    'ADORATION', 'AFFECTION', 'AMBITION', 'APPETITE', 'ARDOUR', 'BEING',
    'BURNING', 'CHARM', 'COMFORT', 'COMPASSION', 'DESIRE', 'DEVOTION',
    'EAGERNESS', 'ENCHANTMENT', 'FELLOW FEELING', 'FONDNESS', 'HEART',
    'HUNGER', 'INFATUATION', 'LITTLE LIKING', 'LOVE', 'LUST', 'PASSION',
    'RAPTURE', 'SYMPATHY', 'TENDERNESS', 'THIRST', 'WISH', 'YEARNING'
  ];

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const generateLetter = () => {
    const salutation = getRandomItem(SALUTATIONS);
    const adjective = getRandomItem(ADJECTIVES);
    const noun = getRandomItem(NOUNS);
    
    return `${salutation} SWEETHEART,\n\nYOU ARE MY ${adjective} ${noun}.\n\n                    MUC`;
  };

  const handleLeverPull = () => {
    if (isGenerating) return;
    
    setLeverPulled(true);
    setIsGenerating(true);
    setLampsFlickering(true);
    setDisplayedText('');
    
    const newLetter = generateLetter();
    setCurrentLetter(newLetter);

    // Start typewriter effect after brief delay
    setTimeout(() => {
      setLampsFlickering(false);
      typewriterEffect(newLetter);
    }, 1000);

    // Reset lever after animation
    setTimeout(() => {
      setLeverPulled(false);
    }, 800);
  };

  const typewriterEffect = (text) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 50);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleLeverPull();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGenerating]);

  const PilotLamp = ({ color, isFlickering }) => (
    <div className="relative w-3 h-3 mx-1">
      <div 
        className={`w-full h-full rounded-full border border-gray-400 ${
          isFlickering 
            ? `bg-${color}-400 shadow-lg animate-pulse` 
            : `bg-${color}-200`
        }`}
        style={{
          boxShadow: isFlickering ? `0 0 10px ${color === 'red' ? '#ef4444' : color === 'green' ? '#22c55e' : '#3b82f6'}` : 'none'
        }}
      />
      <div className="absolute inset-0 rounded-full bg-white opacity-30" />
    </div>
  );

  const ToggleSwitch = ({ label }) => (
    <div className="flex flex-col items-center m-2">
      <div className="w-4 h-8 bg-gray-300 border border-gray-400 rounded-sm relative">
        <div className="w-3 h-3 bg-gray-600 rounded-full absolute top-1 left-0.5" />
      </div>
      <span className="text-xs text-gray-600 mt-1 font-mono">{label}</span>
    </div>
  );

  const Knob = ({ label }) => (
    <div className="flex flex-col items-center m-2">
      <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded-full relative">
        <div className="w-1 h-3 bg-gray-600 absolute top-1 left-1/2 transform -translate-x-1/2" />
      </div>
      <span className="text-xs text-gray-600 mt-1 font-mono">{label}</span>
    </div>
  );

  const Meter = ({ label }) => (
    <div className="flex flex-col items-center m-2">
      <div className="w-12 h-8 bg-black border border-gray-400 rounded-sm relative overflow-hidden">
        <div className="absolute inset-1 bg-green-900">
          <div className="w-0.5 h-full bg-green-400 absolute left-1/2 transform -translate-x-1/2" />
        </div>
      </div>
      <span className="text-xs text-gray-600 mt-1 font-mono">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">FERRANTI MARK I</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">MANCHESTER UNIVERSITY COMPUTER • 1953</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">Christopher Strachey's Love Letter Generator</p>
        </div>

        {/* Computer Console */}
        <div className="bg-gray-400 border-4 border-gray-500 rounded-lg p-3 sm:p-6 shadow-2xl">
          
          {/* Top Control Rack */}
          <div className="bg-gray-300 border-2 border-gray-400 rounded p-2 sm:p-4 mb-4">
            {/* Desktop Controls Layout */}
            <div className="hidden lg:flex justify-between items-center">
              
              {/* Left Controls */}
              <div className="flex">
                <ToggleSwitch label="POWER" />
                <ToggleSwitch label="READY" />
                <Knob label="SPEED" />
                <Meter label="LOAD" />
              </div>

              {/* Center Pilot Lamps */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono mb-2 text-gray-700">STATUS</span>
                <div className="flex">
                  <PilotLamp color="red" isFlickering={lampsFlickering} />
                  <PilotLamp color="green" isFlickering={lampsFlickering} />
                  <PilotLamp color="blue" isFlickering={lampsFlickering} />
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex">
                <Meter label="TEMP" />
                <Knob label="GAIN" />
                <ToggleSwitch label="AUTO" />
                <ToggleSwitch label="HALT" />
              </div>
            </div>

            {/* Mobile Controls Layout */}
            <div className="flex flex-wrap lg:hidden justify-between items-center gap-4">
              
              {/* Left Controls */}
              <div className="flex order-1">
                <ToggleSwitch label="POWER" />
                <ToggleSwitch label="READY" />
                <Knob label="SPEED" />
                <Meter label="LOAD" />
              </div>

              {/* Center Pilot Lamps */}
              <div className="flex flex-col items-center order-3 sm:order-2">
                <span className="text-xs font-mono mb-2 text-gray-700">STATUS</span>
                <div className="flex">
                  <PilotLamp color="red" isFlickering={lampsFlickering} />
                  <PilotLamp color="green" isFlickering={lampsFlickering} />
                  <PilotLamp color="blue" isFlickering={lampsFlickering} />
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex order-2 sm:order-3">
                <Meter label="TEMP" />
                <Knob label="GAIN" />
                <ToggleSwitch label="AUTO" />
                <ToggleSwitch label="HALT" />
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg screens and up) */}
          <div className="hidden lg:flex gap-6">
            
            {/* Paper Output Area - Desktop */}
            <div className="flex-1 bg-white border-2 border-gray-600 rounded p-4 relative">
              {/* Tractor Feed Paper */}
              <div className="border-l-4 border-r-4 border-dashed border-gray-300 min-h-96 p-4 bg-gray-50 relative">
                {/* Paper perforations */}
                <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-evenly">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white border border-gray-400 rounded-full ml-1" />
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-evenly">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white border border-gray-400 rounded-full mr-1" />
                  ))}
                </div>

                {/* Letter Output */}
                <div 
                  ref={typewriterRef}
                  className="font-mono text-lg leading-relaxed whitespace-pre-wrap ml-8 mr-8 pt-8"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  {displayedText}
                </div>
              </div>
            </div>

            {/* Control Panel - Desktop */}
            <div className="w-64 bg-gray-300 border-2 border-gray-400 rounded p-4">
              <div className="text-center mb-4">
                <span className="text-sm font-mono text-gray-700">GENERATOR CONTROL</span>
              </div>
              
              {/* Lever Mechanism */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div 
                    className={`w-8 h-24 cursor-pointer transform transition-transform duration-300 ${
                      leverPulled ? 'rotate-45' : 'rotate-0'
                    }`}
                    onClick={handleLeverPull}
                    role="button"
                    tabIndex={0}
                    aria-label="Pull lever to generate love letter"
                  >
                    {/* Lever Handle */}
                    <div className="w-full h-4 bg-red-600 border border-red-800 rounded-t-lg" />
                    {/* Lever Shaft */}
                    <div className="w-2 h-20 bg-gray-600 border border-gray-700 mx-auto" />
                  </div>
                  {/* Lever Base */}
                  <div className="w-12 h-3 bg-gray-500 border border-gray-600 -mt-1 -ml-2" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs font-mono text-gray-600 mb-2">
                  {isGenerating ? 'GENERATING...' : 'PULL LEVER'}
                </p>
                <p className="text-xs text-gray-500">
                  (Press SPACE or click lever)
                </p>
              </div>

              {/* Additional Controls */}
              <div className="mt-6 flex flex-wrap justify-center">
                <ToggleSwitch label="PRINT" />
                <Knob label="FEED" />
              </div>
            </div>
          </div>

          {/* Mobile Layout (below lg screens) */}
          <div className="flex flex-col gap-6 lg:hidden">
            
            {/* Control Panel - Mobile */}
            <div className="w-full bg-gray-300 border-2 border-gray-400 rounded p-4">
              <div className="text-center mb-4">
                <span className="text-sm font-mono text-gray-700">GENERATOR CONTROL</span>
              </div>
              
              {/* Lever Mechanism */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div 
                    className={`w-8 h-24 cursor-pointer transform transition-transform duration-300 ${
                      leverPulled ? 'rotate-45' : 'rotate-0'
                    }`}
                    onClick={handleLeverPull}
                    role="button"
                    tabIndex={0}
                    aria-label="Pull lever to generate love letter"
                  >
                    {/* Lever Handle */}
                    <div className="w-full h-4 bg-red-600 border border-red-800 rounded-t-lg" />
                    {/* Lever Shaft */}
                    <div className="w-2 h-20 bg-gray-600 border border-gray-700 mx-auto" />
                  </div>
                  {/* Lever Base */}
                  <div className="w-12 h-3 bg-gray-500 border border-gray-600 -mt-1 -ml-2" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs font-mono text-gray-600 mb-2">
                  {isGenerating ? 'GENERATING...' : 'PULL LEVER'}
                </p>
                <p className="text-xs text-gray-500">
                  (Press SPACE or click lever)
                </p>
              </div>

              {/* Additional Controls */}
              <div className="mt-6 flex flex-wrap justify-center">
                <ToggleSwitch label="PRINT" />
                <Knob label="FEED" />
              </div>
            </div>

            {/* Paper Output Area - Mobile */}
            <div className="flex-1 bg-white border-2 border-gray-600 rounded p-2 sm:p-4 relative">
              {/* Tractor Feed Paper */}
              <div className="border-l-4 border-r-4 border-dashed border-gray-300 min-h-64 sm:min-h-80 p-2 sm:p-4 bg-gray-50 relative">
                {/* Paper perforations */}
                <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-evenly">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white border border-gray-400 rounded-full ml-1" />
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-evenly">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white border border-gray-400 rounded-full mr-1" />
                  ))}
                </div>

                {/* Letter Output */}
                <div 
                  className="font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap ml-6 sm:ml-8 mr-6 sm:mr-8 pt-4 sm:pt-8"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  {displayedText}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="bg-gray-200 border border-gray-400 rounded mt-4 p-2">
            <div className="flex justify-between items-center text-xs font-mono text-gray-600">
              <span>MUC READY</span>
              <span>{isGenerating ? 'PROCESSING...' : 'STANDBY'}</span>
              <span>MANCHESTER UNIVERSITY</span>
            </div>
          </div>
        </div>

        {/* Historical Context */}
        <div className="mt-8 text-center text-sm text-gray-600 max-w-2xl mx-auto">
          <p className="mb-2">
            In 1953, Christopher Strachey programmed the Ferranti Mark I to generate love letters 
            using combinatorial word lists—one of the first examples of computer creativity.
          </p>
          <p className="italic">
            "YOU ARE MY AVID FELLOW FEELING" - The Manchester University Computer, 1953
          </p>
        </div>
      </div>
    </div>
  );
};

export default StracheyLoveLetters;