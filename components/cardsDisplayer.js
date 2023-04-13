POSITIONS = [[34.1, 72.5, -10.3], [42.65, 55.2, -2], [42.65, 38.8, 2], [34.1, 21.5, 10.3], [1.76, 47.1, 0]]
TRANSPORT = [[-1.6, 1.5, -0.6], [-0.2, 1.6, 0], [-0.2, 1.6, 0], [-1.0, 1.5, -0.6], [0, -2, 0]]

BACKS = ["BLUE_BACK.svg", "RED_BACK.svg"]

const displayCards = (card, position) => {
    let positionX, positionY, rotation = 0
    console.log(BACKS.length)
    if (position == 4){
        positionY = POSITIONS[position][0] + (TRANSPORT[position][0] * (dealer.plays[0].cards.length - 1))
        positionX = POSITIONS[position][1] + (TRANSPORT[position][1] * (dealer.plays[0].cards.length - 1))
        rotation = POSITIONS[position][2] + (TRANSPORT[position][2] * (dealer.plays[0].cards.length - 1))
        if (dealer.plays[0].cards.length > 1) {
            positionX -= 8
        }
        if (dealer.plays[0].cards.length == 2){
            document.body.innerHTML += `
            <img class = "cards_size playing-cards" id = "dealerSecond" src="images/cards/${BACKS[Math.floor(Math.random() * (BACKS.length))]}" alt="back" 
            style="position: absolute; top: ${positionY}%; left: ${positionX}%; transform: rotate(${rotation}deg);">`
            return
        }
        
    } else {
        positionY = POSITIONS[position][0] + (TRANSPORT[position][0] * (players[position].plays[0].cards.length - 1))
        positionX = POSITIONS[position][1] + (TRANSPORT[position][1] * (players[position].plays[0].cards.length - 1))
        rotation = POSITIONS[position][2] + (TRANSPORT[position][2] * (players[position].plays[0].cards.length - 1))
    }
    console.log([positionX, positionY, rotation])
    document.body.innerHTML += `
    <img class = "cards_size playing-cards" src="images/cards/${card.name}.svg" alt="${card.value} of ${card.name}" 
    style="position: absolute; top: ${positionY}%; left: ${positionX}%; transform: rotate(${rotation}deg);">`
}


const removeCards = () => {
    let cards = document.getElementsByClassName("playing-cards")
    while(cards.length > 0){
        cards[0].parentNode.removeChild(cards[0])
    }
}

const displaySecondDealerCard = () => {
    document.getElementById("dealerSecond").remove()
    positionX = POSITIONS[4][1] + (TRANSPORT[4][1] * (1))
    positionY = POSITIONS[4][0] + (TRANSPORT[4][0] * (1))
    rotation = POSITIONS[4][2] + (TRANSPORT[4][2] * (1))
    document.body.innerHTML += `
    <img class = "cards_size playing-cards" src="images/cards/${dealer.plays[0].cards[1].name}.svg" alt="${dealer.plays[0].cards[1].value} of ${dealer.plays[0].cards[1].name}"
    style="position: absolute; top: ${positionY}%; left: ${positionX - 8}%; transform: rotate(${rotation}deg);">`
}
