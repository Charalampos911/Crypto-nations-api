import { createSlice } from '@reduxjs/toolkit';

const BaseReducer = createSlice({
  name: 'Base',
  initialState: { 
    IsMobile: false,
    Flags: false,
    LoadedFlags: false,
    AllCountryTypes:[{ 
      Type:[1,"Dictatorship",80]
    },{
      Type:[2,"Democracy",110]
    },{
      Type:[3,"Republic",120]
    }],
    AllGunControlTypes:[{
      Type:[1,"Total ban",80]
    },{
      Type:[2,"Home defence only",100]
    },{
      Type:[3,"Open carry",120]
    }],
    AllAllianceType:[{
      Type:[1,"Solo campaign",90]
    },{
      Type:[2,"Small alliance",110]
    },{
      Type:[3,"Intercontinental block",150]
    }],
    InitialParams:{
      Default:{
        Coin:{
          PrintedBalance:80,
          IniCirculation:24,
          AvailableReseves:920,
          MaxSupply:1000,
          ReservedForPayments:4,
        },
        Token:{
          PrintedBalance:20,
          IniCirculation:10,
          AvailableReseves:180,
          MaxSupply:200,
          ReservedForPayments:2,
        },
        NationParams:{
            Education:[{
                Class:1,
                Value:23,//από value και Points βγένει το Gains
                Gains:100,
            },{
                Class:2,
                Value:31,
                Gains:125,
            },{
                Class:3,
                Value:26,
                Gains:125,
            },{
                Class:4,
                Value:3,
                Gains:125,
            }],
            TechnologyExpertise:[{
                Class:1,
                Value:20,
                Gains:20,
            },{
                Class:2,
                Value:13,
                Gains:125,
            },{
                Class:3,
                Value:40,
                Gains:75,
            },{
                Class:4,
                Value:40,
                Gains:75,
            },{
                Class:5,
                Value:12,
                Gains:100,
            },{
                Class:6,
                Value:8,
                Gains:125,
            }],
            ReplacementRate:[{
                Class:1,
                Value:21,
                Gains:125,
            }],
            HealthCare:[{
                Class:1,
                Value:95,
                Gains:125,
            },{
                Class:2,
                Value:3,
                Gains:125,
            },{
                Class:3,
                Value:14,
                Gains:100,
            },{
                Class:4,
                Value:9,
                Gains:100,
            }],
            Infrastructure:[{
                Class:1,
                Value:93,
                Gains:100,
                },{
                Class:2,
                Value:89,
                Gains:100,
                },{
                Class:3,
                Value:82,
                Gains:100,
                },{
                Class:4,
                Value:89,
                Gains:100,
                },{
                Class:5,
                Value:79,
                Gains:100,
                }],
            SocialMetrics:[{
                Class:1,
                Value:1,
                Gains:100,
            },{
                Class:2,
                Value:95,
                Gains:100,
            },{
                Class:3,
                Value:2,
                Gains:125,
            }]
        }
        
    }}
  },
  reducers: {
    setIsMobile: (state, action) => { //React if is mobile
      state.IsMobile = action.payload;
    },
    setFlags: (state, action) => { //reference to all the flag files
      state.Flags = action.payload;
    },
    setLoadedFlags: (state, action) => { //React-loaded flag .png files
      state.LoadedFlags = action.payload;
    },
  },
});

export const { setIsMobile, setFlags,setLoadedFlags} = BaseReducer.actions;
export default BaseReducer.reducer;