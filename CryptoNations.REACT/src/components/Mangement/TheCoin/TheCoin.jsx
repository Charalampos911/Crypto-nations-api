import React, { useState,useRef,useEffect } from 'react';

import Stats from "./Stats";
import Currency from "./Currency";
import Lending from "./Lending";
import Revenue from "./Revenue";
import { FaArrowLeft } from "react-icons/fa";

export default function TheCoin(props) {
    const [ActiveTab, setActiveTab] = useState(0);


   return (
    <>
        {ActiveTab==0?
        <>
          <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
          <label>FINANCES</label>
          <div className='Main-button' onClick={()=>setActiveTab(1)}>
            STATS
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(2)}>
            CURRENCY
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(3)}>
            LENDING
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(4)}>
            REVENUE
          </div>
        </>
        :null}
        {ActiveTab==1?
        <Stats ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==2?
        <Currency ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==3?
        <Lending ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==4?
        <Revenue ChangeSelection={()=>setActiveTab(0)}/>
        :null}
    </>)
}