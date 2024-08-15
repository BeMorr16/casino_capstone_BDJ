import { Link, useNavigate } from "react-router-dom"
import './home.css'

export default function Home() {
  const navigate = useNavigate();


return (
    <>
      <div className="landing-page">
      <header className="welcome-section">
          <h1>Welcome to Wise Guys Casino</h1>
          <h2>The Ultimate Online Gambling Experience!</h2>
        <p>
        Dive into a world of excitement and chance with our online casino, featuring Blackjack, Roulette, and Slot Machines. Whether you’re a seasoned gambler or a curious newcomer, we have something for everyone. Visit our how to play pages &#40;<Link className="home-links" to="/howtoplay/blackjack">Blackjack</Link>, <Link className="home-links" to="/howtoplay/roulette">Roulette</Link>, <Link className="home-links" to="/howtoplay/slots">Slots</Link>&#41;  for all the guidance you need to get started.
        </p>
      </header>
      <div className="Home-content-1">
      <section className="guest-access">
        <h2>Guest Access</h2> 
        <p>
          As a guest, you have the freedom to play with an unlimited amount of money to test your skills and strategies. Your funds reset each time you enter a game or refresh the page, giving you endless opportunities to refine your strategy.
        </p>
      </section>
      
      <section className="registered-user-benefits">
        <h2>Registered User Benefits</h2>
        <p>
          Create an account to unlock the full potential of our casino. Logged-in users can save and track their progress, with their chip count and record being saved for the next time they log on. Build your fortune now!
        </p>
      </section>
      
      <section className="account-info-stats">
        <h2>Account Information and Advanced Stats</h2>
        <p>
          Your cashier page offers a comprehensive view of your gaming journey, allowing you to edit your details, analyze advanced stats for each game, and search and filter your bet slips/transaction history.
        </p>
      </section>      
        </div>
        <div className="Home-content-2">
      <section className="leaderboards">
        <h2>Leaderboards and Competition</h2>
        <p>
          Our leaderboard page adds a competitive edge, showcasing the top players in several categories: the highest amount won on a single bet, the most money accumulated, and the best win percentage. You can also view the best results from the Blackjack mini-game, where players strive to achieve the highest winnings in 10 hands.
        </p>
      </section>
      
      <section className="blackjack-mini-game">
        <h2>Blackjack Mini-Game</h2>
        <p>
          One of the fantastic features of our casino is the Blackjack mini-game. Logged-in users can embark on this challenge with $100 and 10 hands to maximize their winnings. Track your mini-game performance on your cashier page and see how you rank on the leaderboard. Aim for the perfect game of 10 straight wins and earn your place in the hall of fame.
        </p>
      </section>
        </div>
        <p className="home-end-section">
          Join us now to experience the excitement and competition our casino has to offer. Whether you choose to play as a guest or a registered user, the adventure awaits.
        </p>
        <div className="cta-buttons">
        <button className="cta-button" onClick={() => navigate('/account')}>Login</button>
        <button className="cta-button" onClick={() => navigate('/casino')}>Guest</button>
      </div>
    </div>
    </>
  )
}
