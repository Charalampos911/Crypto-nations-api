const Coin = () => {
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const router = useRouter();
  const [inflation, setInflation] = useState(0);
  const [deflation, setDeflation] = useState(0);
  const [loanBanks, setLoanBanks] = useState(0);
  const [interestRateBanks, setInterestRateBanks] = useState(0);
  const [yearsBanks, setYearsBanks] = useState(0);
  const [loanInvestors, setLoanInvestors] = useState(0);
  const [interestRateInvestors, setInterestRateInvestors] = useState(0);
  const [yearsInvestors, setYearsInvestors] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [subsidy, setSubsidy] = useState(0);
  const calculateLoanAmount = (loan, interestRate, years) => {
    return loan * (1 + (interestRate / 100) * years);
  };
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
      setGuardA(false)
    }
 }, [Api.UpdateTheCoin]);

const UpdateCoinNow=(body)=>{

  dispatch(
    apiRequest({
      flatten: true,
      name:"Coin.jsx | UpdateTheCoin",
      url: 'api/CryptoNations/UpdateTheCoin/'+Api.CurrentCountry.Id,
      method: 'PUT',
      body:body, 
      auth: true,
      tokenRequired: true,
      storeIn: 'UpdateTheCoin' // Specify where to store the response
    })
  )


}
  return (
  <>

    <ScrollView >



    <View style={styles.container}>
      {/* Inflation */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Inflate by</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setInflation(Number(text))}
          placeholder="Enter inflation"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>(             
            setGuardA(true),
            UpdateCoinNow({
              typeOf: "NationalCoin",
              inflation: inflation,
            })
          )}
        >
          <Text style={styles.buttonText}>Inflate</Text>
        </TouchableOpacity>
      </View>

      {/* Deflation */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Deflate by</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setDeflation(Number(text))}
          placeholder="Enter deflation"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>(             
            setGuardA(true),
            UpdateCoinNow({
              typeOf: "NationalCoin",
              inflation:  Number("-"+deflation),
            })
          )}
        >
          <Text style={styles.buttonText}>Deflate</Text>
        </TouchableOpacity>
      </View>

      {/* Loan to Banks */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Loan to Banks</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setLoanBanks(Number(text))}
          placeholder="Loan amount"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setInterestRateBanks(Number(text))}
          placeholder="Interest rate (%)"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setYearsBanks(Number(text))}
          placeholder="Years"
        />
        <Text>
          Total Loan: {calculateLoanAmount(loanBanks, interestRateBanks, yearsBanks)}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>(             
            setGuardA(true),
            UpdateCoinNow({
              typeOf: "NationalCoin",
              "bankingDept": loanBanks,
            })
          )}
        >
          <Text style={styles.buttonText}>Loan to Banks</Text>
        </TouchableOpacity>
      </View>

      {/* Loan to Investors */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Loan to Investors</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setLoanInvestors(Number(text))}
          placeholder="Loan amount"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setInterestRateInvestors(Number(text))}
          placeholder="Interest rate (%)"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setYearsInvestors(Number(text))}
          placeholder="Years"
        />
        <Text>
          Total Loan: {calculateLoanAmount(loanInvestors, interestRateInvestors, yearsInvestors)}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>(             
            setGuardA(true),
            UpdateCoinNow({
              typeOf: "NationalCoin",
              "investmentDept": loanInvestors,
            })
          )}
        >
          <Text style={styles.buttonText}>Loan to Investors</Text>
        </TouchableOpacity>
      </View>

      {/* Taxation */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Taxation</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setTaxes(Number(text))}
          placeholder="Tax amount"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>(             
            setGuardA(true),
            UpdateCoinNow({
              typeOf: "NationalCoin",
              "iniCirculation": Number("-"+taxes),
            })
          )}
        >
          <Text style={styles.buttonText}>Apply Tax</Text>
        </TouchableOpacity>
      </View>

      {/* Subsidy */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Subsidy</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setSubsidy(Number(text))}
          placeholder="Subsidy amount"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>(             
            setGuardA(true),
            UpdateCoinNow({
              typeOf: "NationalCoin",
             "iniCirculation": subsidy,
            })
          )}
        >
          <Text style={styles.buttonText}>Provide Subsidy</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    <Minbar Flag={true} Stats={true}/>
  </>
  );
};

export default Coin;

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom:50,
    maxWidth: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        // Additional Android-specific styles (if needed)
      }
    }),
  },
  subtitle:{
    textAlign:'center',
    fontWeight:900,
    textTransform:'uppercase'
  },
  section: {
    marginBottom: 20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    textAlign:'center'
  },
  button: {
    backgroundColor: '#4171e0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
import {
  // React and React Native Core
  React,
  useState,
  useEffect,
  useCallback,
  useRef,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Alert,
  Platform,
  Slider,
  
  // Navigation
  useRouter,
  Stack,
  Link,
  useIsFocused,
  useFocusEffect,

  // Redux
  Provider,
  useSelector,
  useDispatch,
  store,
  apiRequest,
  setCurrentCountry,
  setCoinA,
  setCoinB,
  setClearExchange,

  // Icons
  Ionicons,
  Icon,
} from './imports/importsHub';
import Minbar from './minbar';