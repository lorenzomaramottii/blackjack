const players = []

const START_VALUE = 1000

const MIN_START_VALUE = 10

const MAX_PLAYERS = 4

let idCounter = 0
/*
player= {
    id,
    name,
    credits,
    playingStatus,
    plays
}
*/


const addPlayer = (position) => {
    //add player to players
    if (players.length < MAX_PLAYERS){
        players.push({
            id: idCounter,
            name: "Guest" + (idCounter + 1),
            credits: START_VALUE,
            playingStatus: false,
            plays: []
        })
        console.log(players)
        document.getElementById(`p${position}`).innerHTML = `
            <div class="plays">
            </div>

            <div class = "bottom">
                <div class="buttons">
                    <button id="hit">Hit</button>
                    <button id="stand">Stand</button>
                </div>
                <div class="info">
                    <img class = "small_image" src="matitina.png" onclick="changeName(${idCounter})" alt=""><span id="p${idCounter}_name">Player ${position + 1}</span><br>
                    <span id = "p${idCounter}_cash">CASH: </span><br>
                    <span id = "p${idCounter}_win">LAST WIN: </span><br>
                    <img class = "bottomLeft" src ="inter.png" onclick = "deletePlayer(${position}, ${idCounter})"/>
                </div>
            </div>
        `
        idCounter++
    } else {
        console.log("Reach max number of players")
    }
}

const changeName = (playerId) => {
    let newName = prompt("inserisci nuovo nome")
    document.getElementById(`p${playerId}_name`).innerHTML = newName
}

const changePlayerStatus = () => {
    
}

const deletePlayer = (position, playerId) => {
    console.log(players)
    for (let i = 0; i<players.length; i++){
        if(players[i].id === playerId){
            players.splice(i, 1)
            break
        }
    }
    document.getElementById(`p${position}`).innerHTML = `<span onclick="addPlayer(0)">+</span>`
}

const tester = () => {
    console.log(players)
}