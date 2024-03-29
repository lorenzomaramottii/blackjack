const addPlayer = (position) => {
    //add player to players
    if (players.length <= MAX_PLAYERS){
        players[position] = {
            position: position,
            name: "Guest " + (position + 1),
            credits: START_VALUE,
            playingStatus: false,
            plays: []
        }
        document.getElementById(`p${position}`).innerHTML = 
        `
        <div class="card bg-transparent border-2" style="width: 250px; height: 250px; border-color:#FFFF00;">
            
            <div class="card-body text-center fw-bold" id=p${position}_body>
                <a onclick="startPlayer(${position})" class="btn btn-warning">Start Player</a>
            </div>
            <div class="card-footer text-center fw-bold">
                <img class = "small_image d-inline" src="images/pencil_real.png" onclick="changeName(${position})" alt="">
                <h5 class="card-title d-inline" id="p${position}_name">${players[position].name}</h5>
            </div>
            <div class="card-footer fw-bold">
                <div class="row">
                    <div class="col">
                    <small class="text-body-secondary">Credits: <span id="p${position}_cash">${players[position].credits}</span></small>
                    </div>
                    <div class="col">
                        <small class="text-body-secondary text-end">Last win: <span id="p${position}_win"></span></small>
                    </div>
                </div>
                <div class = "text-center">
                    <img class = "small_image " src ="images/trashCan.png" onclick = "deletePlayer(${position})"/>
                </div>
            </div>
          </div>
        `
    } else {
        console.log("Reach max number of players")
    }
}

const changeName = (playerId) => {
    let newName = prompt("inserisci nuovo nome")
    document.getElementById(`p${playerId}_name`).innerHTML = newName
    players[playerId].name = newName
}

const deletePlayer = (position) => {
    players[position] = {}
    document.getElementById(`p${position}`).innerHTML = `
        <div class="text-center">
            <h1 onclick="addPlayer(${position})">+</h1>
        </div>`
}

const checkPlayers = () => {
    console.log(players)
}