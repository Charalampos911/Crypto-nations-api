import React, { useState,useRef,useEffect } from 'react';
import MapOverlay from './MapOverlay';
import { useSelector, useDispatch } from "react-redux";
import NationalManagementForm from '../Forms/NationalManagementForm';
import NationInitiationForm from '../Forms/NationInitiationForm'
import { setCurrentCountry } from '../../Redux/features/ApiReducer';

export default function MapChart() { 
  const Api = useSelector((state) => state.Api);
  const dispatch = useDispatch();
  const handleChangeSelection=(e)=>{
    dispatch(setCurrentCountry(null))
  }
    return (
      <div className='ProjectContainer'>
        {Api.CurrentCountry===null?
        <div className='MapOutter'>
            <MapOverlay/>
        </div>
        :
        <div className="ManagementPanelsOutter">
            {Api.CurrentCountry ?
            <>
            {Api.CurrentCountry.IsInitiated?
              <NationalManagementForm 
                ChangeSelection={handleChangeSelection}
              />
              :
              <NationInitiationForm 
                ChangeSelection={handleChangeSelection} 
              />
            }
            </>
            :null}
        </div>
        }
      </div>
    );
  }