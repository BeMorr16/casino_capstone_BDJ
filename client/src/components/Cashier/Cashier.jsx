// import React from 'react'
import './cashier.css'
import UserHistory from './UserHistory';
import UserInfo from "./UserInfo";
import UserMinigame from './UserMinigame';
import UserStats from './UserStats';


export default function Cashier() {

  return (
    <>
    <div className="Cashier-Background">
      <div className='BankContainer'>
        <div className='bank-top-section'>
        <UserInfo />
        <UserStats/>
          </div>
          <div className='bank-bottom-section'>
          <UserMinigame/>
        <UserHistory />
          </div>
        
      </div>
      </div>
    </>
  )
}
