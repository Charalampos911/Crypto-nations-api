import React, { useState,useRef,useEffect } from 'react';
import { UpdateNationFundationalEvents } from '../../../Redux/features/NationReducer';
import { useSelector, useDispatch } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { apiRequest } from '../../../Redux/features/ApiReducer';
export default function FoundationalEvents(props) {
  const Base = useSelector((state) => state.Base);
    const Api = useSelector((state) => state.Api);
    const dispatch = useDispatch();
    const [CountryType, setCountryType] = useState(0);
    const [GunControlType, setGunControlType] = useState(0);
    const [AllianceType, setAllianceType] = useState(0);


    var InitatedNation = Api.CurrentCountry;

    var GovType = Api.CurrentCountry.Categories.find(e=>e.TypeOf=="GovType" && e.IsActive)
    var GunControl = Api.CurrentCountry.Categories.find(e=>e.TypeOf=="GunControl" && e.IsActive)
    var Alliance = Api.CurrentCountry.Categories.find(e=>e.TypeOf=="Alliance" && e.IsActive)

    // var IsReady =true;
 var IsReady  = (CountryType !==0 && CountryType[0]!==GovType.Class) || (GunControlType !==0 && GunControlType[0]!==GunControl) || (AllianceType!==0 && AllianceType[0]!==Alliance);
    



 const EventGunControl=useRef([
  {EventType:1,TypeName: "Total Ban",Gains:75,Name:"Ban the legal ownership of guns",Desc:"Turn the nation towards total gun control",EthCost:1},
  {EventType:2,TypeName: "Home Defence",Gains:100,Name:"Introduce limitations on owning guns",Desc:"Declare that guns are for home defence only",EthCost:1},
  {EventType:3,TypeName: "Open Carry",Gains:125,Name:"Declare the totality of the second amendment",Desc:"All guns will be allowed,everywhere at any time!",EthCost:1}
  ])
  const EventAlliance=useRef([
  {EventType:1,TypeName: "Solo Campaign",Gains:75,Name:"We are lone warriors",Desc:"This nation fights alone",EthCost:1},
  {EventType:2,TypeName: "Small Alliance",Gains:100,Name:"We are a pack of wolves",Desc:"This nation becomes part of a small alliance",EthCost:1},
  {EventType:3,TypeName: "Intercontinental Block",Gains:125,Name:"We transcend continents",Desc:"Becomes part of an intercontinental block",EthCost:1}
  ])

 const EventCountryType=useRef([{
      EventType:1,// when is a dictatorship
      
      Available:true,
      set:[
          {val:2,TypeName: "Democracy",Gains:100,Name:"Coup d'état",Desc:"Change dictatorship into a democracy!",EthCost:1},
          {val:3,TypeName: "Republic",Gains:125,Name:"Nation wide referendum",Desc:"Change dictatorship into a republic!",EthCost:1}
      ]
    },{
      EventType:2, // when is a democracy
    
      Available:true,
      set:[
          {val:1,TypeName: "Dictatorship",Gains:75,Name:"Coup d'état",Desc:"Change democracy into a dictatorship!",EthCost:1},
          {val:3,TypeName: "Republic",Gains:125,Name:"Domestic overthrow",Desc:"Change democracy into a republic!",EthCost:1}
      ]
    },{
      EventType:3, // when is a republic

      Available:true,
      set:[
          {val:2,TypeName: "Democracy",Gains:100,Name:"Break the republic",Desc:"Change republic into a democracy!",EthCost:1},
          {val:1,TypeName: "Dictatorship",Gains:75,Name:"Revolution",Desc:"Change republic into a dictatorship!",EthCost:1}
      ]
    }
  ])







    const [Updated, setUpdated] = useState(0);
    useEffect(() => {
      if(Updated>0){
        dispatch(
          apiRequest({
            flatten: true,
            name:"FoundationalEvents.jsx | FullNation",
            url: 'api/CryptoNations/FullNation/'+Api.CurrentCountry.Id,
            method: 'GET',
            body: null,
            auth: true,
            tokenRequired: true,
            storeIn: 'CurrentCountry' // Specify where to store the response
          })
        );
      }
    }, [Api.SetAcategory]);
    const HandleEvent =(e)=>{
      setUpdated(Updated+1)



      dispatch(
          apiRequest({
            name:"FoundationalEvents.jsx | SetAcategory",
            url: 'api/CryptoNations/SetAcategory/'+Api.CurrentCountry.Id,
            method: 'PUT',
            body: {
                categoryName: e[2],
                value: e[3],
                gains: e[3]
              },
            auth: true,
            tokenRequired: true,
            storeIn: "SetAcategory" // Specify where to store the response
          })
        );
  };
   return (
    <div className="Foundational-events">
              <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
              <label>FOUNDATIONAL EVENTS</label>
              <div className="Options">
              <div onClick={()=>setCountryType(["GovType",1,"Dictatorship",75])} className={ (CountryType==0 && GovType.Class==1) || CountryType[1]==1?"Selected Civil":"Civil"}>
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

                <div onClick={()=>setCountryType(["GovType",2,"Democracy",100])} className={(CountryType==0 && GovType.Class==2) || CountryType[1]==2?"Selected Civil":"Civil"}>
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
                <div onClick={()=>setCountryType(["GovType",3,"Republic",125])} className={(CountryType==0 && GovType.Class==3) || CountryType[1]==3?"Selected Civil":"Civil"}>
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
              <div className="Options">
                <div onClick={()=>setGunControlType(["GunControl",1,"Total Ban",75])} className={( GunControlType==0 && GunControl.Class==1) || GunControlType[1]==1?"Selected Guns":"Guns"}>
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
                <div onClick={()=>setGunControlType(["GunControl",2,"Home Defence",100])} className={( GunControlType==0 && GunControl.Class==2) || GunControlType[1]==2?"Selected Guns":"Guns"}>
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
                <div onClick={()=>setGunControlType(["GunControl",3,"Open Carry",125])} className={( GunControlType==0 && GunControl.Class==3) || GunControlType[1]==3?"Selected Guns":"Guns"}>
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
              <div className="Options">
                <div onClick={()=>setAllianceType(["Alliance",1,"Solo Campaign",75])} className={( AllianceType==0 && Alliance.Class==1) || AllianceType[1]==1?"Selected Allies":"Allies"}>
                  <div>
                  <div>
                      <span style={{ transform: "rotate(-15deg)" }}>S</span>
                      <span style={{ transform: "rotate(-5deg)" }}>o</span>
                      <span style={{ transform: "rotate(5deg)" }}>l</span>
                      <span style={{ transform: "rotate(15deg)" }}>o</span>
                  </div>
                  </div>
                </div>
                <div onClick={()=>setAllianceType(["Alliance",2,"Small Alliance",100])} className={( AllianceType==0 && Alliance.Class==2) || AllianceType[1]==2?"Selected Allies":"Allies"}>
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
                <div onClick={()=>setAllianceType(["Alliance",3,"Intercontinental Block",125])} className={( AllianceType==0 && Alliance.Class==3) || AllianceType[1]==3?"Selected Allies":"Allies"}>
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
            <div className="UpdateFundationalEvents Process-Button">
              <div className={IsReady?"Ready":"NoEvents"} onClick={IsReady?()=>(CountryType !==0?HandleEvent(CountryType):null,GunControlType !==0?HandleEvent(GunControlType):null,AllianceType !==0?HandleEvent(AllianceType):null):null}>
                  <div>{!IsReady? "Waiting for selection":"Process"}</div>
              </div>
            </div>
    </div>)
}