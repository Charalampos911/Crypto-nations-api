import React, { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { SiBitcoincash } from "react-icons/si";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { RiInformationOffLine } from "react-icons/ri";

import { apiRequest } from '../../Redux/features/ApiReducer';

export default function NationInitiationForm(props) { // Completed!!!
  const Base=useSelector((state) => state.Base); 
  const Nation=useSelector((state) => state.Nation);
  const Api = useSelector((state) => state.Api); 
  const dispatch = useDispatch(); 

  const [info, setInfo] = useState(false);
  
  const [CountryType, setCountryType] = useState(0);
  const [GunControlType, setGunControlType] = useState(0);
  const [AllianceType, setAllianceType] = useState(0);

  var IsReady = CountryType!==0 && GunControlType !=0 && AllianceType!=0;

  const [GuardA, setGuardA] = useState(false);
  const [GuardB, setGuardB] = useState(false);

  const ReadyToInitiate=(CountryType,GunControlType,AllianceType)=>{

    setGuardA(true)
    setGuardB(true)
    dispatch(
      apiRequest({
        flatten: false,
        name:"NationInitiationForm.jsx | InitiateNation",
        url: 'api/CryptoNations/InitiateNation/'+Api.CurrentCountry.Id,
        method: 'PUT',
        body: [
          {
            initiateTheTypeOf:"GovType",
            setItsClassTo: CountryType[0],
          },
          {
            initiateTheTypeOf: "GunControl",
            setItsClassTo: GunControlType[0], 
          },
          {
            initiateTheTypeOf: "Alliance",
            setItsClassTo: AllianceType[0], 
          }
        ],
        auth: true,
        tokenRequired: true,
        storeIn: "InitiateNation", // Specify where to store the response

      })
    );
  }
  useEffect(() => {
    if(GuardA){
      dispatch(
        apiRequest({
          flatten: true,
          name:"NationInitiationForm.jsx | NationsWithQuery",
          url: 'api/CryptoNations/NationsWithQuery?filterOn=&filterQuery=&pageNumber=1&pageSize=1000',
          method: 'GET',
          body: null,
          auth: true,
          tokenRequired: true,
          storeIn: 'Nations' // Specify where to store the response
        })
      );
    }
    
   }, [Api.InitiateNation]);
   useEffect(() => {
    if(GuardB){
      dispatch(
        apiRequest({
          flatten: true,
          name:"NationInitiationForm.jsx | FullNation",
          url: 'api/CryptoNations/FullNation/'+Api.CurrentCountry.Id,
          method: 'GET',
          body: null,
          auth: true,
          tokenRequired: true,
          storeIn: 'CurrentCountry' // Specify where to store the response
        })
      );
    }
 }, [Api.Nations]);
  return (
    <div className='NationInitiationForm'>
      
      <div className="NationInitiationFormInner">
      <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
        <div className="FlagCont">
          <div className="Title">Create account</div>
          <div className="TopFlag">
            <div>
            <img src={Base.LoadedFlags[Api.CurrentCountry.Id-1]} title='' /><div>{Api.CurrentCountry.Name}</div>
              <div className='DesInfo'>{!info?
                <GoInfo className='info' onClick={()=>setInfo(true)}/>
                :
                <RiInformationOffLine className='uninfo' onClick={()=>setInfo(false)}/>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="InitiationExplanations">

        
        <div className={info?"TheMainCrypto ShowInfo":"TheMainCrypto HideInfo"}>
          <div>
          <div className="Acro"><SiBitcoincash />{Api.CurrentCountry.TokenAcro}</div>
          <div className="Information">
            <p>The main national crypto of {Api.CurrentCountry.Name} will be named the "{Api.CurrentCountry.Token} COIN"</p>
            <p>This coin, will be used by everyone for all daily transactions</p>
          </div>
          <div className="Information">
            <p>The support national crypto of {Api.CurrentCountry.Name} will be named the "{Api.CurrentCountry.Token} TOKEN"</p>
            <p>This token, will be used by poorer people for all basic needs like healthcare, education and groceries</p>
          </div>
          <div className="ExtraMessage"><BsFillQuestionDiamondFill />Default parameters will be applied. They can be changed latter on!</div>
          </div>
        </div>
        <div className="InitiaFixedlParams">
          <div style={{position:"relative"}}>
            <div className="Param-1">
              <div className="Options">

                <div onClick={()=>setCountryType([Base.AllCountryTypes[0].Type[0],Base.AllCountryTypes[0].Type[1],Base.AllCountryTypes[0].Type[2]])} className={CountryType[0]==1?"Selected Civil":"Civil"}>
                  <div>
                    <div>
                    <span style={{ transform: "rotate(-55deg)" }}>D</span>
                    <span style={{ transform: "rotate(-45deg)" }}>i</span>
                    <span style={{ transform: "rotate(-35deg)" }}>c</span>
                    <span style={{ transform: "rotate(-25deg)" }}>t</span>
                    <span style={{ transform: "rotate(-15deg)" }}>a</span>
                    <span style={{ transform: "rotate(-5deg)" }}>t</span>
                    <span style={{ transform: "rotate(5deg)" }}>o</span>
                    <span style={{ transform: "rotate(15deg)" }}>r</span>
                    <span style={{ transform: "rotate(25deg)" }}>s</span>
                    <span style={{ transform: "rotate(35deg)" }}>h</span>
                    <span style={{ transform: "rotate(45deg)" }}>i</span>
                    <span style={{ transform: "rotate(55deg)" }}>p</span>
                    </div>
                  </div>
                </div>

                <div onClick={()=>setCountryType([Base.AllCountryTypes[1].Type[0],Base.AllCountryTypes[1].Type[1],Base.AllCountryTypes[1].Type[2]])} className={CountryType[0]==2?"Selected Civil":"Civil"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-40deg)" }}>D</span>
                      <span style={{ transform: "rotate(-30deg)" }}>e</span>
                      <span style={{ transform: "rotate(-20deg)" }}>m</span>
                      <span style={{ transform: "rotate(-10deg)" }}>o</span>
                      <span style={{ transform: "rotate(0deg)" }}>c</span>
                      <span style={{ transform: "rotate(10deg)" }}>r</span>
                      <span style={{ transform: "rotate(20deg)" }}>a</span>
                      <span style={{ transform: "rotate(30deg)" }}>c</span>
                      <span style={{ transform: "rotate(40deg)" }}>y</span>
                    </div>
                  </div>
                </div>
                <div onClick={()=>setCountryType([Base.AllCountryTypes[2].Type[0],Base.AllCountryTypes[2].Type[1],Base.AllCountryTypes[2].Type[2]])} className={CountryType[0]==3?"Selected Civil":"Civil"}>
                  <div>
                  <div>
                      <span style={{ transform: "rotate(-35deg)" }}>R</span>
                      <span style={{ transform: "rotate(-25deg)" }}>e</span>
                      <span style={{ transform: "rotate(-15deg)" }}>p</span>
                      <span style={{ transform: "rotate(-5deg)" }}>u</span>
                      <span style={{ transform: "rotate(5deg)" }}>b</span>
                      <span style={{ transform: "rotate(15deg)" }}>l</span>
                      <span style={{ transform: "rotate(25deg)" }}>i</span>
                      <span style={{ transform: "rotate(35deg)" }}>c</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Param-2">
              <div className="Options">
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[0].Type[0],Base.AllGunControlTypes[0].Type[1],Base.AllGunControlTypes[0].Type[2]])} className={GunControlType[0]==1?"Selected Guns":"Guns"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-40deg)" }}>T</span>
                      <span style={{ transform: "rotate(-30deg)" }}>o</span>
                      <span style={{ transform: "rotate(-20deg)" }}>t</span>
                      <span style={{ transform: "rotate(-10deg)" }}>a</span>
                      <span style={{ transform: "rotate(0deg)" }}>l</span>
                      <span style={{ transform: "rotate(10deg)" }}></span>
                      <span style={{ transform: "rotate(20deg)" }}>b</span>
                      <span style={{ transform: "rotate(30deg)" }}>a</span>
                      <span style={{ transform: "rotate(40deg)" }}>n</span>
                    </div>
                  </div>
                </div>
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[1].Type[0],Base.AllGunControlTypes[1].Type[1],Base.AllGunControlTypes[1].Type[2]])} className={GunControlType[0]==2?"Selected Guns":"Guns"}>
                  <div>
                    <div>
                        <span style={{ transform: "rotate(-30deg)" }}>L</span>
                        <span style={{ transform: "rotate(-20deg)" }}>i</span>
                        <span style={{ transform: "rotate(-10deg)" }}>m</span>
                        <span style={{ transform: "rotate(0deg)" }}>i</span>
                        <span style={{ transform: "rotate(10deg)" }}>t</span>
                        <span style={{ transform: "rotate(20deg)" }}>e</span>
                        <span style={{ transform: "rotate(30deg)" }}>d</span>
                      </div>
                    </div>
                  </div>
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[2].Type[0],Base.AllGunControlTypes[2].Type[1],Base.AllGunControlTypes[2].Type[2]])} className={GunControlType[0]==3?"Selected Guns":"Guns"}>
                  <div>
                    <div>
                        <span style={{ transform: "rotate(-40deg)" }}>U</span>
                        <span style={{ transform: "rotate(-30deg)" }}>n</span>
                        <span style={{ transform: "rotate(-20deg)" }}>l</span>
                        <span style={{ transform: "rotate(-10deg)" }}>i</span>
                        <span style={{ transform: "rotate(0deg)" }}>m</span>
                        <span style={{ transform: "rotate(10deg)" }}>i</span>
                        <span style={{ transform: "rotate(20deg)" }}>t</span>
                        <span style={{ transform: "rotate(30deg)" }}>e</span>
                        <span style={{ transform: "rotate(40deg)" }}>d</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Param-3">
              <div className="Options">
                <div onClick={()=>setAllianceType([Base.AllAllianceType[0].Type[0],Base.AllAllianceType[0].Type[1],Base.AllAllianceType[0].Type[2]])} className={AllianceType[0]==1?"Selected Allies":"Allies"}>
                  <div>
                  <div>
                      <span style={{ transform: "rotate(-15deg)" }}>S</span>
                      <span style={{ transform: "rotate(-5deg)" }}>o</span>
                      <span style={{ transform: "rotate(5deg)" }}>l</span>
                      <span style={{ transform: "rotate(15deg)" }}>o</span>
                  </div>
                  </div>
                </div>
                <div onClick={()=>setAllianceType([Base.AllAllianceType[1].Type[0],Base.AllAllianceType[1].Type[1],Base.AllAllianceType[1].Type[2]])} className={AllianceType[0]==2?"Selected Allies":"Allies"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-25deg)" }}>L</span>
                      <span style={{ transform: "rotate(-15deg)" }}>e</span>
                      <span style={{ transform: "rotate(-5deg)" }}>a</span>
                      <span style={{ transform: "rotate(5deg)" }}>g</span>
                      <span style={{ transform: "rotate(15deg)" }}>u</span>
                      <span style={{ transform: "rotate(25deg)" }}>e</span>
                    </div>
                  </div>
                </div>
                <div onClick={()=>setAllianceType([Base.AllAllianceType[2].Type[0],Base.AllAllianceType[2].Type[1],Base.AllAllianceType[2].Type[2]])} className={AllianceType[0]==3?"Selected Allies":"Allies"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-25deg)" }}>T</span>
                      <span style={{ transform: "rotate(-15deg)" }}>r</span>
                      <span style={{ transform: "rotate(-5deg)" }}>e</span>
                      <span style={{ transform: "rotate(5deg)" }}>a</span>
                      <span style={{ transform: "rotate(15deg)" }}>t</span>
                      <span style={{ transform: "rotate(25deg)" }}>y</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="InitiateTheNation">
          <div className={IsReady?"Ready":"NoEvents"} onClick={IsReady?()=>ReadyToInitiate(CountryType,GunControlType,AllianceType):null}>
            <div>{!IsReady? "Waiting for selection" :"Process"}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );

}


