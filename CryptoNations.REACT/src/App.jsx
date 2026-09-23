
import React, { useState,useRef,useEffect } from 'react';
import ModernGreyStyling from "./Styling/ModernGreyStyling"; //Loading `ModernGrey`
import Flags from "./Styling/images/svgs/TableContext.json";
import LoadedFlags from "./Styling/images/ImageLoader"
import MapsRoom from "./components/Maps/MapsRoom"
import { setIsMobile,setFlags,setLoadedFlags} from './Redux/features/BaseReducer';
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from 'react-device-detect';
import { apiRequest } from './Redux/features/ApiReducer';

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  useEffect(() => {
    //Testing
    var credentials ={
      Username: "Harry@gmail.com",
      Password: "123456"
    }
    dispatch(
      apiRequest({
        flatten: true,
        name:"App.js | Auth/Login",
        url: 'api/v1/Auth/Login',
        method: 'POST',
        body: credentials,
        auth: true,
        tokenRequired: false,
        storeIn: 'Token', // Specify where to store the response
      })
    );

    dispatch(setFlags(Flags))
    dispatch(setLoadedFlags(LoadedFlags()))
    dispatch(setIsMobile(isMobile))
  }, []);
  useEffect(() => {
    dispatch(
      apiRequest({
        flatten: false,
        name:"App.js | NationsWithQuery",
        url: 'api/CryptoNations/NationsWithQuery?pageNumber=1&pageSize=1000',
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'Nations' // Specify where to store the response
      })
    );
  }, [Api.Token]);
  return (
    <>
      <MapsRoom State={state}/>
    </>
  );
}
export default App;