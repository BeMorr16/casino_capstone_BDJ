// import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import "./layout.css"
import useUserState from '../../store/store'

export default function Layout() {
  const { returnChipsToTotal, isLoggedIn, resetUser, username, userMoney, setIsMiniGame } = useUserState();
  const navigate = useNavigate();

  function resetTableChips() {
    returnChipsToTotal();
  }

  function handleLogout() {
    resetUser();
    window.sessionStorage.removeItem("token");
  }

  function sendToMiniGame(e) {
    e.preventDefault();
    setIsMiniGame(true);
    navigate('/blackjack')
  }


  return (
      <div className='Layout'>
          <nav className='nav'>
        <div className="nav-links">
        {isLoggedIn && (
            <div className="nav-user-info">
              <span>{username}: </span>
              <span>${userMoney}</span>
            </div>
          )}
          {!isLoggedIn ? (
          <Link to='/' onClick={resetTableChips}>
          Home
            </Link> 
          ) : (
              <Link to='/cashier' onClick={resetTableChips}>
                Cashier
              </Link>
          )}

          <div className="dropdown">
          <Link to="#" className="dropbtn">How to Play</Link>
          <div className="dropdown-content">
              {isLoggedIn && <Link to="/">Welcome</Link>}
            <Link to="/howtoplay/blackjack" onClick={resetTableChips}>Blackjack</Link>
            <Link to="/howtoplay/roulette" onClick={resetTableChips}>Roulette</Link>
            <Link to="/howtoplay/slots" onClick={resetTableChips}>Slots</Link>
          </div>
          </div>
          

          <Link to='/leaderboards' onClick={resetTableChips}>Leaderboards</Link>
          <Link to='/casino' onClick={resetTableChips}>Casino</Link>
          {isLoggedIn && <Link onClick={sendToMiniGame}>MiniGame</Link>}
          {isLoggedIn ? (<Link to='/' onClick={handleLogout}>Logout</Link>) : (<Link to='/account' onClick={resetTableChips}> Login</Link>)}

        </div>  
      </nav>
      
<main>
        <Outlet />
        </main>
    </div>
  )
}
