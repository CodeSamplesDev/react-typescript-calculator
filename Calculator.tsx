import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

type Operator = '+' | '-' | '*' | '/' | '%';
type Calculation = {
  input: string;
  result: string;
};

const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [calcHistory, setCalcHistory] = useState<Calculation[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [input, calcHistory]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/[^0-9+\-*/%.]/.test(value)) {
      // If any character other than numbers and operators is entered, don't update the input state
      return;
    } else {
      setInput(value);
    }
  };

  const handleNumber = (num: number) => {
    setInput(`${input}${num}`);
  };

  const handleOperator = (operator: Operator) => {
    if (!input) return;

    const lastChar = input.charAt(input.length - 1);
    if (lastChar === operator) return;

    setInput(`${input}${operator}`);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(input);
      setResult(`${calculatedResult}`);
      setCalcHistory((prev) => [
        ...prev,
        { input: input, result: calculatedResult.toString() },
      ]);

      setInput('');
    } catch {
      setResult('Invalid Input');
    }
  };

  const handleButtonClick = (buttonValue: string) => {
    if (buttonValue === '.') {
      // Only allow one dot in the input
      if (!input.includes('.')) {
        setInput(input + buttonValue);
      }
    } else if (buttonValue === 'backspace') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + buttonValue);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="io-wrapper" ref={messagesEndRef}>
          {calcHistory.map((calc, idx) => (
            <div key={idx} className="io">
              <p className="input">{calc.input}</p>
              <p className="result">{calc.result}</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="inputfield"
          value={input}
          onChange={handleInput}
          autoFocus={true}
          placeholder="0"
          pattern="[0-9+\-*/()%\.]*"
        />
      </div>
      <div className="controls">
        <button onClick={handleClear}>Ac</button>
        <button onClick={() => handleButtonClick('backspace')}>&lsaquo;</button>
        <button onClick={() => handleOperator('/')}>/</button>
        <button onClick={() => handleOperator('*')}>*</button>
        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button onClick={() => handleOperator('%')}>%</button>
        <button onClick={() => handleNumber(0)}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
