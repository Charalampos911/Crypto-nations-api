import React from 'react';
import mapImage from '../../Styling/images/svgs/all_maps.jpg'; 
import { useSelector, useDispatch } from "react-redux";
import { apiRequest} from '../../Redux/features/ApiReducer';

const MapOverlay = () => { // Completed!!!
  const state=useSelector((state) => state);
  const Base=useSelector((state) => state.Base); 
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  return (
    <>
    <span className='Welcome'>THE CRYPTO NATIONS</span>
    <div className="map-container">
      <img src={mapImage} alt="World Map" className="map-image" />

    {/* PC view - hoverable svg map overlay */}
      <div className='svgCont PC'>
        <svg width="1920" height="1080">
        {state && Api && Api.Nations && Api.Nations.map((item) => (
          <g key={item.Id} className="CountrySpecificOverlay" onClick={()=>(
            dispatch(
            apiRequest({
              flatten: true,
              name:"NationInitiationForm.jsx | FullNation",
              url: 'api/CryptoNations/FullNation/'+item.Id,
              method: 'GET',
              body: null,
              auth: true,
              tokenRequired: true,
              storeIn: 'CurrentCountry' // Specify where to store the response
            })
          ))}>
          <title>{item.Name}</title>
          {item.Path && item.Path.map((Path) => (
              <path d={Path} />
            ))}
          </g>
        ))}
        </svg>
      </div>
    {/* PHONE view - Simple flatlist of country flags */}
      <div className='Phone'>
      {state && Api && Api.Nations && Api.Nations.map((item) => (
          <div key={item.Id} className="MobileCountryItem" onClick={()=>(
            dispatch(
              apiRequest({
                flatten: true,
                name:"NationInitiationForm.jsx | FullNation",
                url: 'api/CryptoNations/FullNation/'+item.Id,
                method: 'GET',
                body: null,
                auth: true,
                tokenRequired: true,
                storeIn: 'CurrentCountry' // Storage property
              })
            )
          )}>
            <div><img src={Base.LoadedFlags[item.Id-1]} title='' /></div>
            <div className='FancyFlagName'><div>{item.Name}</div></div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MapOverlay;