import { useState } from 'react';
import styles from '../components/cell.module.css';

export const useGame = () => {
  const [userInput] = useState<(0 | 1 | 2 | 3 | 11)[][]>([
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
  const [bombMap] = useState([
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

  // -1 -> 石
  // 0 -> 画像なしセル
  // 1~8 -> 数字セル
  // 9 -> 石＋はてな
  // 10 -> 石＋旗
  // 11 -> ボムセル

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

  const zeroList: { x: number; y: number }[] = []; //隣接する爆弾が0のマスのリスト
  //爆弾のないマスまとめ
  // for () {
  //   zeroList = // board + directions + userInputs + bombMap
  // }
  // let openedCount: number
  // //空いたマスの数(周囲に爆弾あるマスを含む)
  // for () {
  //   openedCount = // board
  // }
  // const isSuccess =; // openedCount + bombCount = 81
  let isFailure = false;
  // //タイマーを止める、上の顔を変更する
  // for () {
  //   isFailure = // userInputs + bombMap
  // }
  let isStarted = false; //booleanはtrueとfalseしか入らない
  // クリックで値を切り替えてタイマーをスタートする
  // for () {
  //   isStarted = // userInputs

  // isFailure = true && isStarted = true => タイマーストップ + 画面上の爆弾全て表示 + 顔ボタン以外押せなく + 押してしまった爆弾の背景を赤く
  //以下が実装したい関数

  const addZeroAroundZero = (x: number, y: number) => {
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 9 || newY >= 9 || newX < 0 || newY < 0) {
        continue;
      }

      // 対応するHTML要素を取得
      const kakikukeko = document.getElementById(`${newX}-${newY}`);

      for (let i = 0; i < zeroList.length; i++) {
        if (newX === zeroList[i].x && newY === zeroList[i].y) {
          zeroList.splice(i, 1);
          userInput[newY][newX] = 1;

          // null チェックを行う
          if (kakikukeko) {
            kakikukeko.classList.remove(styles.stonepanel);
            addZeroAroundZero(newX, newY);
          }
          break;
        }
      }

      if (userInput[newY][newX] === 0) {
        const aroundbomb = countBombsAround(newX, newY);

        // null チェックを行い、処理をスキップしない
        if (kakikukeko) {
          kakikukeko.classList.remove(styles.stonepanel);
          kakikukeko.classList.add(styles.stone);
          kakikukeko.style.position = 'relative';
          kakikukeko.style.left = `${(aroundbomb - 1) * -30}px`;
          kakikukeko.style.clipPath = `inset(0 0 0 ${(aroundbomb - 1) * 30}px)`;
          kakikukeko.style.width = `${aroundbomb * 30}px`;
        }
      }
    }
  };
  // ボムの数をカウント
  const countBombsAround = (x: number, y: number) => {
    let count = 0;

    if (bombMap[y][x] === 1) {
      return 11;
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // セルの範囲チェック
      if (newX >= 0 && newX < userInput[0].length && newY >= 0 && newY < userInput.length) {
        // ボムセルか判定
        if (bombMap[newY][newX] === 1) {
          count++;
        }
      }
    }
    return count;
  };

  const clickStone = (x: number, y: number) => {
    console.log(x, y);
    if (userInput[y][x] !== 0) {
      return;
    }
    // isFailureがtrueなら終了
    if (isFailure === true) {
      return;
    }
    userInput[y][x] = 1;
    if (isStarted === false) {
      isStarted = true;

      // ボムを配置
      let bombsPlaced = 0;
      while (bombsPlaced < bombCount) {
        const bombx = Math.floor(Math.random() * 9);
        const bomby = Math.floor(Math.random() * 9);

        if (bombMap[bomby][bombx] === 0 && bomby !== y && bombx !== x) {
          bombMap[bomby][bombx] = 1;
          bombsPlaced += 1;
        }
      }
      for (let tempy = 0; tempy < bombMap.length; tempy++) {
        for (let tempx = 0; tempx < bombMap[tempy].length; tempx++) {
          if (countBombsAround(tempx, tempy) === 0) {
            zeroList.push({ x: tempx, y: tempy });
            //bombMap[y][x] = 0の座標を全部入れたい
          }
        }
      }
    }
    const aroundbomb = countBombsAround(x, y);
    window.alert(aroundbomb);
    const aiueo = document.getElementById(`${x}-${y}`);
    if (aroundbomb === 0) {
      addZeroAroundZero(x, y); //全部の隣接しているゼロを表示
    } else {
      if (aiueo) {
        aiueo.classList.remove(styles.stonepanel);
        aiueo.classList.add(styles.stone);
        aiueo.style.position = 'relative';
        aiueo.style.left = `${(aroundbomb - 1) * -30}px`;
        aiueo.style.clipPath = `inset(0 0 0 ${(aroundbomb - 1) * 30}px)`;
        aiueo.style.width = `${aroundbomb * 30}px`;
      }
    }
    if (bombMap[y][x] === 1) {
      for (let i = 0; i < bombMap.length; i++) {
        for (let s = 0; s < bombMap[i].length; s++) {
          if (bombMap[i][s] === 1) {
            // 爆弾表示
            const sasisuseso = document.getElementById(`${s}-${i}`);
            if (sasisuseso) {
              sasisuseso.classList.remove(styles.stonepanel);
              sasisuseso.classList.add(styles.stone);
              sasisuseso.style.position = 'relative';
              sasisuseso.style.left = `${(aroundbomb - 1) * -30}px`;
              sasisuseso.style.clipPath = `inset(0 0 0 ${(aroundbomb - 1) * 30}px)`;
              sasisuseso.style.width = `${aroundbomb * 30}px`;
            }
          }
        }
      }
      //顔変える、(タイマー止める(後回し))、クリックした爆弾の背景赤くする
      isFailure = true;
      if (aiueo) {
        aiueo.style.backgroundColor = 'red';
      }
      window.alert('bakuhatu');
      return;
    }
  };
  return { clickStone, userInput };
};
