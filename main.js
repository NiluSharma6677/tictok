let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container"); // Game container

let urlParams = new URLSearchParams(window.location.search);
let player1 = urlParams.get("player1") || "Player 1";
let player2 = urlParams.get("player2") || "Player 2";
let turnO = urlParams.get("symbol") === "O"; // Player 1 ke symbol se turn decide hoga

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        box.disabled = true;
        checkWinner();
        turnO = !turnO; // Toggle turn
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    let winnerName = winner === "O" ? player1 : player2;
    msg.innerText = `🎉 Congratulations! Winner is ${winnerName} (${winner})`;
    msgcontainer.classList.remove("hide");

    // **Game board pura hide ho jayega**
    container.style.display = "none";  
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
};

const resetGame = () => {
    turnO = urlParams.get("symbol") === "O"; // Reset turn based on initial selection
    enableBoxes();
    msgcontainer.classList.add("hide");

    // **Game board vapis dikhayega**
    container.style.display = "block";  
};

// Event Listeners
newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
