import { createSlice } from '@reduxjs/toolkit';

const PortfolioReducer = createSlice({
  name: 'Portfolio',
  initialState: { 
    Portfolios: []
  },
  reducers: {
    InitiatePortfolio: (state, action) => {
      const payload = action.payload;
      state.Portfolios.push(payload);

      CalculateHoldingAmount(state,payload.Id,'MyCoin')
      CalculateHoldingAmount(state,payload.Id,'MyToken')
    },
    // Update a specific property inside MyCoin of a specific portfolio
    UpdateProperty: (state, action) => {
      const [operator, portfolioId, property, newValue,target] = action.payload;
      // Use map to iterate through the Portfolios array
      state.Portfolios = state.Portfolios.map((portfolio) => {
        // Check if the current portfolio matches the provided ID
        if (portfolio.Id === portfolioId && portfolio[target]) {
          const coinProperty = portfolio[target][property];
          // Ensure the property exists and perform the operation
          if (coinProperty !== undefined) {
            switch (operator) {
              case "=":
                if (portfolio[target].HoldingAmount >=newValue)
                  portfolio[target][property] = Number(newValue);
                break;
              case "-":
                if (portfolio[target].HoldingAmount >=newValue)
                    portfolio[target][property]  = Number(portfolio[target][property]) - Number(newValue);
                break;
              case "+":
                if (portfolio[target].AvailableReseves >=newValue)
                portfolio[target][property] = Number(portfolio[target][property]) + Number(newValue);
                break;
              default:
                console.warn("Invalid operator");
            }
          }
          portfolio[target].AvailableReseves = portfolio[target].MaxSupply - portfolio[target].Inflation;
        }
        // Return the potentially modified portfolio
        return portfolio;
      });
      CalculateHoldingAmount(state,portfolioId,target)

    },
    calculateProperties:(state, action) => {
      const [portfolioId, operation, newValue,target] = action.payload;
      var Value = Number(newValue)
      // Use map to iterate through the Portfolios array
      state.Portfolios = state.Portfolios.map((portfolio) => {
        // Check if the current portfolio matches the provided ID
        if (portfolio.Id === portfolioId && portfolio[target]) {
       
          // Ensure the property exists and perform the operation
            switch (operation) {
              case "LoanBanks":
  
                if(portfolio[target].HoldingAmount >= Value)
                    portfolio[target].BankingDept = Number(portfolio[target].BankingDept) + Value
                break;
              case "LoanInvestors":
                if(portfolio[target].HoldingAmount >= Value)
                    portfolio[target].InvestmentDept = Number(portfolio[target].InvestmentDept) + Value
                break;
              case "Taxes":
                if(portfolio[target].IniCirculation >= Value){
                    portfolio[target].IniCirculation = Number(portfolio[target].IniCirculation) - Value

                }
                break;
              case "Subsidy":
                if(portfolio[target].HoldingAmount >= Value)
                    portfolio[target].IniCirculation = Number(portfolio[target].IniCirculation) + Value
                break;
              default:
                console.warn("Invalid operation");
            }
          
        }
    
        // Return the potentially modified portfolio
        return portfolio;
      });
      CalculateHoldingAmount(state,portfolioId,target)
    },
    ExchangeCoinAtoCoinB:(state, action) => {
      const [
        Nation,AmountA,AmountB,CoinA,CoinB
      ] = action.payload;
  
        var MyCoinAreturn= false;
        if(Nation.CurrentCountry.Id == CoinB[1].Id){
          MyCoinAreturn=true;
        }
        var MyCoinBreturn= false;
        if(CoinB[0] == CoinA.Id){
          MyCoinBreturn=true;
        }
        /*
          MyCoin to MyCoin exchange
        */
        if(MyCoinAreturn && MyCoinBreturn){
          var ProviderA = state.Portfolios.find((item)=>item.Id == Nation.CurrentCountry.Id).OtherHolding.find((item)=>item.Id == CoinA.Id)
          var ProviderB = state.Portfolios.find((item)=>item.Id == CoinB[0]).OtherHolding.find((item)=>item.Id == CoinB[1].Id)
          //Remove amount from sellers wallets
          ProviderA.HoldingAmount =ProviderA.HoldingAmount - AmountA
          ProviderB.ForSaleAmount =ProviderB.ForSaleAmount - AmountB

          var ReceiverA = state.Portfolios.find((item)=>item.Id == Nation.CurrentCountry.Id).MyCoin
          var ReceiverB = state.Portfolios.find((item)=>item.Id == CoinB[0]).MyCoin
          //Add amount to buyers wallets
          ReceiverA.ForeignHolding = ReceiverA.ForeignHolding - AmountB
          ReceiverB.ForeignHolding = ReceiverB.ForeignHolding - AmountA

          CalculateHoldingAmount(state,ReceiverA.Id,'MyCoin')
          CalculateHoldingAmount(state,ReceiverB.Id,'MyCoin')

          return;
        }
        /*
          OtherHoling to MyCoin exchange
        */
        if(MyCoinAreturn){

          var SellerAOtherHoldingA = state.Portfolios.find((item)=>item.Id == Nation.CurrentCountry.Id).OtherHolding.find((item)=>item.Id == CoinA.Id)
          var SellerAMyCoinBreturn = state.Portfolios.find((item)=>item.Id == Nation.CurrentCountry.Id).MyCoin

          var SellerBOtherHoldingA = state.Portfolios.find((item)=>item.Id == CoinB[0]).OtherHolding.find((item)=>item.Id == CoinA.Id)
          var SellerBOtherHoldingB = state.Portfolios.find((item)=>item.Id == CoinB[0]).OtherHolding.find((item)=>item.Id == CoinB[1].Id)
    
          if(SellerBOtherHoldingB.ForSaleAmount>= AmountB && SellerAOtherHoldingA.HoldingAmount>=AmountA){
            SellerAOtherHoldingA.HoldingAmount = SellerAOtherHoldingA.HoldingAmount - AmountA
          // And take AmountB from another country
          if (SellerBOtherHoldingA) {
            // Update current holding
            SellerBOtherHoldingA.HoldingAmount += AmountA;
          } else {
            // Create new holding
            state.Portfolios.find((item)=>item.Id == CoinB[0]).OtherHolding.push({
              Id: CoinA.Id,
              Acro: CoinA.Acro,
              Name: CoinA.Name,
              ForSaleAmount: 0,
              HoldingAmount: AmountA,
            });
          }
            SellerBOtherHoldingB.ForSaleAmount = SellerBOtherHoldingB.ForSaleAmount - AmountB
            SellerAMyCoinBreturn.ForeignHolding = SellerAMyCoinBreturn.ForeignHolding - AmountB
            CalculateHoldingAmount(state,Nation.CurrentCountry.Id,'MyCoin')
          }
          return;
        }
        /*
          MyCoin to OtherHolding
        */
        var CoinAorigin = Nation.InitiatedCountries.find((item)=>item.Id == CoinA.Id)
        var CoinAoriginalPortfolio = state.Portfolios.find((item)=>item.MyCoin.Id == CoinA.Id)
        var CoinBorigin = Nation.InitiatedCountries.find((item)=>item.Id == CoinB[1].Id) //CoinB ===> [product.Id,product.MyCoin]
        var CoinBoriginalPortfolio = state.Portfolios.find((item)=>item.MyCoin.Id == CoinB[1].Id)

        var MyCoinA = false;
        var MyCoinB = false;
        if(Nation.CurrentCountry.Id == CoinA.Id){
          //Seller A is selling his own coin
          MyCoinA = true;
        }
        if(CoinB[0] == CoinB[1].Id){
          //Seller B is selling his own coin
          MyCoinB = true;
        }
        //
        // * Case MyCoin is of the Current Nation
        //
        if(MyCoinA){
          // Give AmountA of MyCoinA to another country
          
          if(CoinAoriginalPortfolio.MyCoin.HoldingAmount>=AmountA){
          
            CoinAoriginalPortfolio.MyCoin.ForeignHolding = CoinAoriginalPortfolio.MyCoin.ForeignHolding+AmountA;
            // CoinAoriginalPortfolio.MyCoin.ForSaleAmount = CoinAoriginalPortfolio.MyCoin.ForSaleAmount-AmountA;
          }
          // Re-calculate hoding amount
          CalculateHoldingAmount(state,CoinA.Id,'MyCoin')

          // And take AmountB from another country
          const existingHolding = CoinAoriginalPortfolio.OtherHolding.find((item) => item.Id === CoinB[1].Id);
          if (existingHolding) {
            // Update current holding
            existingHolding.HoldingAmount += AmountB;
          } else {
            // Create new holding
            CoinAoriginalPortfolio.OtherHolding.push({
              Id: CoinB[1].Id,
              Acro: CoinB[1].Acro,
              Name: CoinB[1].Name,
              ForSaleAmount: 0,
              HoldingAmount: AmountB,
            });
          }
        }else{
          // Give AmountA of OtherHolding to another country
          var OtherPortfolioA = 
          state.Portfolios.find((item)=>item.Id == Nation.CurrentCountry.Id)
          .OtherHolding.find((item)=>item.Id == CoinA.Id);
          if(OtherPortfolioA.ForSaleAmount - OtherPortfolioA.HoldingAmount>=AmountA){
            OtherPortfolioA.ForSaleAmount = OtherPortfolioA.ForSaleAmount - AmountA;
          }
          // And take AmountB from another country
          const existingHolding = CoinAoriginalPortfolio.OtherHolding.find((item) => item.Id === CoinB[1].Id);
          if (existingHolding) {
            // Update current holding
            existingHolding.HoldingAmount += AmountB;
          } else {
            // Create new holding
            CoinAoriginalPortfolio.OtherHolding.push({
              Id: CoinB[1].Id,
              Acro: CoinB[1].Acro,
              Name: CoinB[1].Name,
              ForSaleAmount: 0,
              HoldingAmount: AmountB,
            });
          }
        }
        
        //
        // * Case MyCoin is of another Nation
        //

        if(MyCoinB){
          // Give AmountA to another country
          if(CoinBoriginalPortfolio.MyCoin.ForSaleAmount>=AmountB){
            CoinBoriginalPortfolio.MyCoin.ForeignHolding = CoinBoriginalPortfolio.MyCoin.ForeignHolding+AmountB;
            CoinBoriginalPortfolio.MyCoin.ForSaleAmount = CoinBoriginalPortfolio.MyCoin.ForSaleAmount-AmountB
          }
          // Re-calculate holding amount
          CalculateHoldingAmount(state,CoinB[1].Id,'MyCoin')
          // And take AmountB from another country
          const existingHolding = CoinBoriginalPortfolio.OtherHolding.find((item) => item.Id === CoinA.Id);
          if (existingHolding) {
            // Update current holding
            existingHolding.HoldingAmount += AmountA;
          } else {
            // Create new holding
            CoinBoriginalPortfolio.OtherHolding.push({
              Id: CoinA.Id,
              Acro: CoinA.Acro,
              Name: CoinA.Name,
              ForSaleAmount: 0,
              HoldingAmount: AmountA,
            });
          }
        }else{

          var OtherPortfolioB = 
          state.Portfolios.find((item)=>item.Id == CoinB[0].Id)
          .OtherHolding.find((item)=>item.Id == CoinB[1].Id);
          if(OtherPortfolioB.ForSaleAmount - OtherPortfolioB.HoldingAmount>=AmountB){
            OtherPortfolioB.ForSaleAmount = OtherPortfolioB.ForSaleAmount - AmountB;
          }
          // And take AmountB from another country
          const existingHolding = CoinBoriginalPortfolio.OtherHolding.find((item) => item.Id === CoinA.Id);
          if (existingHolding) {
            // Update current holding
            existingHolding.HoldingAmount += AmountA;
          } else {
            // Create new holding
            CoinAoriginalPortfolio.OtherHolding.push({
              Id: CoinA.Id,
              Acro: CoinA.Acro,
              Name: CoinA.Name,
              ForSaleAmount: 0,
              HoldingAmount: AmountA,
            });
          }
        }
    },
    SellOtherHolding:(state, action) => {
      const [CurrentCountryId,CoinAId,ForSaleAmount] = action.payload;
      var Portfolio = state.Portfolios.find((Portfolio)=>Portfolio.Id == CurrentCountryId)
      var Holding = Portfolio.OtherHolding.find((Holding)=>Holding.Id == CoinAId)
      if(Holding.HoldingAmount>=ForSaleAmount){
        Holding.ForSaleAmount = Holding.ForSaleAmount + ForSaleAmount;
        Holding.HoldingAmount = Holding.HoldingAmount - ForSaleAmount;
      }else{
        console.log("For sale amount exeeds current holdings amount")
      }
    }
  },
});

export const { InitiatePortfolio, UpdateProperty,calculateProperties,ExchangeCoinAtoCoinB,SellOtherHolding } = PortfolioReducer.actions;
export default PortfolioReducer.reducer;



function CalculateHoldingAmount(state,portfolioId,target) {
  //
  // * Re-evaluate the HoldingAmount of (portfolioId) at either target MyCoin or MyToken
  //
  state.Portfolios.forEach((portfolio) => {
  if (portfolio.Id === portfolioId && portfolio[target]) {

    const result = 
      portfolio[target].Inflation - 
      portfolio[target].IniCirculation -
      portfolio[target].ReservedForPayments-
      portfolio[target].BankingDept - 
      portfolio[target].InvestmentDept - 
      portfolio[target].ForeignHolding -
      portfolio[target].ForSaleAmount;
      portfolio[target].HoldingAmount = result;
  }})
}