import { useState } from 'react';
import styles from './index.module.css';
import { count } from 'console';

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


  let zeroList: { x: number; y: number }[] = []; //bombMap[y][x] = 0の座標を全部入れたい
    //爆弾のないマスまとめ
  for () {
    zeroList = // board + directions + userInputs + bombMap
  } 
  let openedCount: number 
  //空いたマスの数(周囲に爆弾あるマスを含む)
  for () {
    openedCount = // board
  }
  const isSuccess =; // openedCount + bombCount = 81
  let isFailure: boolean = false;
  //タイマーを止める、上の顔を変更する
  for () {
    isFailure = // userInputs + bombMap
  }
  let isStarted : boolean = false;  //booleanはtrueとfalseしか入らない
  // クリックで値を切り替えてタイマーをスタートする
  for () {
    isStarted = // userInputs
  }


  // isFailure = true && isStarted = true => タイマーストップ + 画面上の爆弾全て表示 + 顔ボタン以外押せなく + 押してしまった爆弾の背景を赤く
  //以下が実装したい関数


  const addZeroAroundZero = (x:number, y:number) => {
    for (const [dx, dy] of directions){
      const newX = x + dx;
      const newY = y + dy;

      if(zeroList.find(element => element.x == newX) && zeroList.find(element => element.y == newY)){ //newXとxが一致している、yも同様
        //表示処理
        addZeroAroundZero(newX, newY);
      } 
    }
  } // 再帰関数 //隣接している0を全て開けたい

  // ボムの数をカウント
  const countBombsAround = (x: number, y: number) => {
    let count = 0;

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
    // isFailureがtrueなら終了
    if(isFailure === true){
      return;
    }
    userInput[y][x] = 1;
    if (isStarted === false){
      isStarted =true;

      // ボムを配置
      let bombsPlaced = 0;
      while (bombsPlaced < bombCount) {
        const bombx = Math.floor(Math.random() * 9);
        const bomby = Math.floor(Math.random() * 9);

        if (bombMap[bomby][bombx] === 0 && userInput[bomby][bombx] === 0){
          bombMap[bomby][bombx] = 1;
          bombsPlaced += 1;
        }
      }
      for(let tempy:number = 0; tempy < bombMap.length; tempy++){
        for (let tempx:number = 0; tempx < bombMap[tempy].length; tempx++){
          if (countBombsAround(tempx, tempy) === 0){
          zeroList.push({ x: tempx, y: tempx});
          //bombMap[y][x] = 0の座標を全部入れたい
          }
        }
     }

    if (userInput[y][x] === 1 && bombMap[y][x] === 1){
      for(const bomblist of bombMap){
        for (const bomb of bomblist){
          if (bomb === 1){
            // 爆弾表示
          }
        }
      }
      //顔変える、(タイマー止める(後回し))、クリックした爆弾の背景赤くする
      isFailure = true;
      return;
    }
    let aroundbomb = countBombsAround(x, y);
    if (aroundbomb === 0){
      addZeroAroundZero(x, y); //全部の隣接しているゼロを表示
    }else{
      userInput[y][x] = ;//押したところの数字を変更
    }

  }

  const reset = () => ...





  return (
    <div className={styles.container}>
      <div className={styles.board}></div>
      </div>)
}

export default Home;

