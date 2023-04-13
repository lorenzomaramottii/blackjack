CARDS_SIZE = "width: 10%; height: 24.9%;"
//POSITIONS = "position: absolute; top: 34.3%; left: 72.7%; transform: rotate(-10.45deg);"

POSITIONS = [[34.25, 72.3, -9.924], [42.7, 55.1, -2], [42.7, 39, 2], [34.4, 21.7, 10]]
TRANSPORT = [[-1.6, 1.5, -0.6], [0, 1.6, 0]]

const displayCards = (card, position) => {
    console.log(players[position].plays[0].cards.length)
    positionY = POSITIONS[position][0] + (TRANSPORT[position][0] * (players[position].plays[0].cards.length - 1))
    positionX = POSITIONS[position][1] + (TRANSPORT[position][1] * (players[position].plays[0].cards.length - 1))
    rotation = POSITIONS[position][2] + (TRANSPORT[position][2] * (players[position].plays[0].cards.length - 1))
    console.log([positionX, positionY, rotation])
    document.body.innerHTML += `
    <img class = "cards_size" src="images/cards/${card.name}.svg" alt="${card.value} of ${card.name}" 
    style="position: absolute; top: ${positionY}%; left: ${positionX}%; transform: rotate(${rotation}deg);">`
}