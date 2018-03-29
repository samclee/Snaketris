// main.js

let canv = null;
let ctx = null;
let gameSignal = null;
let colors = {
  lime: "#a9dd76",
  pink: "#f893c4",
  magenta: "#d388ec",
  orange: "#eab179",
  teal: "#7cdac1",
  yellow: "#ece76c",
  blue: "#78c3ef",
  gray: "#efefef"
}
let score = 0;
let state = "PLAYING";

let sg = null;
let tg = null;

function init()
{
  canv = document.getElementById("game");
  ctx = canv.getContext("2d");
  ctx.font = "30px Lucida Console";
  ctx.textAlign = "center";

  sg = new SnakeGame(10, 18, 20);
  tg = new TetrisGame(10, 18, 20)

  document.addEventListener("keydown", keyPush);
  
  gameSignal = setInterval(update, 1000/8);
} // init()

function reset()
{
  score = 0;
  sg.reset();
  tg.reset();
  state = "PLAYING";
} // reset

function update()
{
  let scoreChange = 0;

  if(state === "PLAYING")
  {
    sg.update();
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

  if(state === "LOSS")
    ctx.globalAlpha = 0.5;
  else
    ctx.globalAlpha = 1;

  // draw Bg
  ctx.fillStyle = colors.lime;
  ctx.fillRect(0, 0, canv.width, canv.height);

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
} // draw()

function keyPush(evt)
{
  evt.preventDefault();
  if(state === "LOSS")
  {
    reset();
  }
  else
  {
    sg.handleInput(evt);
    tg.handleInput(evt);
  }
} // keyPush()