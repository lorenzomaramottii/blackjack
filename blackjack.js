const players = []
const START_VALUE = 1000
const MIN_START_VALUE = 10
const MAX_PLAYERS = 4
const IMAGE_FOLDER = "images"

const PHASES = {
    IDLE: "IDLE",
    BETTING: "BETTING",
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
                console.log(timeout)
                document.getElementById("clock").innerHTML = ""
                resolve()
                clearInterval(interval)
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
    if (PLAYING_GAME === "IDLE" || PLAYING_GAME === "BETTING"){
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

function startGame(){
    PLAYING_GAME = PHASES.BETTING
    startTimer(6).then(() => {
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
                Punteggio: <span id="p${ind}_play${e.plays.length - 1}_score">0</span>
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
            aceCheck(ind)
        })
      
        let card = pickCard()
        dealer.plays[0].cards.push(card)
        displayCards(card, 4)
        document.getElementById(`dealer_score`).innerHTML = dealer.plays[0].cards[0].value
        
    }
    checkBlackjackDealer()
    players.forEach((e, ind) => {
        checkBlackjack(ind)})    
}

const oneByOne = (index) => {
    for (let i = index; i < players.length; i++){
        if (players[i]){
            if(players[i].playingStatus == true){
                
                document.getElementById(`p${i}_body`).innerHTML += `
                <div>
                    <button class="btn btn-warning" onclick="hit(${i})">Hit</button>
                    <button class="btn btn-warning" onclick="stand(${i})">Stand</button>
                    <br><br>
                    
                </div>
                `
                return
            }
        }
    }
    dealerTurn()
}

const hit = (position) => {
    if(players[position].playingStatus == true){
        let card = pickCard()
        players[position].plays[0].cards.push(card)
        displayCards(card, position)
    }
    document.getElementById(`p${position}_play${players[position].plays.length - 1}_score`).innerHTML = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) 
    check21(position)
    aceCheck(position)
    checkBust(position)
}

const stand = (position) => {
    players[position].playingStatus = false
    document.getElementById(`p${position}_body`).innerHTML = `
    <div>
        STAND<br>
        Punteggio: <span id="p${position}_play${players[position].plays.length - 1}_score">${players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
    </div>`

    if (players[position].playingStatus == false){
        oneByOne(position + 1)
    }
}

const checkBust = (position) => {
    let sommaPlayer = 0
    for (let i in players[position].plays[0].cards){
        sommaPlayer += players[position].plays[0].cards[i].value
    }
    if (sommaPlayer > 21){
        players[position].playingStatus = false
        players[position].plays[0].result = "LOSE"
        document.getElementById(`p${position}_body`).innerHTML = `
        <div>
            BUST<br>
            Punteggio: <span id="p${position}_play${players[position].plays.length - 1}_score">${players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
        </div>`
        if (players[position].playingStatus == false){
            oneByOne(position + 1)
        }  
    }
    
}

const check21 = (position) => {
    let sommaPlayer = 0
    sommaPlayer = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    if (sommaPlayer == 21){
        stand(position)
    }
    players[position].plays[0].result = "WIN"
}

const checkBlackjack = (position) => {
    let sommaPlayer = 0
    sommaPlayer = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    if (sommaPlayer == 21){
        players[position].playingStatus = false
        players[position].plays[0].result = "BLACKJACK"
        document.getElementById(`p${position}_body`).innerHTML = `
        <div>
            HAI FATTO BLACKJACK
        </div>
        `
        oneByOne(position + 1)
    }
}

const checkBlackjackDealer = () => {
    let sommaDealer = 0
    sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    if (sommaDealer == 21){
        for(let i in players){
            players[i].playingStatus = false
            players[i].plays[0].result = "LOSE"
            document.getElementById(`p${i}_body`).innerHTML = `
            <div>
                HAI PERSO
            </div>
            `
        }
        checkWinner()
    }
    
}

const aceCheck = (position) => {
    let sommaPlayer = 0
    sommaPlayer = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    if (sommaPlayer > 21){
        for (let i in players[position].plays[0].cards){
            if (players[position].plays[0].cards[i].value == 11 && sommaPlayer > 21){
                players[position].plays[0].cards[i].value = 1
            }
            sommaPlayer = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0)
        }
    }

    document.getElementById(`p${position}_play${players[position].plays.length - 1}_score`).innerHTML = players[position].plays[0].cards.reduce((acc , e) => acc + e.value, 0) 
}

