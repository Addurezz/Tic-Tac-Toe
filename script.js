const game = (() => {
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    let currentPlayer = "X";

    const checkWin = () => {
        const winPatterns = [
            // Rows
            [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }],
            [{ r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }],
            [{ r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }],
            // Columns
            [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }],
            [{ r: 0, c: 1 }, { r: 1, c: 1 }, { r: 2, c: 1 }],
            [{ r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }],
            // Diagonals
            [{ r: 0, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 2 }],
            [{ r: 0, c: 2 }, { r: 1, c: 1 }, { r: 2, c: 0 }]
        ];
    
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a.r][a.c] && board[a.r][a.c] === board[b.r][b.c] && board[a.r][a.c] === board[c.r][c.c]) {
                return true;
            }
        }
        return false;
    }

    const boardIsFull = () => {
        for (const row of game.board) {
            for (const cell of row) {
                if (cell ==='') {
                    return false
                }
            }
        }
        return true;
    }
    
    return {board,currentPlayer,boardIsFull,checkWin}
})()

const player = (playerName) => {
    const takeTurn = (row,column) => {
        if (!game.boardIsFull()){
            if (game.board[row-1][column-1] == "") {
                game.board[row-1][column-1] = game.currentPlayer;
                game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
                if (game.checkWin()) {
                    return `${playerName} won.`
                }
            }
            else {
                alert("This cell already has been selected, choose another one")
            }
            console.log(game.board);
        }
        else if (game.boardIsFull()) {
            alert("No more space. It's a draw.")
        }
    }
    return {playerName, takeTurn}
}

const player1 = player("Timo");
const player2 = player("Wilhelm");

