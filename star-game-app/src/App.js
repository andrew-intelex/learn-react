import React, { useState } from 'react';
import './App.css';


// v1 STAR MATCH - Starting Template

const App = () => {

    let initialState = [...Array(9).keys()].map(x => ({
        number: x + 1,
        selected: false,
        used: false,
        wrong: false
    }));

    const [boardState, setBoardState] = useState(initialState);



    const [starCount, setStarCount] = useState(utils.random(1, 9));
    // const [usedNumbers, setUsedNumbers] = useState([]);
    // const [wrongNumbers, setWrongNumbers] = useState([]);
    // const [selectedNumbers, setSelectedNumbers] = useState([]);

    const numberClickHandler = (selectedNum) => {
		
		// if used, do not do anything
		if (boardState.filter(el => (el.used && el.number==selectedNum)).length > 0) {
			return;
		}
		
		// clear wrong
		for (let i = 0 ; i < boardState.length ; i++) {
			if (boardState[i].selected) {
				boardState[i].wrong = false;
			}
		}
		
		// mark clicked as selected/deselected
		boardState[selectedNum-1].selected = !boardState[selectedNum-1].selected;		
		
		// if selection is correct
		let selectedNumbers = boardState.filter(el => el.selected).map(el => el.number);
		let sum = utils.sum(selectedNumbers);
		if (sum == starCount) {
			// mark all selected as used; clear selection
			for (let i = 0 ; i < boardState.length ; i++) {
				if (boardState[i].selected) {
					boardState[i].selected = false;
					boardState[i].used = true;
				}
			}
			
			let newStarCount = utils.randomSumIn(boardState.filter(el => !el.used).map(el => el.number), 9);
			setStarCount(newStarCount);
		}
		else if (sum < starCount) {
			// do nothing, continue
		}			
		else{
			// mark all selected as wrong
			for (let i = 0 ; i < boardState.length ; i++) {
				if (boardState[i].selected) {
					boardState[i].wrong = true;
				}
			}
		}
		
		setBoardState(JSON.parse(JSON.stringify(boardState)));
    }


    return (
		<div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
		</div>
            <div className="body">
                <div className="left">
                    {utils.range(1, starCount).map((el) => <Star key={el} />)
                    }
                </div>
                <div className="right">
                    <NumBoard boardState={boardState} numberClickHandler={numberClickHandler} />
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};



const Star = function() {
  return (
    
          <div className="star" />
  );
}

  

const NumBoard = (props) => {

    const handleClick = (e) => {
        props.numberClickHandler(parseInt(e.target.id));
        //console.log(e.target.id)
    }

    function computeState(el) {
        /*
        if(props.usedNumbers.includes(num))
        {
          return "usedNumber";
          }
        if(props.wrongNumber.includes(num))
          {
            return "wrongNumber";
          }
        if(props.selectedNumber.includes(num))
          {
            return "selectedNumber";
          }
          */

        if (el.wrong) {
            return "wrongNumber";
        }
        if (el.selected) {
            return "selectedNumber";
        }
        if (el.used) {
            return "usedNumber";
        }
        return "";
    }

    return (
        //utils.range(1,9).map( num => 
        //	<Num num={num} key={num} 
        //		onClickHandler={handleClick} 
        //		isUsed={computeState(num)}/>
        //)

        props.boardState.map(el =>
            <Num num={el.number} key={el.number} onClickHandler={handleClick}
                status={computeState(el)} />
        )

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
	 if(isUsed==="selectedNumber")
      {
        return "number selected";
      }
    return "number";
  }
  return(
      <button className="number" id={props.num} onClick={props.onClickHandler} className={computeClass(props.status)}>{props.num}</button>
  );
}

 



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