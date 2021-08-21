import Ball from "./Ball";
import { GUI } from "./GUI";
import Player from "./Player";

export default function Pong() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.hidden = false;

  let leftPlayer = new Player('left', canvas.width, canvas.height);
  let rightPlayer = new Player('right', canvas.width, canvas.height);
  let ball = new Ball(canvas.width, canvas.height);
  let gui = new GUI(canvas.width, canvas.height);

  document.addEventListener('keydown', (e) => {
    leftPlayer.keyDown(e.key, 'w', 's');
    rightPlayer.keyDown(e.key, 'ArrowUp', 'ArrowDown');
  });

  document.addEventListener('keyup', (e) => {
    leftPlayer.keyUp(e.key, 'w', 's');
    rightPlayer.keyUp(e.key, 'ArrowUp', 'ArrowDown');
  });

  let start = new Date().getTime();

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let deltaTime = (new Date().getTime() - start) / 1000;

    leftPlayer.draw(ctx, 'white');
    leftPlayer.move(deltaTime);
    
    rightPlayer.draw(ctx, 'white');
    rightPlayer.move(deltaTime);

    ball.draw(ctx);
    ball.leftPlayerCollision(leftPlayer.get());
    ball.rightPlayerCollision(rightPlayer.get());

    gui.raiseScore(ball.move(deltaTime))
    gui.draw(ctx);

    start = new Date().getTime();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}