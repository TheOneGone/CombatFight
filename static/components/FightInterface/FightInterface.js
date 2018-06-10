class FightInterface {
    constructor (fightDiv, fighter, startFightCallback, submitTurnCallback, gameEndedCallback) {
        let statusPnl = document.createElement("div");
        let userText = document.createElement("span");
        userText.innerText = fighter.userName + ":" + fighter.health;
        let enemyText = document.createElement("span");
        statusPnl.appendChild(userText);
        statusPnl.appendChild(enemyText);

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
            fightDiv.innerHTML = "";
            fightDiv.appendChild(loader);
            submitTurnCallback (submitData, (status) => {
                fightDiv.innerHTML = "";               
                if (status.type == "finished") {
                    gameEndedCallback();
                    winnerText.innerText = status.winner.userName + " won!";
                    fightDiv.appendChild(gameFinishedDiv);
                    return;
                }
                userText.innerText = status.user.userName + ":" + status.user.health;
                enemyText.innerText = status.enemy.userName + ":" + status.enemy.health;
                fightDiv.appendChild(fightFormDiv);
            });
        });

        function startNewFight(){
            fightDiv.innerHTML = "";
            fightDiv.appendChild(loader);
            startFightCallback(fighter, (status) => {
                fightFormInterface.reset();
                userText.innerText = status.user.userName + ":" + status.user.health;
                enemyText.innerText = status.enemy.userName + ":" + status.enemy.health;
                fightDiv.innerHTML = "";
                fightDiv.appendChild(fightFormDiv);
            });
        }

        startNewGameButton.onclick = startNewFight;

        startFightButton.onclick = startNewFight;
    }
}