import { createSlice } from '@reduxjs/toolkit';
const NationReducer = createSlice({
  name: 'Nation',
  initialState: { 
    CurrentCountry:false,
    InitiatedCountries:[],
  },
  reducers: {
    setCurrentCountry: (state, action) => {
      state.CurrentCountry = action.payload;
    },
    AddInitiatedCountry: (state, action) => {
      const Payload = action.payload[0];
      const NationParams = action.payload[1];
    
      // Construct the new Slider object with dynamic nation parameters
      const Slider = {
        Democracy: {
          Type: {
            Value: Payload.CountryType,
            Gains: Payload.CountryGains,
          },
        },
        GunControl: {
          Type: {
            Value: Payload.GunControlType,
            Gains: Payload.GunControlGains,
          },
        },
        Alliances: {
          Type: {
            Value: Payload.AllianceType,
            Gains: Payload.AllianceGains,
          },
        },
        ...NationParams,
      };
    
      // Combine CurrentCountry, Payload, and the new Slider
      const newCountry = {
        ...state.CurrentCountry,
        ...Payload,
        Slider,
      };
    
      // Update the InitiatedCountries array immutably
      if (!state.CountryHasBeenInitiated) {
        state.InitiatedCountries = [...state.InitiatedCountries, newCountry];
      } else {
        console.log("Country has already been initiated");
      }
      
      // Force a reference change for re-rendering
      state.InitiatedCountries = [...state.InitiatedCountries];
      CalculateInternationalStanding(state)
    },
    UpdateNationParams: (state, action) => {
      const [Target, paramClass, Value, gains] = action.payload;
    
      // Update NationParams for the CurrentCountry
      state.InitiatedCountries = state.InitiatedCountries.map((country) => {
        if (country.Id === state.CurrentCountry.Id) {
          return {
            ...country,
            Slider: {
              ...country.Slider,
              NationParams: {
                ...country.Slider.NationParams,
                [Target]: country.Slider.NationParams[Target].map((param) =>
                  param.Class === paramClass
                    ? { ...param, Value, Gains: gains }
                    : param
                ),
              },
            },
          };
        }
        return country;
      });
      CalculateInternationalStanding(state)
    },
    UpdateNationFundationalEvents: (state, action) => {
      const [Target, NewType, NewName,NewGains] = action.payload;
      switch (Target) {
        case 'CountryType':
      state.InitiatedCountries = state.InitiatedCountries.map((country) => {
        if (country.Id === state.CurrentCountry.Id) {
          return {
            ...country,
            CountryType:NewType,
            CountryName:NewName,
            CountryGains:NewGains,
            Slider: {
              ...country.Slider,
              Democracy: {
                ...country.Slider.Democracy,
                Type:{
                  Value:NewType,
                  Gains:NewGains
                }
              },
            },
          };
        }
        return country;
      });
        break;
        case 'GunControl':
          state.InitiatedCountries = state.InitiatedCountries.map((country) => {
            if (country.Id === state.CurrentCountry.Id) {
              return {
                ...country,
                GunControlType:NewType,
                GunControlName:NewName,
                GunControlGains:NewGains,
                Slider: {
                  ...country.Slider,
                    GunControl: {
                      ...country.Slider.GunControl,
                      Type:{
                        Value:NewType,
                        Gains:NewGains
                      }
                    },
                },
              };
            }
            return country;
          });
        break;
        case 'Alliance':
          state.InitiatedCountries = state.InitiatedCountries.map((country) => {
            if (country.Id === state.CurrentCountry.Id) {
              return {
                ...country,
                AllianceType:NewType,
                AllianceName:NewName,
                AllianceGains:NewGains,
                Slider: {
                  ...country.Slider,
                    Alliances: {
                      ...country.Slider.Alliances,
                      Type:{
                        Value:NewType,
                        Gains:NewGains
                      }
                    },
                  }
              };
            }
            return country;
          });
        break;
      }
      CalculateInternationalStanding(state)
    }
  }//reducers
});

export const { 
  setCurrentCountry,
  AddInitiatedCountry,
  UpdateNationParams,
  UpdateNationFundationalEvents
} = NationReducer.actions;
export default NationReducer.reducer;


function CalculateInternationalStanding(state) {
  state.InitiatedCountries.forEach((country) => {
    if (country.Id === state.CurrentCountry.Id) {
      const result = 
        country.Slider.Democracy.Type.Gains +
        country.Slider.GunControl.Type.Gains +
        country.Slider.Alliances.Type.Gains +
        country.Slider.NationParams.Education.reduce((sum, item) => sum + item.Gains, 0) +
        country.Slider.NationParams.TechnologyExpertise.reduce((sum, item) => sum + item.Gains, 0) +
        country.Slider.NationParams.ReplacementRate.reduce((sum, item) => sum + item.Gains, 0) +
        country.Slider.NationParams.HealthCare.reduce((sum, item) => sum + item.Gains, 0) +
        country.Slider.NationParams.Infrastructure.reduce((sum, item) => sum + item.Gains, 0) +
        country.Slider.NationParams.SocialMetrics.reduce((sum, item) => sum + item.Gains, 0);

      // Update the InternationalStanding directly
      country.InternationalStanding = result;
    }
  });
}