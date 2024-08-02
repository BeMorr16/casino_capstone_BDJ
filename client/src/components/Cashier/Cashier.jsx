// import React from 'react'
import './cashier.css'
import UserHistory from './UserHistory';
import UserInfo from "./UserInfo";
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
        <UserHistory />
        
      </div>
      </div>
    </>
  )
}
