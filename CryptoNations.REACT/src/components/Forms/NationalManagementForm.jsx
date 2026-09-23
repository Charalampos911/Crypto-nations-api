import React, { useState,useRef,useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import NationalParameters from "../Mangement/NationalParameters/NationalParameters"
import FoundationalEvents from "../Mangement/FoundationalEvents/FoundationalEvents"
import TheCoin from "../Mangement/TheCoin/TheCoin"
import Exchange from "../Mangement/Exchange/Exchange"

import { useSelector, useDispatch } from "react-redux"

export default function NationalManagementForm(props) {
  const [ActiveTab, setActiveTab] = useState(0);
  const Base=useSelector((state) => state.Base); 
  const Api = useSelector((state) => state.Api);

    return (
    <div className='NationManagementForm'>
      <div className='Current-Nation-Flag'>
        <img src={Base.LoadedFlags[Api.CurrentCountry.Id-1]} title='' />
      </div>
      <div className="NationManagementFormInner">
      <div>
        {ActiveTab==0?
        <>
          <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
          <label>Management</label>
          <div className='Main-button' onClick={()=>setActiveTab(1)}>
            National parameters
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(2)}>
            Foundamental events
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(3)}>
            Finances
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(4)}>
            Market
          </div>
        </>
        :null}
        {ActiveTab==1?
        <NationalParameters ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==2?
        <FoundationalEvents ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==3?
        <TheCoin ChangeSelection={()=>setActiveTab(0)}/>
        :null}
         {ActiveTab==4?
        <Exchange ChangeSelection={()=>setActiveTab(0)}
        />
        :null}  
      </div>
      </div>
    </div>
  );
}