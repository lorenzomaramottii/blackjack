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

const addPlayer = () => {
    //add player to players
    if (players.length < MAX_PLAYERS){
        players.push({
            id: idCounter,
            name: "Guest" + (players.length + 1),
            credits: START_VALUE,
            playingStatus: false,
            plays: []
        })
        idCounter++
        console.log(players)
    } else {
        console.log("Reach max number of players")
    }
}

const changeName = () => {
    //change players' name
}

const changePlayerStatus = () => {
    
}

const deletePlayer = () => {
    
}