function TetrisGame(gW, gH, tS)
{
  this.gridWdt = gW;  
  this.gridHgt = gH;
  this.tileSz = tS;

  this.inert = [];
  for(var y=0; y<this.gridHgt; y++)
  {
    this.inert[y] = [];
    for(var x=0; x<this.gridWdt; x++)
    {
      this.inert[y][x] = ' ';
    }
  }

  this.pieceType = 0;
  this.pieceRot = 0;
  this.pieceX = 3;
  this.pieceY = 0;

  this.newSeq();
  this.newPiece();
}

TetrisGame.prototype.reset = function()
{
  for(var y=0; y<this.gridHgt; y++)
  {
    for(var x=0; x<this.gridWdt; x++)
    {
      this.inert[y][x] = ' ';
    }
  }

  this.newSeq();
  this.newPiece();
} // reset()

TetrisGame.prototype.newPiece = function()
{
  this.pieceX = 3;
  this.pieceY = 0;
  this.pieceRot = 0;

  this.pieceType = this.sequence.pop();
  if(this.sequence.length === 0)
  {
    this.newSeq();
  }
} // newPiece()

TetrisGame.prototype.newSeq = function()
{
  let seq = [0, 1, 2, 3, 4, 5, 6]; // n=7

  for(var i=0; i<5; i++)
  {
    let j = Math.floor(Math.random() * (7-i)) + i;
    let t = seq[j];
    seq[j] = seq[i];
    seq[i] = t;
  } // bottom-up Fisher-Yates

  this.sequence = seq;
} // newSeq()

TetrisGame.prototype.update = function()
{
  let scoreChange = 0;

  let testY = this.pieceY + 1;
  if(this.canPieceMove(this.pieceX, testY, this.pieceRot))
  {
    this.pieceY = testY;
  } // piece can fall
  else
  {
    // stamp block into inert grid
    for(var y=0; y<4; y++)
    {
      for(var x=0; x<4; x++)
      {
        let block = pieceStructures[this.pieceType][this.pieceRot][y][x];
        if(block !== ' ')
        {
          this.inert[this.pieceY + y][this.pieceX + x] = block; 
        }
      }
    }

    // scan top (0) to bottom (gridHgt) for filled rows
    for(var y=0; y<this.gridHgt; y++)
    {
      if(this.isRowFilled(y))
      {
        this.shiftBoardDownFrom(y);
        scoreChange += 10;
      }
    }

    this.newPiece();
    if(!this.canPieceMove(this.pieceX, this.pieceY, this.pieceRot))
      scoreChange = -1;
  } // piece hits ground

  return scoreChange;
} // update()

TetrisGame.prototype.isRowFilled = function(row)
{
  for(var x=0; x<this.gridWdt; x++)
  {
    if(this.inert[row][x] === ' ')
      return false;
  }
  return true;
} // isRowFilled()

TetrisGame.prototype.shiftBoardDownFrom = function(row)
{
  // scans from bottom (row) to 2nd-to-top row (1)
  for(var y=row; y>1; y--)
  {
    for(var x=0; x<this.gridWdt; x++)
    {
      this.inert[y][x] = this.inert[y-1][x];
    } // row y-1 is copied down onto row y
  }

  for(var x=0; x<this.gridWdt; x++)
  {
    this.inert[0][x] = ' ';
  } // when top row (0) is copied onto row 1, it should not be replaced
} // shiftBoardDownFrom()

TetrisGame.prototype.canPieceMove = function(testX, testY, testRot)
{
  let orientation = pieceStructures[this.pieceType][testRot];
  for(var y=0; y<4; y++)
  {
    for(var x=0; x<4; x++)
    {      
      let testXLoc = testX + x;
      let testYLoc = testY + y;

      if((orientation[y][x] !== ' ') && (  (testXLoc < 0) || 
                          (testXLoc >= this.gridWdt) || 
                          (testYLoc >= this.gridHgt) || 
                          (this.inert[testYLoc][testXLoc] !== ' ')  ))
      {
        return false;
      }
    }
  }

  return true;
} // canPieceMove()

TetrisGame.prototype.draw = function(ctx)
{
  // draw inert blocks
  for(var y=0; y<this.gridHgt; y++)
  {
    for(var x=0; x<this.gridWdt; x++)
    {
      let block = this.inert[y][x]
      this.drawBlock(block, x, y);
    }
  }

  // draw current block
  for(var y=0; y<4; y++)
  {
    for(var x=0; x<4; x++)
    {
      let block = pieceStructures[this.pieceType][this.pieceRot][y][x];
      if(block !== ' ')
      {
        this.drawBlock(block, x + this.pieceX, y + this.pieceY);
      }
      
    }
  }
} // draw()

TetrisGame.prototype.drawBlock = function(block, x, y)
{
  ctx.fillStyle = colormap[block];
  ctx.fillRect(x*this.tileSz, y*this.tileSz, 
                this.tileSz-2, this.tileSz-2);
} // drawBlock()


TetrisGame.prototype.handleInput = function(evt)
{
  let btn = evt.key;
  if(btn === "ArrowLeft" || btn === "a")
  {
    let testX = this.pieceX - 1;
    if(this.canPieceMove(testX, this.pieceY, this.pieceRot))
    {
      this.pieceX = testX;
    }
  }
  else if(btn === "ArrowUp" || btn === "w")
  {
    let testRot = (this.pieceRot-1) % pieceStructures[this.pieceType].length;
    if(testRot < 0)
      testRot += pieceStructures[this.pieceType].length;
    
    if(this.canPieceMove(this.pieceX, this.pieceY, testRot))
    {
      this.pieceRot = testRot;
    }
  }
  else if(btn === "ArrowRight" || btn === "d")
  {
    let testX = this.pieceX + 1;
    if(this.canPieceMove(testX, this.pieceY, this.pieceRot))
    {
      this.pieceX = testX;
    }
  }
  else if(btn === "ArrowDown" || btn === "s")
  {
    let testRot = (this.pieceRot+1) % pieceStructures[this.pieceType].length;
    
    if(this.canPieceMove(this.pieceX, this.pieceY, testRot))
    {
      this.pieceRot = testRot;
    }
  }
} // handleInput()