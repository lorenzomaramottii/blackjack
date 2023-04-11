CARDS_SIZE = "width: 9%; height: 24.8%;"
//POSITIONS = "position: absolute; top: 34.3%; left: 72.7%; transform: rotate(-10.45deg);"

POSITIONS = [[34.3, 72.7, -10], [42.7, 55.4, -2], [42.7, 39, 2], [34.4, 21.7, 10]]

const displayCards = (card, position) => {
    document.body.innerHTML += `
    <img class = "cards_size" src="images/cards/${card.name}.svg" alt="${card.value} of ${card.name}" 
    style="position: absolute; top: ${POSITIONS[position][0]}%; left: ${POSITIONS[position][1]}%; transform: rotate(${POSITIONS[position][2]}deg);">`
}