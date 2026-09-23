import React, { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { apiRequest } from '../../../Redux/features/ApiReducer';
export default function Stats(props) {

    const Api = useSelector((state) => state.Api);
    // [0]=owner, 
    // [1]=acro,
    // [2]=coinName,
    // [3]=holdingAmount
    // [4]=forSaleAmount,
    // [5]=foreignHolding,
    // [6]=inflationRate,
    // [7]=inCirculation
    // [8]=availableReserves,
    // [9]=maxSupply,
    // [10]=reservedForPayments,
    // [11]=bankingDept,
    // [12]=investmentDept
    var MyCoin = Api.CurrentCountry.Crypto.find(
        (item) => item.TypeOf === "NationalCoin"
      );
      function FixThree(Num){
        return Number(Num).toFixed(3);
      }
   return (
    <>
    <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
       <div className="Status">
        <div>
            <label>STATUS</label>
            <div>
                <div>
                    <span>Coin inflation:</span>
                    <span>Coin Reserves:</span> 
                    <span>Total supply:</span>
                    <span>Current balance:</span>
                    <span>Into circulation:</span> 
                    <span>Reserved for expenses:</span> 
                    <span>Loaned to Banks:</span> 
                    <span>Loaned to Investors:</span>
                    <span>Up for sale:</span>
                    <span>Held by foreigners:</span> 
                </div>
                <div>
                    <span>{MyCoin.Inflation}</span> 
                    <span>{MyCoin.AvailableReseves}</span> 
                    <span>{MyCoin.MaxSupply}</span> 
                    <span>{MyCoin.HoldingAmount}</span> 
                    <span>{MyCoin.IniCirculation}</span> 
                    <span>{MyCoin.ReservedForPayments}</span> 
                    <span>{FixThree(MyCoin.BankingDept)}</span> 
                    <span>{FixThree(MyCoin.InvestmentDept)}</span> 
                    <span>{FixThree(MyCoin.ForSaleAmount)}</span> 
                    <span>{FixThree(MyCoin.ForeignHolding)}</span> 

                </div>
            </div>
        </div>
       </div>
    </>
)
}
