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
  blue: "#78c3ef"
}
let score = 0;
let state = "PLAYING";


function init()
{
  canv = document.getElementById("game");
  ctx = canv.getContext("2d");
  ctx.font = "30px Lucida Console";
  ctx.textAlign = "center";

  document.addEventListener("keydown", keyPush);
  
  gameSignal = setInterval(update, 1000/15);
} // init()

function reset()
{
  score = 0;
} // reset

function update()
{
  if(STATE === "PLAYING")
  {

  }
  else if(STATE === "LOSS")
  {

  }

  draw();
} // update()

function draw()
{
  // draw Bg
  ctx.fillStyle = colors.lime;
  ctx.fillRect(0, 0, 440, 440);

  // draw SnakeGame
  ctx.fillStyle = colors.magenta;
  ctx.fillRect(0, 80, 200, 360);

  // draw TetrisGame
  ctx.fillStyle = colors.pink;
  ctx.fillRect(240, 80, 200, 360);

  // draw Score
  ctx.fillStyle = colors.blue;
  ctx.fillText("Hello World", canv.width / 2, 50);
} // draw()

function keyPush(evt)
{

} // keyPush()