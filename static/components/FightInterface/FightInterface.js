class FightInterface {
    constructor (fightDiv, startFightCallback, submitTurnCallback, gameEndedCallback) {
        let statusPnl = document.createElement("div");
        let userText = document.createElement("span");
        let userBarHolder = document.createElement("div");
        let userBar = document.createElement("div");
        userBarHolder.classList.add("health-bar-holder");
        userBarHolder.appendChild(userBar);
        userBar.classList.add("health-bar");
        let enemyText = document.createElement("span");
        let enemyBarHolder = document.createElement("div");
        let enemyBar = document.createElement("div");
        enemyBar.classList.add("health-bar");
        enemyBarHolder.classList.add("health-bar-holder");
        enemyBarHolder.appendChild(enemyBar);
        statusPnl.appendChild(userText);
        statusPnl.appendChild(userBarHolder);
        statusPnl.appendChild(enemyText);
        statusPnl.appendChild(enemyBarHolder);

        let gameFinished = false;

        let inFight = document.createElement("div");
        let startFightButton = document.createElement("button");
        startFightButton.innerText = "Fight!";
        inFight.appendChild(startFightButton);

        let gameFinishedDiv = document.createElement("div");
        gameFinishedDiv.innerText = "Game Finished!";
        let winnerText = document.createElement("div");
        gameFinishedDiv.appendChild(winnerText);
        let startNewGameButton = document.createElement("button");
        startNewGameButton.innerText = "Start new game";
        gameFinishedDiv.appendChild(startNewGameButton);

        let loader = document.createElement("div");
        loader.innerText = "Loading...";

        let fightFormDiv = document.createElement("form");
        fightFormDiv.appendChild(statusPnl);

        fightDiv.appendChild(inFight);

        let radios = [
            {
                name: "hit",
                fields: {
                    "Head": 0,
                    "Body": 1,
                    "Torso": 2,
                    "Legs": 3
                }
            },
            {
                name: "block",
                fields: {
                    "Head, Body": 0,
                    "Body, Torso": 1,
                    "Torso, Legs": 2,
                    "Legs, Head": 3
                }
            }
        ];

        let fightFormInterface = new FightFormInterface(fightFormDiv, radios, {name: "Submit"}, (submitData) => {
            if (gameFinished) return;
            fightDiv.innerHTML = "";
            fightDiv.appendChild(loader);
            submitTurnCallback (submitData, (status) => {
                fightDiv.innerHTML = "";               
                if (status.type == "finished") {
                    gameEndedCallback();
                    gameFinished = true;

                    let winner = status.user.health <= 0 ? status.enemy : status.user;

                    winnerText.innerText = winner.username + " won!";
                    if(status.user.health == status.enemy.health) {
                        winnerText.innerText = "Tie!";
                    }
                    fightDiv.appendChild(gameFinishedDiv);
                    return;
                }
                userText.innerText = status.user.username;
                userBar.style.width = status.user.health / 30 * 100 + "%";
                enemyText.innerText = status.enemy.username;
                enemyBar.style.width = status.enemy.health / 30 * 100 + "%";
                fightDiv.appendChild(fightFormDiv);
            });
        });

        function startNewFight(){
            fightDiv.innerHTML = "";
            fightDiv.appendChild(loader);
            startFightCallback((status) => {
                gameFinished = false;
                fightFormInterface.reset();
                userText.innerText = status.user.username;
                userBar.style.width = status.user.health / 30 * 100 + "%";
                enemyText.innerText = status.enemy.username;
                enemyBar.style.width = status.enemy.health / 30 * 100 + "%";
                fightDiv.innerHTML = "";
                fightDiv.appendChild(fightFormDiv);
            });
        }

        startNewGameButton.onclick = startNewFight;

        startFightButton.onclick = startNewFight;
    }
}