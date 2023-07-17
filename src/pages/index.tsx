import { Cell } from '../components/Cell';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { clickStone, userInput } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {userInput.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              cell={Number(cell)}
              key={`${x}-${y}`}
              x={Number(x)}
              y={Number(y)}
              clickStone={() => clickStone(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
