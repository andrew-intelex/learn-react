import React, { useState } from 'react';
import './App.css';


const App = () => {

    let initialState = [...Array(9).keys()].map(x => ({
        number: x + 1,
        selected: false,
        used: false,
        wrong: false
    }));

    const [boardState, setBoardState] = useState(initialState);
    const [starCount, setStarCount] = useState(utils.random(1, 9));
    const [isGameOver, setIsGameOver] = useState(false);

    
    const [timeElapsed, setTimeElapsed] = useState(0);

    // initialize timer
    const tmpTimerId = setTimeout(() => {
        if (timeElapsed >= 10) {
            ResetHandler();
        }
        else {
            setTimeElapsed(timeElapsed + 1);
        }
    }, 1000);

        const [timerId, setTimerId] = useState(tmpTimerId);



    const numberClickHandler = (selectedNum) => {

        // if used, do not do anything
        if (boardState.filter(el => (el.used && el.number === selectedNum)).length > 0) {
            return;
        }

        // clear wrong numbers
        boardState.forEach(function (el) {
            if (el.selected) {
                el.wrong = false;
            }
        });

        // mark clicked as selected/deselected
        boardState[selectedNum - 1].selected = !boardState[selectedNum - 1].selected;

        // calc sum of selected
        let selectedNumbers = boardState.filter(el => el.selected).map(el => el.number);
        let sum = utils.sum(selectedNumbers);

        // if selection is correct
        if (sum === starCount) {

            // mark all selected as used; clear selection
            boardState.forEach(function (el) {
                if (el.selected) {
                    el.selected = false;
                    el.used = true;
                }
            });

         
            // update number of stars
            let unusedNumbers = boardState.filter(el => !el.used).map(el => el.number);
            if (unusedNumbers.length == 0) {
                setIsGameOver(true);
            }
            else {
                let newStarCount = utils.randomSumIn(unusedNumbers, 9);
                setStarCount(newStarCount);
            }
           
        }
        else if (sum > starCount) {

            // mark all selected as wrong
            boardState.forEach(function (el) {
                if (el.selected) {
                    el.wrong = true;
                }
            });
        }

        setBoardState(JSON.parse(JSON.stringify(boardState)));    
    }

    const ResetHandler = () => {
        setBoardState(initialState);
        setIsGameOver(false);
        setStarCount(utils.random(1, 9));
        setTimeElapsed(0);
        if (timerId != -1) {
            clearTimeout(timerId);
            setTimerId(-1);
        }
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
		</div>
            <div className="body">
                <div className="left">
                    {
                        isGameOver ? <PlayAgain resetHandler={ResetHandler}/> :  utils.range(1, starCount).map(el => <Star key={el} />)
				 }                    
                </div>
                <div className="right">
                    <NumBoard boardState={boardState} numberClickHandler={numberClickHandler} />
                </div>
            </div>
            <div className="timer">Time Remaining: {timeElapsed}</div>

        </div>
    );
};



const Star = () => {
    return (
        <div className="star" />
    );
}



const NumBoard = (props) => {

    const handleClick = (e) => {
        props.numberClickHandler(parseInt(e.target.id));
    }

    function computeState(el) {

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
        props.boardState.map(el =>
            <Num num={el.number} key={el.number} onClickHandler={handleClick}
                status={computeState(el)} />
        )
    )
}



const Num = (props) => {

    let computeClass = function (status) {

        if (status === "usedNumber") {
            return "number used";
        }
        if (status === "wrongNumber") {
            return "number wrong";
        }
        if (status === "selectedNumber") {
            return "number selected";
        }
        return "number";
    }

    return (
        <button
            id={props.num}
            onClick={props.onClickHandler}
            className={computeClass(props.status)}>
            {props.num}
        </button>
    );
}

const PlayAgain = (props) => {

    return (
        <div className="game-done">
            <div className="message">You win</div>
            <button onClick={props.resetHandler}> Play Again</button>
        </div>
    );
}


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