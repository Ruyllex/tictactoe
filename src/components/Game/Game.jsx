import React, { useState } from 'react';
import Board from '../Board/Board.jsx';
import calculateWinner from '../../utils/calculateWinner.jsx';
import './Game.css'

function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const handleClick = (i) => {
        const historyCopy = history.slice(0, stepNumber + 1);
        const currentCopy = historyCopy[historyCopy.length - 1];
        const squares = currentCopy.squares.slice();

        if (winner || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(historyCopy.concat([{ squares }]));
        setStepNumber(historyCopy.length);
        setXIsNext(!xIsNext);
    };


    const restartGame = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(0);
        setXIsNext(true);
    };

    return (
        <div className="game">
            <h1 id='Title'>TicTacToe</h1>
            <div className="game-board">
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')}</div>
                <button className="restart-button" onClick={restartGame}>Restart</button>
            </div>
        </div>
    );
}

export default Game;