const dealerTurn = () => {
    let sommaDealer = 0
    displaySecondDealerCard()
    sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    aceCheckDealer()
    while(sommaDealer < 17){
        let card = pickCard()
        dealer.plays[0].cards.push(card)
        displayCards(card, 4)
        aceCheckDealer()
        sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    }
    checkWinner()
    document.getElementById(`dealer_score`).innerHTML = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)

}

const aceCheckDealer = () => {
    let sommaDealer = 0
    sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    if (sommaDealer > 21){
        for (let i in dealer.plays[0].cards){
            if (dealer.plays[0].cards[i].value == 11 && sommaDealer > 21){
                dealer.plays[0].cards[i].value = 1
            }
            sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
        }
    }

    document.getElementById(`dealer_score`).innerHTML = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
}

// const checkDealerBust = () => {
//     console.log("ciao") 
//     let sommaDealer = 0
    
//     sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
//     if (sommaDealer > 21){
//         aceCheckDealer()
//     }
//     sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
//     if (sommaDealer >= 17){
//         console.log("ass")
//         checkWinner()
//     }  
// }

const checkWinner = () => {
    console.log("Sì")
    let sommaDealer = 0
    sommaDealer = dealer.plays[0].cards.reduce((acc , e) => acc + e.value, 0)
    for (let i in players){
        let sommaPlayer = 0
        sommaPlayer = players[i].plays[0].cards.reduce((acc , e) => acc + e.value, 0)
        if (sommaPlayer > sommaDealer && sommaPlayer <= 21){
            players[i].plays[0].result = "WIN"
        }
        else if(sommaDealer > 21 && sommaPlayer <= 21){
            players[i].plays[0].result = "WIN"
        }
        else if(sommaPlayer == sommaDealer && sommaPlayer <= 21){
            players[i].plays[0].result = "PUSH"
        }
        else{
            players[i].plays[0].result = "LOSE"
        }
    }
    payBets()
}

const payBets = () => {
    for (let i in players){
        if (players[i].plays[0].result == "WIN"){
            players[i].credits += (players[i].plays[0].bet) * 2
            document.getElementById(`p${i}_cash`).innerHTML = players[i].credits
            document.getElementById(`p${i}_win`).innerHTML = (players[i].plays[0].bet) * 2
            document.getElementById(`p${i}_body`).innerHTML = `
            <div>
                HAI VINTO <br>
                Punteggio: <span id="p${i}_play${players[i].plays.length - 1}_score">${players[i].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
            </div>`
            console.log("credits:" + players[i].credits)
        }
        else if(players[i].plays[0].result == "PUSH"){
            players[i].credits += players[i].plays[0].bet
            document.getElementById(`p${i}_cash`).innerHTML = players[i].credits
            document.getElementById(`p${i}_win`).innerHTML = (players[i].plays[0].bet)
            document.getElementById(`p${i}_body`).innerHTML = `
            <div>
                HAI PAREGGIATO <br>
                Punteggio: <span id="p${i}_play${players[i].plays.length - 1}_score">${players[i].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
            </div>`
            console.log("credits:" + players[i].credits)
        }
        else if(players[i].plays[0].result == "BLACKJACK"){
            console.log("blackjack")
            players[i].credits += (players[i].plays[0].bet) * 2.5
            document.getElementById(`p${i}_cash`).innerHTML = players[i].credits
            document.getElementById(`p${i}_win`).innerHTML += (players[i].plays[0].bet) * 2.5
            document.getElementById(`p${i}_body`).innerHTML = `
            <div>
                HAI FATTO BLACKJACK <br>
                Punteggio: <span id="p${i}_play${players[i].plays.length - 1}_score">${players[i].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
            </div>`
            console.log("credits:" + players[i].credits)
        }
        else{
            document.getElementById(`p${i}_cash`).innerHTML = players[i].credits
            document.getElementById(`p${i}_body`).innerHTML = `
            <div>
                HAI PERSO <br>
                Punteggio: <span id="p${i}_play${players[i].plays.length - 1}_score">${players[i].plays[0].cards.reduce((acc , e) => acc + e.value, 0) }</span>
            </div>`
            console.log("credits:" + players[i].credits)
            document.getElementById(`p${i}_win`).innerHTML = 0
        }
    }
    resetMatch()
}

const resetMatch = () => {
    startTimer(2).then(() => {
        removeCards()
        PLAYING_GAME = "IDLE"
        dealer.plays[0].cards = []
        dealer.plays[0].result = ""
        for (let i in players){
            players[i].plays = []
            players[i].playingStatus = false
            document.getElementById(`p${i}_body`).innerHTML = `
            <a onclick="startPlayer(${i})" class="btn btn-warning">Start Player</a>`
        }
    })
}

