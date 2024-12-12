import React, { useState } from 'react';

const boardSize = 15;
const initialBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

function Gomoku() {
  const [board, setBoard] = useState(initialBoard);
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  function handleClick(row, col) {
    if (board[row][col] !== null || winner) return; // 如果该位置已经有棋子或游戏已结束，则不做任何操作

    const newBoard = [...board];
    newBoard[row][col] = isBlackTurn ? '黑' : '白';
    setBoard(newBoard);
    setIsBlackTurn(!isBlackTurn); // 切换玩家
    checkForWin(newBoard, row, col);
  }

  function checkForWin(board, row, col) {
    const player = board[row][col];
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]]; // 水平、垂直、两个对角线方向
    let hasWon = false;

    for (let [dx, dy] of directions) {
      let count = 1;
      // 检查一个方向
      for (let step = 1; step < 5; step++) {
        const x = row + dx * step;
        const y = col + dy * step;
        if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === player) {
          count++;
        } else {
          break;
        }
      }
      // 检查相反方向
      for (let step = 1; step < 5; step++) {
        const x = row - dx * step;
        const y = col - dy * step;
        if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === player) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 5) {
        hasWon = true;
        break;
      }
    }

    if (hasWon) {
      setWinner(player);
    }
  }

  function renderSquare(row, col) {
    return (
      <button className="square" onClick={() => handleClick(row, col)}>
        {board[row][col]}
      </button>
    );
  }

  return (
    <div>
      {winner && <div className="winner">{`${winner} 获胜!`}</div>}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => renderSquare(rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
}

export default Gomoku;

