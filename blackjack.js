const players = []

const START_VALUE = 1000

const MIN_START_VALUE = 10

const MAX_PLAYERS = 4

const IMAGE_FOLDER = "images"

const PHASES = {
    IDLE: "IDLE",
    BITTING: "BITTING",
    PLAYING: "PLAYING",
    FINISH: "FINISH"
}

let PLAYING_GAME = PHASES.IDLE

/*
player= {
    position,
    name,
    credits,
    playingStatus,
    plays
}
*/

const fishSet = (position, plays) => {
    return `
    <img class = "fiches_image" src="${IMAGE_FOLDER}/fiches/fiches_1.png" alt="" onclick="bet(${position}, ${plays}, 1)">
    <img class = "fiches_image" src="${IMAGE_FOLDER}/fiches/fiches_5.png" alt="" onclick="bet(${position}, ${plays}, 5)">
    <img class = "fiches_image" src="${IMAGE_FOLDER}/fiches/fiches_25.png" alt="" onclick="bet(${position}, ${plays}, 25)">
    <img class = "fiches_image" src="${IMAGE_FOLDER}/fiches/fiches_50.png" alt="" onclick="bet(${position}, ${plays}, 50)">
    <img class = "fiches_image" src="${IMAGE_FOLDER}/fiches/fiches_100.png" alt="" onclick="bet(${position}, ${plays}, 100)">
    <img class = "fiches_image" src="${IMAGE_FOLDER}/fiches/fiches_500.png" alt="" onclick="bet(${position}, ${plays}, 500)">
    `
}

const cards = [
    {name: "AC", value: 11},
    {name: "2C", value: 2},
    {name: "3C", value: 3},
    {name: "4C", value: 4},
    {name: "5C", value: 5},
    {name: "6C", value: 6},
    {name: "7C", value: 7},
    {name: "8C", value: 8},
    {name: "9C", value: 9},
    {name: "10C", value: 10},
    {name: "JC", value: 10},
    {name: "QC", value: 10},
    {name: "KC", value: 10},
    {name: "AD", value: 11},
    {name: "2D", value: 2},
    {name: "3D", value: 3},
    {name: "4D", value: 4},
    {name: "5D", value: 5},
    {name: "6D", value: 6},
    {name: "7D", value: 7},
    {name: "8D", value: 8},
    {name: "9D", value: 9},
    {name: "10D", value: 10},
    {name: "JD", value: 10},
    {name: "QD", value: 10},
    {name: "KD", value: 10},
    {name: "AH", value: 11},
    {name: "2H", value: 2},
    {name: "3H", value: 3},
    {name: "4H", value: 4},
    {name: "5H", value: 5},
    {name: "6H", value: 6},
    {name: "7H", value: 7},
    {name: "8H", value: 8},
    {name: "9H", value: 9},
    {name: "10H", value: 10},
    {name: "JH", value: 10},
    {name: "QH", value: 10},
    {name: "KH", value: 10},
    {name: "AS", value: 11},
    {name: "2S", value: 2},
    {name: "3S", value: 3},
    {name: "4S", value: 4},
    {name: "5S", value: 5},
    {name: "6S", value: 6},
    {name: "7S", value: 7},
    {name: "8S", value: 8},
    {name: "9S", value: 9},
    {name: "10S", value: 10},
    {name: "JS", value: 10},
    {name: "QS", value: 10},
    {name: "KS", value: 10},
]

