// import React from 'react'

import { useParams } from "react-router-dom"
import HTPBlackjack from "./HTPBlackjack";
import HTPRoulette from "./HTPRoulette";
import HTPSlots from "./HTPSlots";

export default function HowToPlay() {
  const {game} = useParams();

  if (game === 'blackjack') {
    return <HTPBlackjack/>
  } else if (game === "roulette") {
    return <HTPRoulette/>
  } else if (game === "slots") {
    return <HTPSlots/>
  }
}
