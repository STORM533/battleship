import "./styles/styles.css";
import {GameController} from './gameController';
import { init } from './dom';

document.addEventListener('DOMContentLoaded', () => {
    const game = GameController();
    init(game);
});