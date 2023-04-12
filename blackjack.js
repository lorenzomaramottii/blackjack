const players = []
const START_VALUE = 1000
const MIN_START_VALUE = 10
const MAX_PLAYERS = 4
const IMAGE_FOLDER = "images"

const PHASES = {
    IDLE: "IDLE",
    BETTING: "BITTING",
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


let dealer = {
    name: "dealer",
    plays: []
}

const startDealer = () => {
    dealer.plays.push({
        cards: [],
        result: ""
    })
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
    return new Promise((resolve , reject) => {
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
                resolve()
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
    })
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
        document.getElementById(`p${position}_body`).innerHTML = `
            <div>
                scommessa attuale: <span id="p${position}_play${players[position].plays.length - 1}_bet">0</span>
            </div>
        `
        document.getElementById(`p${position}_body`).innerHTML += fishSet(position, 0)
        if (PLAYING_GAME === "IDLE"){
            startGame()
        }
    }
}

const bet = (position, playId, value) => {
    if (players[position].credits < value){
        alert("not enough credits")
        return
    }
    players[position].plays[playId].bet += value
    players[position].credits -= value
    document.getElementById(`p${position}_cash`).innerHTML = players[position].credits
    document.getElementById(`p${position}_play${playId}_bet`).innerHTML = players[position].plays[playId].bet

    
}

const startGame = () => {
    PLAYING_GAME = PHASES.BETTING
    startTimer(5).then(() => {
        PLAYING_GAME = PHASES.PLAYING
        console.log(PLAYING_GAME)
        if(PLAYING_GAME == PHASES.PLAYING){
            gameLoop()
        }
    })    
}

const gameLoop = () => {
    startDealer()
    players.forEach((e, ind) => {
        if(e.playingStatus == true){
            document.getElementById(`p${ind}_body`).innerHTML = `
            <div>
                punteggio: <span id="p${ind}_play${e.plays.length - 1}_score">0</span>
            </div>
            `
            }
        })
    oneByOne(0)
    cardGiving()
    
}

const cardGiving = () =>{
    for (let i = 0; i<2; i++){
        players.forEach((e, ind) => {
            if(e.playingStatus == true){
                let card = pickCard()
                e.plays[0].cards.push(card)
                displayCards(card, ind)
                document.getElementById(`p${ind}_play${e.plays.length - 1}_score`).innerHTML = e.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
            }
            
        })
        let card = pickCard()
        dealer.plays[0].cards.push(card)
        
    }    
}

// funzione che faccia giocare i giocatori uno alla volta

const oneByOne = (index) => {
    for (let i = index; i < players.length; i++){   
        if(players[i].playingStatus == true){
            
            document.getElementById(`p${i}_body`).innerHTML += `
            <div>
                <button onclick="hit(${i})">Hit</button>
                <button onclick="stand(${i})">Stand</button>
                <br><br>
                
            </div>
            `
            return
        }
    }
}

const hit = (position) => {
    if(players[position].playingStatus == true){
        let card = pickCard()
        players[position].plays[0].cards.push(card)
        console.log(players[position].plays[0].cards)
    }
    document.getElementById(`p${position}_play${players[position].plays.length - 1}_score`).innerHTML = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) 
    checkBust(position)
}

const stand = (position) => {
    players[position].playingStatus = false
    console.log("STAND")
    document.getElementById(`p${position}_body`).innerHTML = `
    <div>
        STAND<br>
        punteggio: <span id="p${position}_play${players[position].plays.length - 1}_score">${players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
    </div>`

    if (players[position].playingStatus == false){
        oneByOne(position + 1)
    }
}

const dealerTurn = () => {
    let sommaDealer = 0
    for (let i in dealer.plays){
        sommaDealer += dealer.plays[i]
    }
    if (sommaDealer < 17){
        sommaDealer += playingCards[pickCard()].value
        numCarteDealer++
        dealerTurn()
    }
    else{
        return arrDealer = [sommaDealer, numCarteDealer]
    }
}

const checkBust = (position) => {
    let sommaPlayer = 0
    for (let i in players[position].plays[0].cards){
        sommaPlayer += players[position].plays[0].cards[i].value
    }
    if (sommaPlayer > 21){
        console.log("BUST")
        players[position].playingStatus = false
        players[position].plays[0].result = "LOSE"
        document.getElementById(`p${position}_body`).innerHTML = `
        <div>
            BUST<br>
            punteggio: <span id="p${position}_play${players[position].plays.length - 1}_score">${players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
        </div>`
    }
    if (players[position].playingStatus == false){
        oneByOne(position + 1)
    }  
}

const checkWinner = (position) => {
    if (players[position].plays[0] == true){
        
    }
}


