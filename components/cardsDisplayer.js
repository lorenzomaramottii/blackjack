CARDS_SIZE = "width: 10%; height: 24.9%;"
//POSITIONS = "position: absolute; top: 34.3%; left: 72.7%; transform: rotate(-10.45deg);"

POSITIONS = [[34.3, 72.5, -10.3], [42.8, 55.2, -2], [42.85, 38.8, 2], [34.4, 21.6, 10.3], [1.8, 47, 0]]
TRANSPORT = [[-1.6, 1.5, -0.6], [0, 1.6, 0], [0, 1.6, 0], [-1.0, 1.5, -0.6], [0, -2, 0]]

const displayCards = (card, position) => {
    if (position == 4){
        positionY = POSITIONS[position][0] + (TRANSPORT[position][0] * (dealer.plays[0].cards.length - 1))
        positionX = POSITIONS[position][1] + (TRANSPORT[position][1] * (dealer.plays[0].cards.length - 1))
        rotation = POSITIONS[position][2] + (TRANSPORT[position][2] * (dealer.plays[0].cards.length - 1))
    } else {
        positionY = POSITIONS[position][0] + (TRANSPORT[position][0] * (players[position].plays[0].cards.length - 1))
        positionX = POSITIONS[position][1] + (TRANSPORT[position][1] * (players[position].plays[0].cards.length - 1))
        rotation = POSITIONS[position][2] + (TRANSPORT[position][2] * (players[position].plays[0].cards.length - 1))
    }
    console.log([positionX, positionY, rotation])
    document.body.innerHTML += `
    <img class = "cards_size" src="images/cards/${card.name}.svg" alt="${card.value} of ${card.name}" 
    style="position: absolute; top: ${positionY}%; left: ${positionX}%; transform: rotate(${rotation}deg);">`
}