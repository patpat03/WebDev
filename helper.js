import Game from "./game.js"
$(function(){
    let g = new Game(4);
    render(g);
    $(document).on('keydown', function(code) {
        code.preventDefault();
        if(code.keyCode == '38')
        {
            g.move("up");
            g.addTile();
            render(g);
        }
        if(code.keyCode == '37')
        {
            g.move("left");
            g.addTile();
            render(g);
        }
        if(code.keyCode == '39')
        {
            g.move("right");
            g.addTile();
            render(g);
        }
        if(code.keyCode == '40')
        {
            g.move("down");
            g.addTile();
            render(g);
        }
    });
});
export const render = function(game){
    const $root = $('body');
    let board = "<div class = board>"
    for(var i=0; i<game.size; i++)
    {
        board += "<div class = row>"
        for(var j=0; j<game.size; j++)
        {
            if(game.board[i][j] == 0)
            {
                board += `<div class = square></div>`
            }
            else{
                board += `<div class = square>${game.board[i][j]}</div>`
            }
        }
        board+="</div>"
    }
    board+="</div>"
    $root.html(board);
}