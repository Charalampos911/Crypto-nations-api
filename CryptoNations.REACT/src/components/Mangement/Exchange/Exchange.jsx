import React, { useState,useRef,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";

import { HiMiniMinusSmall } from "react-icons/hi2";
import { BiDownArrow } from "react-icons/bi";
import { HiSelector } from "react-icons/hi";
import { TiInfoOutline } from "react-icons/ti";
import { UpdateProperty,ExchangeCoinAtoCoinB,SellOtherHolding} from '../../../Redux/features/PortfolioReducer';
import { apiRequest } from '../../../Redux/features/ApiReducer';
export default function Exchange(props) {
    
   const [ActiveTab, setActiveTab] = useState(0);

   const [CoinA, setCoinA] = useState(null);  
   const [ForSaleAmount, setForSaleAmount] = useState(null);  //Used in Selling orders
   const [AmountA, setAmountA] = useState(null);  //Used in Exchanges

   const [CoinB, setCoinB] = useState(null); 

   const [SelectingA, setSelectingA] = useState(null); 

   const [SelectingB, setSelectingB] = useState(null); 
   const [TempA, SetTempA] = useState(0); 


   const Api = useSelector((state) => state.Api);
   const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(
      apiRequest({
        flatten: false,
        name:"Exchange.jsx | GetNationalPortfolio",
        url: 'api/CryptoNations/GetNationalPortfolio/'+Api.CurrentCountry.Id,
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'Portfolio' // Specify where to store the response
      })
    );
    dispatch(
      apiRequest({
        flatten: false,
        name:"Exchange.jsx | GetNationalSellOrders",
        url: 'api/CryptoNations/GetNationalSellOrders/'+Api.CurrentCountry.Id,
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'SellOrders' // Specify where to store the response
      })
    );
    dispatch(
      apiRequest({
        flatten: false,
        name:"Exchange.jsx | GetOtherSellOrders",
        url: 'api/CryptoNations/GetOtherSellOrders/'+Api.CurrentCountry.Id,
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'OtherSellOrders' // Specify where to store the response
      })
    );
  },[Api.UpdateTheCoin])



    const SellCoinA=()=>{
        dispatch(
            apiRequest({
              flatten: false,
              name:"Exchange.js | SellOrder",
              url: 'api/CryptoNations/SellOrder/'+CoinA.Id,
              method: 'PUT',
              body: {
                  sellOrderAmount: Number(ForSaleAmount),
                },
              auth: true,
              tokenRequired: true,
              storeIn: 'UpdateTheCoin', // Specify where to store the response
            })
          )
        setActiveTab(1)
        setCoinA(null)
        setForSaleAmount(null)
    }

    var UserPortfolio   =  Api.Portfolio;
    var OtherSellOrders   = Api.OtherSellOrders;
    var UserSellOrders   = Api.SellOrders;

    const AllClear=(X)=>{
        if(X=="AB"){
            SetTempA(0)
            setCoinA(null) 
            setCoinB(null)
        }
    }
   return (
<>

        {ActiveTab==0?<label>MARKET</label>:null}
        {ActiveTab==1?<label>PORTFOLIO</label>:null}
        {ActiveTab==10?<label>SELL</label>:null}
        {ActiveTab==2?<label>OWN ORDERS</label>:null}
        {ActiveTab==3?<label>GLOBAL ORDERS</label>:null}
        {ActiveTab==4?<label>EXCHANGE</label>:null}
        <div className="Market">
        <div className="ChangeSelection" onClick={()=>ActiveTab==10?(setActiveTab(1),setCoinA(null)):ActiveTab==0?props.ChangeSelection():setActiveTab(0)}><FaArrowLeft /></div>
            <div>
                {ActiveTab==0?
                <>
                <div className="Main-button" onClick={()=>setActiveTab(1)}>PORTFOLIO</div>
                <div className="Main-button" onClick={()=>setActiveTab(2)}>OWN ORDERS</div>
                <div className="Main-button" onClick={()=>setActiveTab(3)}>GLOBAL ORDERS</div>
                <div className="Main-button" onClick={()=>(setActiveTab(4),setCoinA(null))}>EXCHANGE</div>
                </>
                :null}

                {ActiveTab==1?
                <>
                <div className="Portfolio">                          
                    {UserPortfolio && UserPortfolio.map((item) => (
                    <>
                        {item.HoldingAmount>0?
                        <div className={CoinA && CoinA.Id==item.Id?'Selected':''}>
                            <div onClick={()=>{setCoinA(item)}}> {item.HoldingAmount} <HiMiniMinusSmall /> {item.Acro}</div>
                        </div>
                        :null}
                    </>
                    ))}
                </div>
                {CoinA?
                <div className="Main-button" onClick={()=>setActiveTab(10)}>Sell</div>
                :null}
                </>
                :null}
                {ActiveTab==10?
                <div>
                    <div>
                            <input type="text" maxlength="4" value={ForSaleAmount}
                            onChange={(e) => setForSaleAmount(Number(e.target.value)) }/> {"/ "+CoinA.HoldingAmount +" "+ CoinA.Acro}
                    </div>
                    <div className="Process">
                        <div className={ForSaleAmount>0?"Ready":"NoEvents"} onClick={ForSaleAmount>0?()=>SellCoinA():null}>
                            <div>{!ForSaleAmount>0? "Waiting for amount" :"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
                



                
                {ActiveTab==2?
                <div className='OwnSellOrders'>
                        {UserSellOrders && UserSellOrders.map((HoldingsForSale) => (
                            <React.Fragment key={HoldingsForSale.Id}>
                            {HoldingsForSale.ForSaleAmount > 0 ? 
                                <div>
                                    <div>
                                    <div>{HoldingsForSale.Name}</div><div>{FixThree(HoldingsForSale.ForSaleAmount)} {HoldingsForSale.Acro}</div>
                                    </div>
                                </div>
                            :null}
                            </React.Fragment>
                        ))}
                    
                    {/* :"You are not selling at the time"} */}
                </div>
                :null}
                {ActiveTab==3?
                <div className='GlobalSellOrders OwnSellOrders'>
                    {OtherSellOrders && OtherSellOrders.map((item) => (
                        <React.Fragment key={item.Id}>
                        {item.ForSaleAmount> 0 ? (
                            <div>
                            <div>
                                <div>
                                    {Api.Nations.find(nation=>nation.Id === item.CurrentOwner).Name }
                                    <HiMiniMinusSmall />
                                    {item.Name}
                                </div>
                                <div>
                                    {FixThree(item.ForSaleAmount)
                                     } {item.Acro}
                                </div>
                            </div>
                            </div>
                        ) : (
                            null
                        )}
                        </React.Fragment>
                    ))}
                </div>
                :null}






                {ActiveTab==4?
                <div className="CoinToCoin">
                    <div>
                        <div className='Drop Front'>
                        {SelectingA?<HiSelector onClick={()=>setSelectingA(!SelectingA)}/>:<BiDownArrow onClick={()=>setSelectingA(!SelectingA)}/>}
                        <div className={CoinA?'Selected':'Placeholder'} onClick={()=>(setSelectingA(!SelectingA),setSelectingB(false),console.log("CoinA=",CoinA))}>
                                <div >{CoinA?<>{Number(CoinA.HoldingAmount).toFixed(5)} <HiMiniMinusSmall /> {CoinA.Acro}</>:"Portfolio"}</div>
                        </div> 
                        <div className={SelectingA?"Selecting":""} >
                        <div>
                        {UserPortfolio && UserPortfolio.map((item,index) => (
                            <>
                            {item.HoldingAmount>0?
                            <div className={CoinA && CoinA.Id==item.Id?'CurrentlySelected':''} onClick={()=>(AllClear("AB"),setCoinA(item),setSelectingA(false))}>
                                <span>{index+1}</span>
                                <div > {Number(item.HoldingAmount).toFixed(5)} <HiMiniMinusSmall /> {item.Acro}</div>
                            </div> 
                            :null}
                            </>
                         ))}
                         </div>
                         </div>
                        </div>


                        <div className='Drop Large'>
                        {SelectingB?<HiSelector onClick={()=>setSelectingB(!SelectingB)}/>:<BiDownArrow onClick={()=>setSelectingB(!SelectingB)}/>}
                        <div className={CoinB?'Selected':'Placeholder'} onClick={()=>(setSelectingB(!SelectingB),setSelectingA(false))}>
                        {CoinB?
                            <div className='OtherSellOrders '> 
                                <div>
                                    {CoinB.Name}
                                </div>
                                <div>
                                    {Number(CoinB.ForSaleAmount).toFixed(5)} &nbsp; 
                                    {CoinB.Acro}
                                </div>
                            </div>
                            :"Global orders"}
                        </div> 
                        <div className={SelectingB?"Selecting":""}>
                        <div>
                        {OtherSellOrders && OtherSellOrders.map((SellOrder,index) => (
                            <>
                            {SellOrder.ForSaleAmount>0?
                            <div className={CoinB && CoinB.Id==SellOrder.Id?'CurrentlySelected':''} 
                                onClick={()=>(
                                    AllClear(),
                                    setCoinB(SellOrder),
                                    setSelectingB(false)
                                )}>
                                <span>{index+1}</span>
                                <div className='OtherSellOrders'> 
                                    <div>
                                        {Api.Nations.find(nation=>nation.Id === SellOrder.CurrentOwner).Name }
                                        {/* {SellOrder.Name} */}
                                    </div>
                                    <div>
                                        {Number(SellOrder.ForSaleAmount).toFixed(5)} &nbsp; 
                                        {SellOrder.Acro}
                                    </div>
                                </div>

                            </div> 
                            :null}
                         </>
                        ))}
                         </div>
                         
                         </div>
                        </div>
                    </div>


                    {CoinA && CoinB?
                    <div className='Exchange-Phase-AB'>
                        <div>
                            <div>Amount:</div> 
                            <div>Price:</div>
                            <div>Amount:</div>
                            <div>Price:</div>
                        </div> 
                        <div>     
                            <div>
                                <input 
                                    type="text" 
                                    style={{minWidth:63}}
                                    placeholder={0}
                                    value={TempA}
                                    onChange={(e) => (e.target.value.length==0?(AllClear(),SetTempA(null)):SetTempA(e.target.value),
                                        console.clear(),
                                        console.log("CoinA=",CoinA),
                                        console.log("AmountA=",Number(e.target.value)),
                                        console.log("CoinB=",CoinB),
                                        dispatch(
                                            apiRequest({
                                              flatten: false,
                                              name:"Exchange.js | ExchangeCoinsStepA",
                                              url: 'api/CryptoNations/ExchangeCoinsStepA',
                                              method: 'POST',
                                              body: {
                                                CoinA: CoinA.Id,
                                                AmountA: Number(e.target.value),
                                                CoinB: CoinB.Id
                                              },
                                              auth: true,
                                              tokenRequired: true,
                                              storeIn: 'ExchangeCoinsStepA', // Specify where to store the response
                                            })
                                          )
                                        )} 
                                /> {CoinA.Acro}
                            </div>
               
                             <div style={{widtminWidthh:67}}>{Api.ExchangeCoinsStepA?(Number(Api.ExchangeCoinsStepA.ValuationA)/100).toFixed(5):0}</div>
                
                             <div><div style={{minWidth:67,maxWidth:100,overflowY: 'hidden'}}>{Api.ExchangeCoinsStepA?Api.ExchangeCoinsStepA.AmountB:0}</div> {CoinB.Acro}</div>
                 
                             <div>{Api.ExchangeCoinsStepA?(Number(Api.ExchangeCoinsStepA.ValuationB)/100).toFixed(5):0}</div>
                        </div>
                    </div>
                    :<div className='msg-0'><TiInfoOutline/> Please select assets to preceed</div>}
                    <div className="Process">
                        <div className={Api.ExchangeCoinsStepA && Api.ExchangeCoinsStepA.AmountB>0?"Ready":"NoEvents"} onClick={()=>Api.ExchangeCoinsStepA.AmountB?CoinA.Id == CoinB.Id?alert("Can not trade "+CoinA.name+" for "+ CoinB.name):
                        <>
                            {Api.ExchangeCoinsStepA.AmountB?
                            dispatch(
                                apiRequest({
                                  flatten: false,
                                  name:"Exchange.js | ExchangeCoinsStepB",
                                  url: 'api/CryptoNations/ExchangeCoinsStepB',
                                  method: 'POST',
                                  body: {
                                    CoinA: Api.ExchangeCoinsStepA.CoinA,
                                    AmountA: Api.ExchangeCoinsStepA.AmountA,
                                    CoinB: Api.ExchangeCoinsStepA.CoinB,
                                    AmountB: Api.ExchangeCoinsStepA.AmountB
                                  },
                                  auth: true,
                                  tokenRequired: true,
                                  storeIn: 'UpdateTheCoin', // Specify where to store the response
                                })
                            ):null}
                        </>
                            :null}>
                            <div>{Api.ExchangeCoinsStepA && !Api.ExchangeCoinsStepA.AmountB>0? "Waiting for amount":"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        </div>
    </>
    )
}
function FixThree(Num){
    return Number(Num).toFixed(3);
  }