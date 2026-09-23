import React, { useState,useRef,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from '../../../Redux/features/ApiReducer';
export default function Lending(props) {
    const Api = useSelector((state) => state.Api);
    const dispatch = useDispatch();

    const [ActiveTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const [LoanBanks, setLoanBanks] = useState(0); 
    const [InterestBanks, setInterestBanks] = useState(0);
    const [InterestYearsBanks, setInterestYearsBanks] = useState(0);
    const [LoanInvestors, setLoanInvestors] = useState(0);
    const [InterestInvestors, setInterestInvestors] = useState(0);
    const [InterestYearsInvestors, setInterestYearsInvestors] = useState(0);

    var LoanBanksReady = LoanBanks>0  && InterestBanks>0 && InterestYearsBanks>0 && !loading;
    var LoanBanksWaiting = LoanBanks>0  && InterestBanks>0 && InterestYearsBanks>0;
    var LoanInvestorsReady = LoanInvestors>0  && InterestInvestors>0 && InterestYearsInvestors>0 && !loading;
    var LoanInvestorsWaiting = LoanInvestors>0  && InterestInvestors>0 && InterestYearsInvestors>0;


    const [GuardA, setGuardA] = useState(false);
    useEffect(() => {
        if(GuardA){
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
    }, [Api.UpdateTheCoin]);

   return (
    <>
    {ActiveTab==0?<label>LENDING</label>:null}
    {ActiveTab==1?<label>LOAN BANKS</label>:null}
    {ActiveTab==2?<label>LOAN INVESTORS</label>:null}


        <div className="Lending">
        <div className="ChangeSelection" onClick={()=>ActiveTab==0?props.ChangeSelection():setActiveTab(0)}><FaArrowLeft /></div>
            <div>
                {ActiveTab==0?
                <>
                
                
                <div className="Main-button" onClick={()=>setActiveTab(1)}>LOAN BANKS</div>
                <div className="Main-button" onClick={()=>setActiveTab(2)}>LOAN INVESTORS</div>
                </>
                :null}

                {ActiveTab==1?
                <div className="LoanBanks">
                    <div>
                        <div>
                            <span>Amount:</span> 
                            <input type="text" maxlength="4" value={LoanBanks}
                            onChange={(e)=>handleInputChange(e,setLoanBanks)}/>
                        </div>
                        <div>
                            <span>Rate:</span> 
                            <input type="text" maxlength="4" value={InterestBanks}
                            onChange={(e)=>handleInputChange(e,setInterestBanks)}/>
                        </div>
                        <div>
                            <span>Years:</span> 
                            <input type="text" maxlength="4" value={InterestYearsBanks}
                            onChange={(e)=>handleInputChange(e,setInterestYearsBanks)}/>
                        </div>
                        <div>
                            <span>Grand total:</span> 
                            <input type="text" maxlength="4" disabled 
                            value={calculateFutureValue(LoanBanks, InterestBanks, InterestYearsBanks)}/>
                        </div>
                            
                    </div>
                    <div className="Process">
                        <div className={LoanBanksReady?"Ready":"NoEvents"} onClick={LoanBanksReady?()=>
                        {
                            setGuardA(true);
                            dispatch(
                                apiRequest({
                                flatten: true,
                                name:"TheCoin.jsx | UpdateTheCoin",
                                url: 'api/CryptoNations/UpdateTheCoin/'+Api.CurrentCountry.Id,
                                method: 'PUT',
                                body: {
                                    "typeOf": "NationalCoin",
                                    "bankingDept": LoanBanks,
                                },
                                auth: true,
                                tokenRequired: true,
                                storeIn: 'UpdateTheCoin' // Specify where to store the response
                                })
                            )
                        }
                            :null}>
                            <div>{!LoanBanksWaiting? "Waiting for amounts" :loading?<>Processing <BiLoaderCircle/></>:"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
                {ActiveTab==2?
                <div className="LoanInvestors">
                <div>   
                    <div>
                        <span>Amount:</span> 
                        <input type="text" maxlength="4" value={LoanInvestors}
                        onChange={(e)=>handleInputChange(e,setLoanInvestors)}/>
                    </div>
                    <div>
                        <span>Rate:</span> 
                        <input type="text" maxlength="4" value={InterestInvestors}
                        onChange={(e)=>handleInputChange(e,setInterestInvestors)}/>
                    </div>
                    <div>
                        <span>Years:</span> 
                        <input type="text" maxlength="4" value={InterestYearsInvestors}
                        onChange={(e)=>handleInputChange(e,setInterestYearsInvestors)}/>
                    </div>
                    <div>
                        <span>Grand total:</span> 
                        <input type="text" maxlength="4" disabled 
                        value={calculateFutureValue(LoanInvestors, InterestInvestors, InterestYearsInvestors)}/>
                    </div>
                </div>
                <div className="Process">
                    <div className={LoanInvestorsReady?"Ready":"NoEvents"} onClick={LoanInvestorsReady?()=>
                        {
                            setGuardA(true);
                            dispatch(
                                apiRequest({
                                flatten: true,
                                name:"TheCoin.jsx | UpdateTheCoin",
                                url: 'api/CryptoNations/UpdateTheCoin/'+Api.CurrentCountry.Id,
                                method: 'PUT',
                                body: {
                                    "typeOf": "NationalCoin",
                                    "investmentDept": LoanInvestors,
                                },
                                auth: true,
                                tokenRequired: true,
                                storeIn: 'UpdateTheCoin' // Specify where to store the response
                                })
                            )
                        }
                        :null}>
                        <div>{!LoanInvestorsWaiting? "Waiting for amounts" :loading?<>Processing <BiLoaderCircle/></>:"Process"}</div>
                    </div>
                </div>
            </div>
                :null}
            </div>

       </div>
       </>)
}
const handleInputChange= (e,set) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');  // Allow only numbers
    set(newValue);
  };
  function calculateFutureValue(principal, rate, years) {
    const futureValue = principal * Math.pow(1 + rate / 100, years);
    return futureValue.toFixed(2); // Rounded to 2 decimal places
  }
