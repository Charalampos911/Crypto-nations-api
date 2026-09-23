import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
// Generic API Thunk
export const apiRequest = createAsyncThunk(
  'api/request',
  async ({flatten, name,url, method = 'GET', body = null, auth = false, tokenRequired = false, storeIn }, { getState, rejectWithValue }) => {
    try {
      const API_BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.24:5000/' : 'https://localhost:5001/';
  
      const headers = {
        'Content-Type': 'application/json',
      };
      // Add Bearer token if required
      if (tokenRequired) {
        const token = getState().Api.Token.JwtToken;
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        } else {
          throw new Error('Authorization token is missing');
        }
      }

      const response = await fetch(API_BASE_URL + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(name+error.message || name+'API request failed');
      }

      const data = await response.json();
      // return flatten && Array.isArray(data) && data.length === 1
      //     ? { ...data[0], storeIn }
      //     : { data, storeIn };
      var FinalFlattenData = {
        msg: name, // Include name in the response for identification
        data: flatten && Array.isArray(data) && data.length === 1 ? { ...data[0] } : data ,
        storeIn:storeIn,
      }
      return {...FinalFlattenData};



    } catch (error) {

      var Message = {
        msg: name,
        error: error.message,
      }

      return rejectWithValue(Message);
    }
  }
);



const ApiReducer = createSlice({
    name: 'ApiReducer',
    initialState: {
      CurrentCountry: null,
      Token: false,
      Nations: null,
      loading: false,
      error: null,
      InitiateNation: 0,
      SetAcategory:0,
      UpdateTheCoin:0,
      UpdateTheToken:0,
      SellOrder:0,
      Portfolio:null,
      SellOrders:null,
      OtherSellOrders:null,
      ExchangeCoinsStepA:null,
      ExchangeCoinsStepB:null,

      CoinA:null,
      CoinB:null,
    },
    reducers: {
      clearState: (state) => {
        state.Token = null;
        state.Nations = null;
        state.error = null;
      },
      setCoinA: (state, action) => {
        state.CoinA = action.payload;
      },
      setCoinB: (state, action) => {
        state.CoinB = action.payload;
      },
      setCurrentCountry: (state, action) => {
        state.CurrentCountry = action.payload;
      },
      setClearExchange: (state, action) => {
        state.ExchangeCoinsStepA = null;
        state.ExchangeCoinsStepB = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(apiRequest.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(apiRequest.fulfilled, (state, action) => {
          const { name } = action.meta.arg;
          state.loading = false;
          const { msg,data, storeIn } = action.payload;
          if (storeIn == "InitiateNation") {
            state.InitiateNation +=1; 
          }else if(storeIn=="SetAcategory"){
            state.SetAcategory +=1; 
          }else if(storeIn=="UpdateTheCoin"){
            state.UpdateTheCoin +=1; 
          }else if(storeIn=="UpdateTheToken"){
            state.UpdateTheToken +=1; 
          }else if(storeIn=="SellOrder"){
            state.SellOrder +=1; 
          }else{


            
            state[storeIn] = data; // Dynamically store the data in the specified property
          }
          state.error = action.payload.msg
        })
        .addCase(apiRequest.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.msg +" | " +action.payload.error;
        });
    },
  });
  
  export const { clearState,setCurrentCountry,setCoinA,setCoinB,setClearExchange } = ApiReducer.actions;
  export default ApiReducer.reducer;


  