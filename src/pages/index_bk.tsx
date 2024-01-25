import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  //0 -> 未クリック
  //1 -> 左クリック
  //2 -> はてな
  //3 -> 旗

  const [userInput, setUserInput] = useState<(0 | 1 | 2 | 3 | 11)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const bombCount = 10;
  // 0 -> ボムなし
  // 1 -> ボム有
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  //ゲーム開始
  const isPlaying = userInput.some((row) => row.some((input) => input !== 0));

  // -1 -> 石
  // 0 -> 画像なしセル
  // 1~8 -> 数字セル
  // 9 -> 石＋はてな
  // 10 -> 石＋旗
  // 11 -> ボムセル
  const board: number[][] = Array.from({ length: 9 });

  //8方向辞書
  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];

  //for (){
  //board + directions + userInput +

  // ボムの数をカウント
  const countBombsAround = (x: number, y: number) => {
    let count = 0;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // セルの範囲チェック
      if (newX >= 0 && newX < userInput[0].length && newY >= 0 && newY < userInput.length) {
        // ボムセルか判定
        if (bombMap[newY][newX] === 11) {
          count++;
        }
      }
    }

    return count;
  };

  const isStarted = () => {
    const bombCount = 10;
    // ボムマップを初期化
    const updatedBombMap = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));

    // ボムを配置
    let bombsPlaced = 0;
    while (bombsPlaced < bombCount) {
      const bombX = Math.floor(Math.random() * 9);
      const bombY = Math.floor(Math.random() * 9);

      // ボムが既に配置されていないかをチェック
      if (updatedBombMap[bombY][bombX] !== 11) {
        updatedBombMap[bombY][bombX] = 11;
        bombsPlaced++;
      }
    }

    // bombMapを更新
    setBombMap(updatedBombMap);
  };

  const onClick = (x: number, y: number) => {
    if (userInput[y][x] !== 0) return; // 既に開かれたセルをクリックした場合はなにもしない

    // 最初のクリックの場合のみボムマップを生成
    if (!isPlaying) {
      isStarted();
    }

    // ボムがあるセルをクリックしたか判断
    if (bombMap[y][x] === 11) {
      // ゲームオーバーの処理を実行
      console.log('Game Over');
      setUserInput((prev) => {
        const newInput = [...prev];
        newInput[y][x] = 11;
        return newInput;
      });
      return;
    }

    // ボムがないセルなので周囲のボムの数を計算
    const count = countBombsAround(x, y);
    if (count === 0) {
      addZeroAroundZero(x, y);
    }
    // ユーザー入力にボムの数を設定
    setUserInput((prev) => {
      const newInput = [...prev];
      newInput[y][x] = (count + 1) as 0 | 1 | 2 | 3 | 11;
      return newInput;
    });
  };

  const addZeroAroundZero = (x: number, y: number) => {
    setUserInput((prev) => {
      const newInput = [...prev];
      newInput[y][x] = 1;
      return newInput;
    });

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < 9 &&
          ny >= 0 &&
          ny < 9 &&
          userInput[ny][nx] === 0 &&
          countBombsAround(nx, ny) === 0
        ) {
          addZeroAroundZero(nx, ny);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {userInput.map((row, y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {cell !== 0 &&
                (cell === 1 ? <div className={styles.stone} /> : <div>{cell - 1}</div>)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
