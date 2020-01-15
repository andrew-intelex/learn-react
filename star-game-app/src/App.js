import React, { useState, useEffect } from 'react';
import './App.css';


// v1 STAR MATCH - Starting Template

 

const StarBoard = function() {
  return (
    
          <div className="star" />

 

  );
}

 

const NumBoard = (props) => {
   const handleClick = (e) =>{
    console.log(e.target.id)
  }
   function computeState(num)
  {
    console.log(props.usedNumbers)
    if(props.usedNumbers.includes(num))
  {
      return "usedNumber";
      }
    if(props.wrongNumber.includes(num))
      {
        return "wrongNumber";
      }
  }
   
   
   

 

  
  return(
    utils.range(1,9).map( num => <Num num={num}  onClickHandler={handleClick} isUsed={computeState(num)}/>)
  )
}

 

const Num = (props) => {
  function computeClass(isUsed)
  {
    if(isUsed==="usedNumber")
      {
        return "number used";
      }
    if(isUsed==="wrongNumber")
      {
        return "number wrong";
      }
    return "number";
  }
 console.log(props.isUsed);
  return(
  <button className="number" id = {props.num} onClick={props.onClickHandler} className={computeClass(props.isUsed)}>{props.num}</button>
  );
}

 

const App = () => {
  const [starCount,setStarCount] = useState(utils.random(1,9));
  const [usedNumbers, setUsedNumbers] = useState([1, 6, 7, 8]);
  const [wrongNumbers, setWrongNumbers] = useState([2,4]);
  const [selectedNumbers, setSelectedgNumbers] = useState([3,5]);
  
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
         { utils.range(1,starCount).map((el) => <StarBoard/>)
          }
        </div>
        <div className="right">
          <NumBoard usedNumbers={usedNumbers} wrongNumber={wrongNumbers}  />
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

 

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

 

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

 

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

 

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

 

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

 

export default App;