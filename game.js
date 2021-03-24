/*
Add your code for Game here
 */
export default class Game
{
    constructor(size)
    {
        this.size = size;
        this.board = new Array(size);
        this.onwin = [];
        this.onlose = [];
        this.onmove = [];
        for(var i=0; i<size; i++)
        {
            this.board[i] = new Array(size);
        }
        this.gameState = {
            board: new Array(size * size).fill(0),
            score: 0,
            won: false,
            over: false,
        };
        this.setupNewGame();
    }
    loadGame(gstate)
    {
        this.gameState = gstate;
        var index = 0;
        for(var i=0; i<this.size; i++)
        {
            for(var j=0; j<this.size; j++)
            {
                this.board[i][j] = this.gameState.board[index];
                index++;
            }
        }
    }
    setupNewGame()
    {
        for(var i=0; i<this.size; i++)
        {
            for(var j=0; j<this.size; j++)
            {
                this.board[i][j] = 0;
            }
        }
        this.addTile();
        this.addTile();
    }
    addTile()
    {
        var coordinate = this.coord();
        while(this.board[coordinate['x']][coordinate['y']] != 0)
        {
            coordinate = this.coord();
        }
        var x = 2;
        var r = Math.floor(Math.random() * 100) + 1;
        if(r>=90)
        {
            x = 4;
        }
        this.board[coordinate['x']][coordinate['y']] = x;
        this.gameState.board = this.board.flat();
    }
    coord()
    {
        var x = Math.floor(Math.random() * (this.size));
        var y = Math.floor(Math.random() * (this.size));
        return {x, y};
    }
    move(direction)
    {
        if(direction === "up")
        {
            this.shift(-1, true);
        }
        if(direction === "down")
        {
            this.shift(1, true);
        }
        if(direction === "left")
        {
            this.shift(-1, false);
        }
        if(direction === "right")
        {
            this.shift(1, false);
        }
        this.gameState.board = this.board.flat();
        for(var i=0; i<this.onmove; i++)
        {
            this.onmove[i](this.gameState);
        }
        this.checkWin();
        this.checkLose();
    }
    checkWin()
    {
        for(var i=0; i<this.size * this.size; i++)
        {
            if(this.gameState.board[i] == 2048)
            {
                this.gameState.won = true;
                for(var j =0; j<this.onwin; i++)
                {
                    this.onwin[i](this.gameState);
                }
                break;
            }
        }
    }
    checkLose()
    {
        var count =0;
        for(var i=0; i<this.size * this.size; i++)
        {
            if(this.gameState.board[i] == 0)
            {
                count++;
            }
        }
        if(count == 0)
        {
            for(var j =0; j<this.onlose; i++)
                {
                    this.onlose[i](this.gameState);
                }
        }
    }
    shift(val, bool)
    {
        if(bool)
        {
            if(val == -1)
            {
                for(var i =0; i<this.size; i++)
                {
                    for(var j=0; j<this.size; j++)
                    {
                        if(this.board[i][j] == 0)continue;
                        var o = i;
                        var id = o + val;
                        while(id >= 0 && id < this.size && this.board[id][j] == 0)
                        {
                            this.board[id][j] = this.board[o][j];
                            this.board[o][j] = 0;
                            o = id;
                            id = (o + val);
                        }
                        if(id >= 0 && this.board[id][j] == this.board[o][j])
                        {
                            this.board[o][j] = 0;
                            this.board[id][j] *= 2;
                            this.gameState.score += this.board[id][j];
                        }
                    }
                }
                for(var i =0; i<this.size; i++)
                {
                    for(var j=this.size-1; j>0; j--)
                    {
                        if(this.board[j][i] == this.board[j-1][i])
                        {
                            this.board[j-1][i] *=2;
                            this.board[j][i] = 0;
                            j--;
                        }
                    }
                }  
            
            }
            else
            {
            for(var i =this.size-1; i>=0; i--)
            {
                for(var j=0; j<this.size; j++)
                {
                    if(this.board[i][j] == 0)continue;
                    var o = i;
                    var id = o + val;
                    while(id >= 0 && id < this.size && this.board[id][j] == 0)
                    {
                        this.board[id][j] = this.board[o][j];
                        this.board[o][j] = 0;
                        o = id;
                        id = (o + val);
                    }
                    if(id <this.size && this.board[id][j] == this.board[o][j])
                        {
                            this.board[o][j] = 0;
                            this.board[id][j] *= 2;
                            this.gameState.score += this.board[id][j];
                        }
                }
            }
            for(var i =0; i<this.size; i++)
                {
                    for(var j=0; j<this.size-1; j++)
                    {
                        if(this.board[j][i] == this.board[j+1][i])
                        {
                            this.board[j+1][i] *=2;
                            this.board[j][i] = 0;
                            j++;
                        }
                    }
                }  
            }
            
        }
        else
        {
            if(val == 1)
            {
                for(var i =0; i<this.size; i++)
                {
                    for(var j=this.size-1; j>=0; j--)
                    {
                        if(this.board[i][j] == 0){
                            continue;
                        }
                        var o = j;
                        var id = o + val;
                        while(id >= 0 && id < this.size && this.board[i][id] == 0)
                        {
                            this.board[i][id] = this.board[i][o];
                            this.board[i][o] = 0;
                            o = id;
                            id = (o + val);
                        }
                        if(id <this.size && this.board[i][id] == this.board[i][o])
                        {
                            this.board[i][o] = 0;
                            this.board[i][id] *= 2;
                            this.gameState.score += this.board[id][j];
                        }
                    }
                }
                for(var i =0; i<this.size; i++)
            {
                for(var j=0; j<this.size-1; j++)
                {
                    if(this.board[i][j] == this.board[i][j+1])
                    {
                        this.board[i][j+1] *=2;
                        this.board[i][j] = 0;
                        j++;
                    }
                }
            }
            }
            else
            {
            for(var i =0; i<this.size; i++)
            {
                for(var j=0; j<this.size; j++)
                {
                    if(this.board[i][j] == 0){
                        continue;
                    }
                    var o = j;
                    var id = o + val;
                    while(id >= 0 && id < this.size && this.board[i][id] == 0)
                    {
                        this.board[i][id] = this.board[i][o];
                        this.board[i][o] = 0;
                        o = id;
                        id = (o + val);
                    }
                }
            }
            for(var i =0; i<this.size; i++)
            {
                for(var j=this.size-1; j>0; j--)
                {
                    if(this.board[i][j] == this.board[i][j-1])
                    {
                        this.board[i][j-1] *=2;
                        this.board[i][j] = 0;
                        j--;
                    }
                }
            }

            }
        }
    }
    getGameState()
    {
        return this.gameState;
    }
    onLose(callback)
    {
        this.onlose.push(callback);
    }
    onWin(callback)
    {
        this.onwin.push(callback);
    }
    onMove(callback)
    {
        this.onmove.push(callback);
    }
}