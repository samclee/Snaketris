// main.js

let canv = null;
let ctx = null;
let gameSignal = null;

let score = 0;
let state = "PLAYING";

let sg = null;
let tg = null;

let bgSong = null;

function init()
{
  canv = document.getElementById("game");
  ctx = canv.getContext("2d");
  ctx.font = "30px Lucida Console";
  ctx.textAlign = "center";

  sg = new SnakeGame(10, 18, 20);
  tg = new TetrisGame(10, 18, 20)

  document.addEventListener("keydown", keyPush);
  
  gameSignal = setInterval(update, 1000/2);


  bgSong = new Audio("./assets/Square_up!.mp3");
  bgSong.loop = true;
  bgSong.play();
} // init()

function reset()
{
  score = 0;
  ctx.globalAlpha = 1;
  sg.reset();
  tg.reset();
  state = "PLAYING";
} // reset

function update()
{
  let scoreChange = 0;

  if(state === "PLAYING")
  {
    scoreChange += sg.update();
    scoreChange += tg.update();
  }
  else if(state === "LOSS")
  {

  }

  if(scoreChange < 0)
  {
    state = "LOSS";
  }
  else
  {
    score += scoreChange;
  }

  draw();
} // update()

function draw()
{
  let sgOffset = {x: 20, y: 100};
  let tgOffset = {x: 260, y: 100};

  ctx.clearRect(0, 0, canv.width, canv.height);

  // draw SnakeGame
  ctx.save();
  ctx.translate(sgOffset.x, sgOffset.y);
  sg.draw(ctx);
  ctx.restore();

  // draw TetrisGame
  ctx.save();
  ctx.translate(tgOffset.x, tgOffset.y);
  tg.draw(ctx);  
  ctx.restore();

  // draw Score
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, canv.width / 2, 50);

  if(state === "LOSS")
  {  
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillRect(240 - 470/2, 210, 470, 60);

    ctx.fillStyle = "white";
    ctx.fillText("Press Space to Play Again", canv.width / 2, 250);
    ctx.globalAlpha = 0.5;
  }
} // draw()

function keyPush(evt)
{
  evt.preventDefault();
  if(state === "LOSS" && evt.key === " ")
  {
    reset();
  }
  else
  {
    sg.handleInput(evt);
    tg.handleInput(evt);
  }
} // keyPush()