let playingCards = cards.flatMap(el => [el, el, el, el, el, el])


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
        document.getElementById(`p${position}`).innerHTML = `
            <div class="plays" id = "p${position}_plays">
            </div>

            <div class = "bottom">
                <div class="buttons" id=p${position}_buttons>
                    <button onclick="startPlayer(${position})">startPlayer</button>
                </div>
                <div class="info">
                    <img class = "small_image" src="matitina.png" onclick="changeName(${position})" alt=""><span id="p${position}_name">${players[position].name}</span><br>
                    <span id = "p${position}_cash">CASH: ${players[position].credits}</span><br>
                    <span id = "p${position}_win">LAST WIN: </span><br>
                    <img class = "bottomLeft" src ="inter.png" onclick = "deletePlayer(${position})"/>
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
}

const changePlayerStatus = () => {
    
}

const deletePlayer = (position) => {
    players[position] = {}
    document.getElementById(`p${position}`).innerHTML = `<span onclick="addPlayer(${position})">+</span>`
}

const tester = () => {
    console.log(players)
}

const shuffle = () => {
    playingCards = cards.flatMap(el => [el, el, el, el, el, el])
}

const pickCard = () => {
    if (playingCards.length <= 69){
        shuffle()
    }
    let cardId = Math.floor(Math.random() * playingCards.length)
    let card = playingCards[cardId]
    playingCards.splice(cardId, 1)
    return card
}

function startTimer(duration) {

    document.getElementById("clock").innerHTML = `
        <svg width="100px" height="100px" viewBox="0 0 42 42" class="donut">
            <circle id="c1" cx="21" cy="21" r="16" stroke-dasharray="100 0" stroke-dashoffset="100"></circle>
            <circle id="c2" cx="21" cy="21" r="16" stroke-dasharray="0 100" stroke-dashoffset="0"></circle>
            <g class="chart-text">
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" id="counterText">5</text>
            </g>
        </svg>
        `
    let timeout = setTimeout(function () {
        let time = duration
        let i = 1
        let k = ((i/duration) * 100)
        let l = 100 - k
        i++
        document.getElementById("c1").style.strokeDasharray = [l,k]
        document.getElementById("c2").style.strokeDasharray = [k,l]
        document.getElementById("c1").style.strokeDashoffset = l
        document.getElementById("counterText").innerHTML = duration
        let interval = setInterval(function() {
            if (i > time) {
                document.getElementById("clock").innerHTML = "Clock out"
                return
            }
            k = ((i/duration) * 100)
            l = 100 - k
            document.getElementById("c1").style.strokeDasharray = [l,k]
            document.getElementById("c2").style.strokeDasharray = [k,l]
            document.getElementById("c1").style.strokeDashoffset = l
            document.getElementById("counterText").innerHTML = (duration +1)-i
            i++
        }, 1000)
    }, 0)
}

const startPlayer = (position) => {
    if (PLAYING_GAME === "IDLE" || PLAYING_GAME === "BITTING"){
        players[position].playingStatus = true
        players[position].plays.push({
            bet: 0,
            cards: [],
            result: ""
        }
        )
        document.getElementById(`p${position}_plays`).innerHTML += `
            <div class="play" id="p${position}_play${players[position].plays.length - 1}">
                <div class="cards" id="p${position}_play${players[position].plays.length - 1}_cards">
                </div>
                <div>
                    scommessa attuale: <span id="p${position}_play${players[position].plays.length - 1}_bet">0</span>
                </div>
            </div>
        `
        document.getElementById(`p${position}_buttons`).innerHTML = fishSet(position, 0)
        if (PLAYING_GAME === "IDLE"){
            startGame()
        }
    }
}

const startGame = () => {
    PLAYING_GAME = PHASES.BITTING
    startTimer(30).then(() => {
        PLAYING_GAME = PHASES.PLAYING
        console.log(PLAYING_GAME)
    })
}

const bet = (position, playId, value) => {
    if (players[position].credits < value){
        alert("not enough credits")
        return
    }
    players[position].plays[playId].bet += value
    players[position].credits -= value
    document.getElementById(`p${position}_cash`).innerHTML = `CASH: ${players[position].credits}`
    document.getElementById(`p${position}_play${playId}_bet`).innerHTML = players[position].plays[playId].bet

    
}

const hit = (position) => {
    numCartePlayer++
    sommaPlayer += playingCards[pickCard()].value
}

const stand = () => {
    //set playingStatus to false
}

const dealerTurn = () => {
    if (sommaDealer < 17){
        sommaDealer += playingCards[pickCard()].value
        numCarteDealer++
        dealerTurn()
    }
    else{
        return arrDealer = [sommaDealer, numCarteDealer]
    }
}

const check = (position , sommaPlayer , numCartePlayer , arrDealer) => {
    if (players[position].playingStatus){
        if (sommaPlayer > 21){
            console.log("BUST")
        }
        else if (sommaPlayer == 21 || numCartePlayer == 2){
            console.log("BLACKJACK")
        }
        else if (sommaPlayer < 21 || sommmaPlayer > arrDealer[0]){
            console.log("WIN")
        }
        else if (sommaPlayer == arrDealer[0]){
            console.log("PUSH")
        }
        else if (sommaPlayer < arrDealer[0]){
            console.log("LOSE")
        }
        else if (arrDealer[0] > 21){
            console.log("DEALER BUST")
            if (sommaPlayer < 21){
                console.log("WIN")
            }
            else{
                console.log("LOSE")
            }
        }
        else if(arrDealer[0] == 21 || arrDealer[1] == 2){
            console.log("LOSE")
        }
    }
}


