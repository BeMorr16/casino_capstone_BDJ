const suits = ["spades", "hearts", "diamonds", "clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function createDeck() {
    let deck = [];
    for (let k = 0; k < 4; k++){
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                let weight = parseInt(values[i])
                if (values[i] === "J" || values[i] === "Q" || values[i] === "K") {
                    weight = 10;
                }
                if (values[i] === "A") {
                    weight = 11;
                }

                let frontImage;
                switch (values[i]) {
                    case "2":
                        frontImage = `2_of_${suits[j]}.svg`;
                        break;
                    case "3":
                        frontImage = `3_of_${suits[j]}.svg`;
                        break;
                    case "4":
                        frontImage = `4_of_${suits[j]}.svg`;
                        break;
                    case "5":
                        frontImage = `5_of_${suits[j]}.svg`;
                        break;
                    case "6":
                        frontImage = `6_of_${suits[j]}.svg`;
                        break;
                    case "7":
                        frontImage = `7_of_${suits[j]}.svg`;
                        break;
                    case "8":
                        frontImage = `8_of_${suits[j]}.svg`;
                        break;
                    case "9":
                        frontImage = `9_of_${suits[j]}.svg`;
                        break;
                    case "10":
                        frontImage = `10_of_${suits[j]}.svg`;
                        break;
                    case "J":
                        frontImage = `jack_of_${suits[j]}.svg`;
                        break;
                    case "Q":
                        frontImage = `queen_of_${suits[j]}.svg`;
                        break;
                    case "K":
                        frontImage = `king_of_${suits[j]}.svg`;
                        break;
                    case "A":
                        frontImage = `ace_of_${suits[j]}.svg`;
                        break;
                    default:
                        frontImage = "back_of_card.svg";
                        break;
                }
                
                let card = { value: values[i], suit: suits[j], weight: weight, frontImage: `/BJimages/${frontImage}`, backImage: `/BJimages/back.png`, deck: k + 1};
                deck.push(card);
            }
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = 0; i < 50000; i++){
        let index1 = Math.floor((Math.random() * deck.length));
        let index2 = Math.floor((Math.random() * deck.length));
        let temp = deck[index1];
        deck[index1] = deck[index2];
        deck[index2] = temp;
    }
}

export default function getDecks() {
    let deck = createDeck();
    shuffle(deck);
    return deck;
}