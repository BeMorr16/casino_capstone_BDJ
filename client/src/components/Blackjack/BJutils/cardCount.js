/**
 * 
 * @param {Array<object>} cards 
 * @returns {number}
 */
export default function cardCount(cards) {
    let count = 0;
    let aces = 0;

        for (let card of cards){
            if (card.value === 'A') {
                aces += 1;
                count += 11; 
            } else {
                count += card.weight;
            }
        }
    
        while (count > 21 && aces > 0) {
            count -= 10;
            aces -= 1;
        }
    
    return count
}

/**
 * @param {Array<object>} userCards
 * @param {Array<object>} dealerCards
 * @returns {number}
 */
export function evalPerfectPair(userCards) {
    if (userCards.length < 2) {
        return 1;
    }

    const userCard1 = userCards[0];
    const userCard2 = userCards[1];

    if (userCard1.value === userCard2.value) {
        if (userCard1.suit === userCard2.suit) {
            return 25;
        }
        const userSuits = [userCard1.suit, userCard2.suit];
        if ((userSuits.includes("clubs") && userSuits.includes("spades")) ||
            (userSuits.includes("hearts") && userSuits.includes("diamonds"))) {
            return 12;
        }
        return 6;
    }

    return 1; 
}