import styles from './cell.module.css';

export const Cell = (props: { cell: number; x: number; y: number; clickStone: () => void }) => {
  return (
    <div className={`${styles.cell} `} onClick={props.clickStone}>
      {props.cell !== 0 && <div id={`${props.x}-${props.y}`} />}
      {props.cell === 0 && <div id={`${props.x}-${props.y}`} className={styles.stonepanel} />}
    </div>
  );
};
