function SnakeGame(gW, gH, tS)
{
  this.gridWdt = gW;  
  this.gridHgt = gH;
  this.tileSz = tS;

  this.player = {pos: {x: 5, y: 3}, vel: {x: 0, y: 0}, len: 1, segs: []};
  this.foodPos = {x: 6, y: 12};
  this.cmd_q = [];
}

SnakeGame.prototype.reset = function()
{
  this.player = {pos: {x: 5, y: 3}, vel: {x: 0, y: 0}, len: 1, segs: []};
  this.foodPos.x = Math.floor(Math.random()*this.gridWdt);
  this.foodPos.y = Math.floor(Math.random()*this.gridHgt);
  this.cmd_q = [];
} // reset()

SnakeGame.prototype.update = function()
{
  let scoreChange = 0;

  // take input from command queue if needed
  if(this.cmd_q.length > 0)
  {
    var nv = this.cmd_q.shift();
    this.player.vel.x = nv.x;
    this.player.vel.y = nv.y;
  }

  // calculate new position of head, with board wrapping
  this.player.pos.x = (this.player.pos.x + this.player.vel.x) % this.gridWdt;
  this.player.pos.y = (this.player.pos.y + this.player.vel.y) % this.gridHgt;
  if(this.player.pos.x < 0) this.player.pos.x += this.gridWdt;
  if(this.player.pos.y < 0) this.player.pos.y += this.gridHgt;

  // check head collision with self
  for(var i=0; i<this.player.segs.length; i++)
  {
    var cur_seg = this.player.segs[i];
    if(this.player.pos.x === cur_seg.x &&
        this.player.pos.y === cur_seg.y &&
        this.player.len > 1)
    {
      scoreChange = -1;
    } // if our head is on a seg and the head isn't the same seg
  }

  // check head collision with food
  if(this.player.pos.x === this.foodPos.x &&
      this.player.pos.y === this.foodPos.y)
  {
    this.player.len++;
    this.foodPos.x = Math.floor(Math.random()*this.gridWdt);
    this.foodPos.y = Math.floor(Math.random()*this.gridHgt);
    scoreChange = 10;
  }
  else
  {
    this.player.segs.shift();
  }

  // push new segment for head
  this.player.segs.push({x: this.player.pos.x, y: this.player.pos.y});

  return scoreChange;
} // update()

SnakeGame.prototype.draw = function(ctx)
{
  // bg grid
  for(var y=0; y<this.gridHgt; y++)
  {
    for(var x=0; x<this.gridWdt; x++)
    {
      ctx.fillStyle = colors.gray;
      ctx.fillRect(x*this.tileSz, y*this.tileSz, 
        this.tileSz-2, this.tileSz-2);
    }
  }

  // draw snake
  ctx.fillStyle = colors.magenta;
  for(var i=0; i<this.player.segs.length; i++)
  {
    var cur_seg = this.player.segs[i];
    ctx.fillRect(cur_seg.x*this.tileSz,
                  cur_seg.y*this.tileSz,
                  this.tileSz-2, this.tileSz-2);
  }

  //draw food
  ctx.fillStyle="red";
  ctx.fillRect(this.foodPos.x*this.tileSz, 
                this.foodPos.y*this.tileSz, 
                this.tileSz-2, this.tileSz-2);
} // draw()

SnakeGame.prototype.handleInput = function(evt)
{
  let btn = evt.key;
  if(btn === "ArrowLeft" || btn === "a")
  {
    if(this.player.vel.x !== 1) 
    {
      this.cmd_q.push({x:-1,y:0});
    }
  }
  else if(btn === "ArrowUp" || btn === "w")
  {
    if(this.player.vel.y !== 1) 
    {
      this.cmd_q.push({x:0,y:-1});
    }
  }
  else if(btn === "ArrowRight" || btn === "d")
  {
    if(this.player.vel.x !== -1) 
    {
      this.cmd_q.push({x:1,y:0});
    }
  }
  else if(btn === "ArrowDown" || btn === "s")
  {
    if(this.player.vel.y !== -1) 
    {
      this.cmd_q.push({x:0,y:1});
    }
  }
} // handleInput()