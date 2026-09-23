import React, { useState,useRef,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { calculateProperties} from '../../../Redux/features/PortfolioReducer';
import { apiRequest } from '../../../Redux/features/ApiReducer';

export default function Revenue({User,ChangeSelection,UpdateWallet,callContractFunction}) {
    const Api = useSelector((state) => state.Api);
    const dispatch = useDispatch();

    const [ActiveTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);

    const [Taxes, setTaxes] = useState(0);
    const [Subsidy, setSubsidy] = useState(0);

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
        {ActiveTab==0?<label>REVENUE</label>:null}
        {ActiveTab==1?<label>TAXATION</label>:null}
        {ActiveTab==2?<label>SYBSIDY</label>:null}

        <div className="Revenue">
        <div className="ChangeSelection" onClick={()=>ActiveTab==0?ChangeSelection():setActiveTab(0)}><FaArrowLeft /></div>
            <div>
                {ActiveTab==0?
                <>
                
                
                <div className="Main-button" onClick={()=>setActiveTab(1)}>TAXATION</div>
                <div className="Main-button" onClick={()=>setActiveTab(2)}>SYBSIDY</div>
                </>
                :null}

                {ActiveTab==1?
                <div className="Inflate">
                    <div>
                            <span>Amount:</span> 
                            <input type="text" maxlength="4" value={Taxes}
                            onChange={(e)=>handleInputChange(e,setTaxes)}/>
                    </div>
                    <div className="Process">
                        <div className={Taxes>0 && !loading?"Ready":"NoEvents"} onClick={Taxes>0?()=>
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
                                        "iniCirculation": Number("-"+Taxes),
                                    },
                                    auth: true,
                                    tokenRequired: true,
                                    storeIn: 'UpdateTheCoin' // Specify where to store the response
                                    })
                                )
                            }
                            :null}>
                            <div>{!Taxes>0? "Waiting for amount" :loading?<>Processing <BiLoaderCircle/></>:"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
                {ActiveTab==2?
                <div className="Deflate">
                    <div>
                            <span>Amount:</span> 
                            <input type="text" maxlength="4" value={Subsidy}
                            onChange={(e)=>handleInputChange(e,setSubsidy)}/>
                    </div>
                    <div className="Process">
                        <div className={Subsidy>0 && !loading?"Ready":"NoEvents"} onClick={Subsidy>0?()=>
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
                                        "iniCirculation": Subsidy,
                                    },
                                    auth: true,
                                    tokenRequired: true,
                                    storeIn: 'UpdateTheCoin' // Specify where to store the response
                                    })
                                )
                            }
                            :null}>
                            <div>{!Subsidy>0? "Waiting for amount" :loading?<>Processing <BiLoaderCircle/></>:"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        </div>
    </>
)
}

//Generic handling of input change
const handleInputChange= (e,set) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');  // Allow only numbers
    set(newValue);
};
