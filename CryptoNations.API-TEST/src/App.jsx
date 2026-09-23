
import React, { useState,useRef,useEffect } from 'react';
import APITest from './assets/Testing-Template'
export const BASE_URL = "http://localhost:5000";
import "./Testing-Template.scss";

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [AutorunCounter, setAutorunCounter] = useState(0);
  const [currentlyFullScreen, setCurrentlyFullScreen] = useState(null);

  const [Users, setUsers] = useState(null);
  const [UserA, setUserA] = useState(null);
  const [UserB, setUserB] = useState(null);
  const [CoinA, setCoinA] = useState(null);
  const [CoinB, setCoinB] = useState(null);


  const [CoinsA, setCoinsA] = useState(null);
  const [CoinsB, setCoinsB] = useState(null);

  const [SelectingA, setSelectingA] = useState(null);
  const [SelectingB, setSelectingB] = useState(null);
  const [SelectingC, setSelectingC] = useState(null);
  const [SelectingD, setSelectingD] = useState(null);

  console.log("UserA=",UserA)
  console.log("CoinsA=",CoinsA)
  console.log("CoinA=",CoinA)
  console.log("UserB=",UserB)
  console.log("CoinsB=",CoinsB)
  console.log("CoinB=",CoinB)
//Exchange
  const [StepA, setStepA] = useState(null);
  
  useEffect(() => {
    fetchToken(setToken,setError);
  }, []);
  useEffect(() => {
    fetchAllUsers(token,setUsers);
  }, [token]);
  useEffect(() => {
    fetchUserPortfolio(token,UserA,setCoinsA)
  }, [UserA]);
  useEffect(() => {
    fetchUserPortfolio(token,UserB,setCoinsB)
  }, [UserB]);

const handleFullScreen=(TestId)=>{
  setCurrentlyFullScreen(TestId)
}

