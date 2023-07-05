import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  //0 -> 未クリック
  //1 -> 左クリック
  //2 -> はてな
  //3 -> 旗

  const [userInput, setUserInput] = useState<(0 | 1 | 2 | 3)[][]>([
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

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    // userInputを更新
    const updatedUserInput = [...userInput];
    updatedUserInput[y][x] = 1; // 左クリック設定
    setUserInput(updatedUserInput);

    // 最初のクリックの場合のみボムマップを設定
    if (userInput[y][x] === 0) {
      // ボムマップを初期化
      const updatedBombMap = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));

      // ボムの数
      const bombCount = 10;

      // ボムを配置
      let bombsPlaced = 0;
      while (bombsPlaced < bombCount) {
        const bombX = Math.floor(Math.random() * 9);
        const bombY = Math.floor(Math.random() * 9);

        // ボムが既に配置されていないかをチェック
        if (updatedBombMap[bombY][bombX] !== 11 && updatedUserInput[bombY][bombX] !== 1) {
          updatedBombMap[bombY][bombX] = 1;
          bombsPlaced++;
        }
      }

      // bombMapを更新
      setBombMap(updatedBombMap);
    }

    // ボムがあるセルをクリックしたか判定
    const isFailure = userInput[y][x] === 1 && bombMap[y][x] === 11;
    if (isFailure) {
      // ゲームオーバーの処理を実行
      console.log('Game Over');
      return;
    }

    // クリックされたセルが0の場合、周囲のセルを再帰的に開ける処理
    if (userInput[y][x] === 0) {
      // 関数の実装
      addZeroAroundZero(x, y);
    }
  };

  const addZeroAroundZero = (x: number, y: number) => {
    // 開いたセルの座標を設定
    const updatedUserInput = [...userInput];
    updatedUserInput[y][x] = 1;
    setUserInput(updatedUserInput);

    // 再帰的に周囲のセルを開ける処理を実行
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // セルの範囲チェック
      if (newX >= 0 && newX < userInput[0].length && newY >= 0 && newY < userInput.length) {
        // 既に開かれたセルはスキップ
        if (updatedUserInput[newY][newX] !== 0) {
          continue;
        }

        // クリックされたセルが0の場合、再帰的に周囲のセルを開ける
        if (userInput[y][x] === 0) {
          addZeroAroundZero(newX, newY);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {userInput.map((row, y) =>
          row.map((_, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {userInput[y][x] !== 0 && <div className={styles.stone} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
