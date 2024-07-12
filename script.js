const game = (() => {
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    let currentPlayer = "X";
    let gameActive = true;

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
                gameActive = false;
                return true;
            }
        }
        return false;
    }

    const boardIsFull = () => {
        for (const row of board) {
            for (const cell of row) {
                if (cell ==='') {
                    return false
                }
            }
        }
        gameActive = false;
        return true;
    }
    
    const display = (cell) => {
        if (!gameActive) return;

        const h2 = document.querySelector("h2");
        const row = parseInt(cell.getAttribute("data-row"));
        const col = parseInt(cell.getAttribute("data-col"));
        
        if (cell.textContent === "") {
            const currentPlayerObject = game.currentPlayer === "X" ? player1 : player2;
            const playerTurnText = currentPlayerObject.playerName === player1.playerName ? player2.playerName : player1.playerName;
            h2.textContent = `${playerTurnText}'s turn. Choose a cell!`
            cell.textContent = game.currentPlayer;
            cell.style.color = currentPlayerObject === player1 ? "blue" : "red";
            currentPlayerObject.takeTurn(row, col);
            if (game.checkWin()) {
                h2.textContent = `${currentPlayerObject.playerName} won.`;
                disableCells();
                createRestartBtn();
                updateScores(currentPlayerObject);
            }

            else if (boardIsFull()) {
                h2.textContent = "It's a Draw";
                disableCells();
                createRestartBtn();
            }
        }
    };

    const disableCells = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => cell.removeEventListener("click", cell.displayListener()));
    };
    
    const createRestartBtn = () => {
        const body = document.querySelector("body");
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Restart";
        resetBtn.addEventListener("click",() => init());
        body.appendChild(resetBtn);
    };

    const updateScores = (player) => {
        const p1Score = document.querySelector(".player1Score");
        
        const p2Score = document.querySelector(".player2Score");
        
        let player1Score = 0;
        let player2Score = 0;
        
        
        if (player === player1) {
            player1Score++;
            p1Score.textContent = player1Score;
        }
        
        else if (player === player2) {
            player2Score++;
            p2Score.textContent = player2Score;
        }
    }
    
    const updateLabel = () => {
        const p1Label = document.querySelector(".player1ScoreLabel");
        p1Label.textContent = player1.playerName +":";
        
        const p2Label = document.querySelector(".player2ScoreLabel");
        p2Label.textContent = player2.playerName + ":";
    }
    
    const init = () => {
        const h2 = document.querySelector("h2");
        const resetBtn = document.querySelector("button");
        h2.textContent = `${player1.playerName}, start by selecting a cell below!`;
        
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.displayListener = () => display(cell);
            cell.addEventListener("click", cell.displayListener);
            cell.textContent = "";
        });
        
        for(let row = 0; row < board.length; row++) {
            for(let col = 0; col < board[row].length; col++ ) {
                board[row][col] = "";
            }
        }
        
        gameActive = true;
        currentPlayer = "X";
        
        if(resetBtn) {
            resetBtn.remove();
        }

        updateLabel();
    };

    return {board,currentPlayer,boardIsFull,checkWin,display,init}
})()

const player = (playerName) => {
    const takeTurn = (row,column) => {
        if (!game.boardIsFull()){
            if (game.board[row-1][column-1] == "") {
                game.board[row-1][column-1] = game.currentPlayer;
                game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
            }
            else {
                alert("This cell already has been selected, choose another one")
            }
        }
        else if (game.boardIsFull()) {
            alert("No more space. It's a draw.")
        }
    }
    return {playerName, takeTurn}
}

let player1;
let player2;

let inputPlayer1 = document.querySelector("#player1");
let inputPlayer2 = document.querySelector("#player2");

inputPlayer1.addEventListener("input", (event) => {
    const player1InputName = event.target.value;
    player1 = player(player1InputName);
    game.init();
})

inputPlayer2.addEventListener("input", (event) => {
    const player2InputName = event.target.value;
    player2 = player(player2InputName);
    game.init();
})