const handleStepA=(pre)=>{
  setStepA(pre);
}
  return (
    <>
    {token==null?null:
    <div id="API-TESTING">
      <div id="GlobalControls">
        <div>
          <label>UserA:</label>
         
          <div className='Selected' onClick={()=>setSelectingA(!SelectingA)}>
            <div>{UserA?UserA.Name:"NOT SET"}</div>
          </div>
        
          {SelectingA?
          <div>
            <div>
            {Users && Users.map((item,index) => (
            <div onClick={()=>(setUserA(item),setUserB(null),setSelectingA(false),setCoinA(null),setCoinB(null),setSelectingB(false),setSelectingC(false),setSelectingD(false))} key={index}>{item.Name}</div>
            ))}
            </div>
          </div>
          :null}
        </div>
          
        <div>
          <label>CoinA:</label>
         
          <div className='Selected' onClick={()=>setSelectingC(!SelectingC)}>
            <div>{CoinA?CoinA.Name:"NOT SET"}</div>
          </div>
        
          {SelectingC?
          <div>
            <div>
              {UserA && UserA.IsInitiated?null:<div>UserA not initiated</div>}
              {UserA && UserA.IsInitiated && CoinsA && CoinsA.map((item,index) => (
              <div onClick={()=>(setCoinA(item),setSelectingC(false))} key={index}>{item.Name}</div>
              ))}
            </div>
          </div>
          :null}
        </div>

        <div>
          <label>UserB:</label>
         
          <div className='Selected' onClick={()=>setSelectingB(!SelectingB)}>
            <div>{UserB?UserB.Name:"NOT SET"}</div>
          </div>
        
          {SelectingB?
          <div>
            <div>
              {Users && Users.map((item,index) => (
              <div className={item==UserA?'Unavailable':null} onClick={()=>(setUserB(item),setSelectingB(false))} key={index}>{item.Name}</div>
              ))}
            </div>
          </div>
          :null}
        </div>
        
        <div>
          <label>CoinB:</label>
         
          <div className='Selected' onClick={()=>setSelectingD(!SelectingD)}>
            <div>{CoinB?CoinB.Name:"NOT SET"}</div>
          </div>
        
          {SelectingD?
          <div>
            <div>
              {UserB && UserB.IsInitiated?null:<div>CoinB not initiated</div>}
              {UserB && UserB.IsInitiated && CoinsB && CoinsB.map((item,index) => (
              <div onClick={()=>(setCoinB(item),setSelectingD(false))} key={index}>{item.Name}</div>
              ))}
            </div>
          </div>
          :null}
        </div>
        <div className="AutoTest" onClick={()=>setAutorunCounter(AutorunCounter+1)}><span>TEST ALL</span></div>
      </div>
      <APITest
        token={token}
        method={"GET"}
        dataEndpoint="/api/CryptoNations/NationsWithQuery?pageNumber=1&pageSize=1000"
        dataBody={null}
        FullScreen={handleFullScreen}
        TestId={1}
        isFullScreen={currentlyFullScreen==1?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"GET"}
        dataEndpoint={"/api/CryptoNations/FullNation/" + UserA?.Id} //Test Item Id=10
        dataBody={null}
        FullScreen={handleFullScreen}
        TestId={2}
        isFullScreen={currentlyFullScreen==2?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"PUT"}
        dataEndpoint={"/api/CryptoNations/InitiateNation/" + UserA?.Id}
        dataBody={[
          {
            initiateTheTypeOf:"GovType",
            setItsClassTo: 1, //Type = 1 = Dictatorship
          },
          {
            initiateTheTypeOf: "GunControl",
            setItsClassTo: 1, //Type = 1 = Total ban
          },
          {
            initiateTheTypeOf: "Alliance",
            setItsClassTo: 1, //Type = 1 = Solo
          }
        ]}
        FullScreen={handleFullScreen}
        TestId={3}
        isFullScreen={currentlyFullScreen==3?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"PUT"}
        dataEndpoint={"/api/CryptoNations/InitiateNation/" + UserB?.Id}
        dataBody={[
          {
            initiateTheTypeOf:"GovType",
            setItsClassTo: 1, //Type = 1 = Dictatorship
          },
          {
            initiateTheTypeOf: "GunControl",
            setItsClassTo: 1, //Type = 1 = Total ban
          },
          {
            initiateTheTypeOf: "Alliance",
            setItsClassTo: 1, //Type = 1 = Solo
          }
        ]}
        FullScreen={handleFullScreen}
        TestId={31}
        isFullScreen={currentlyFullScreen==31?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"PUT"}
        dataEndpoint={"/api/CryptoNations/SetAcategory/" + UserA?.Id}
        dataBody={{
          categoryName: "Uneducated", //Testing the "Uneducated" category
          value: 55, //Test value at 55
          gains: 125 //Test gains at 125
        }}
        FullScreen={handleFullScreen}
        TestId={4}
        isFullScreen={currentlyFullScreen==4?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"PUT"}
        dataEndpoint={"/api/CryptoNations/UpdateTheCoin/" + UserA?.Id}
        dataBody={{
          "typeOf": "NationalCoin",
          "inflation": 6, //Test increase inflation by 6
        }}
        FullScreen={handleFullScreen}
        TestId={5}
        isFullScreen={currentlyFullScreen==5?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"GET"}
        dataEndpoint={"/api/CryptoNations/GetNationalPortfolio/" + UserA?.Id}
        dataBody={null}
        FullScreen={handleFullScreen}
        TestId={7}
        isFullScreen={currentlyFullScreen==7?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"GET"}
        dataEndpoint={"/api/CryptoNations/GetNationalPortfolio/" + UserB?.Id}
        dataBody={null}
        FullScreen={handleFullScreen}
        TestId={71}
        isFullScreen={currentlyFullScreen==71?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"GET"}
        dataEndpoint={"/api/CryptoNations/GetNationalSellOrders/" + UserA?.Id}
        dataBody={null}
        FullScreen={handleFullScreen}
        TestId={8}
        isFullScreen={currentlyFullScreen==8?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"GET"}
        dataEndpoint={"/api/CryptoNations/GetOtherSellOrders/" + UserA?.Id}
        dataBody={null}
        FullScreen={handleFullScreen}
        TestId={9}
        isFullScreen={currentlyFullScreen==9?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"PUT"}
        dataEndpoint={CoinA != null ? "/api/CryptoNations/SellOrder/" + (CoinA?.Id? CoinA.Id: null) : null}
        dataBody={{
          sellOrderAmount: 4, //Test sell 4
        }}
        FullScreen={handleFullScreen}
        TestId={10}
        isFullScreen={currentlyFullScreen==10?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"PUT"}
        dataEndpoint={CoinB != null ? "/api/CryptoNations/SellOrder/" + (CoinB?.Id? CoinB.Id: null) : null}
        dataBody={{
          sellOrderAmount: 4, //Test sell 4
        }}
        FullScreen={handleFullScreen}
        TestId={11}
        isFullScreen={currentlyFullScreen==11?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />

      <APITest
        token={token}
        method={"POST"}
        dataEndpoint={CoinA != null && CoinB != null ? "/api/CryptoNations/ExchangeCoinsStepA": null}
        dataBody={{
          CoinA: (CoinA?.Id? CoinA.Id: null),
          AmountA: 2,  //Test trade of 2 of CoinA for X amount of CoinB
          CoinB: (CoinB?.Id? CoinB?.Id: null)
        }}
        FullScreen={handleFullScreen}
        TestId={12}
        isFullScreen={currentlyFullScreen==12?true:false}
        returns={handleStepA}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
      <APITest
        token={token}
        method={"POST"}
        dataEndpoint={CoinA != null && CoinB != null && StepA != null ? "/api/CryptoNations/ExchangeCoinsStepB": null}
        dataBody={{
          CoinA: StepA?StepA.CoinA:null,
          AmountA: StepA?StepA.AmountA:null,
          CoinB: StepA?StepA.CoinB:null,
          AmountB: StepA?StepA.AmountB:null
        }}
        FullScreen={handleFullScreen}
        TestId={13}
        isFullScreen={currentlyFullScreen==13?true:false}
        returns={(e)=>console.log(e)}
        ResetA={UserA}
        ResetB={UserB}
        Autorun={AutorunCounter}
      />
    </div>
      }
    </>
  );
}
export default App;



const fetchToken = async (setToken,setError) => {
  try {
    const response = await fetch(BASE_URL + '/api/v1/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          Username: "Harry@gmail.com",
          Password: "123456"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setToken(data.JwtToken); // adjust based on the structure of your API response
    console.log("data.access_token==",data.JwtToken)
  } catch (err) {
    setError(err.message);
  }
};
const fetchAllUsers = async (token,setUsers) => {
  try {
    const response = await fetch(BASE_URL + '/api/CryptoNations/NationsWithQuery?pageNumber=1&pageSize=1000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setUsers(data);

    console.log("Users==",data)
  } catch (err) {
    console.warn("error:",err)
  }
};
const fetchUserPortfolio = async (token,UserA,setCoinsA) => { 
  try {
    const response = await fetch(BASE_URL + '/api/CryptoNations/GetNationalPortfolio/'+UserA?.Id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCoinsA(data);

    console.log("CoinsA==",data)
  } catch (err) {
    console.warn("error:",err)
  }
};