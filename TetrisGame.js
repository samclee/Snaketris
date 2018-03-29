function TetrisGame(gW, gH, tS)
{
  this.gridWdt = gW;  
  this.gridHgt = gH;
  this.tileSz = tS;
}

TetrisGame.prototype.reset = function()
{

} // reset()

TetrisGame.prototype.update = function()
{
  let scoreChange = 0;

  return scoreChange;
} // update()

TetrisGame.prototype.draw = function()
{
  ctx.fillStyle = colors.orange;
  ctx.fillRect(0, 0, 200, 360);
} // draw()

TetrisGame.prototype.handleInput = function(evt)
{
  let btn = evt.key;
  if(btn === "ArrowLeft" || btn === "a")
  {

  }
  else if(btn === "ArrowUp" || btn === "w")
  {

  }
  else if(btn === "ArrowRight" || btn === "d")
  {

  }
  else if(btn === "ArrowDown" || btn === "s")
  {

  }
} // handleInput()