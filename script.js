const game = (() => {
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const currentPlayer = "X";
    
    return {board,currentPlayer}
})();

const player = (playerName) => {
    const takeTurn = (row,column) => {
        if (game.board[row-1][column-1] == "") {
            game.board[row-1][column-1] = game.currentPlayer;
            game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
            console.log(game.board);
        }
        else {
            alert("This cell already has been selected, choose another one")
        }
    }
    return {playerName, takeTurn}
}


