const PreTrade = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const Api = useSelector((state) => state.Api);
  const [value, setValue] = useState('');

  const [AmountA, setAmountA] = useState(null);

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused');
      if (isFocused) {
        setAmountA(null)
      }
    }, []),
  );
  const Calculate =(A)=>{
    handleChangeText(A)
    setAmountA(Number(A))
    dispatch(
      apiRequest({
        flatten: false,
        name:"pretrade.js | ExchangeCoinsStepA",
        url: 'api/CryptoNations/ExchangeCoinsStepA',
        method: 'POST',
        body: {
          CoinA: Api.CoinA?.Id,
          AmountA: Number(A),
          CoinB: Api.CoinB?.Id
        },
        auth: true,
        tokenRequired: true,
        storeIn: 'ExchangeCoinsStepA', // Specify where to store the response
      })
    )
  }
  const handleChangeText = (text) => {
    // Allow only digits and dots, but ensure dot is not first
    let numericText = text.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters
    if (numericText.startsWith('.')) {
      numericText = numericText.substring(1); // Remove the leading dot if present
    }
    // Ensure only one dot is allowed
    numericText = numericText.replace(/(\..*)\./g, '$1');
    setValue(numericText);
  };
  return (
    <>
    <ScrollView>
    <View style={styles.centered}>
    <View style={styles.container}>
      <Text style={styles.title}>Trade Calculation</Text>
      <View style={styles.row}>
        <Text>Pay with:</Text>
      </View>
      <View style={styles.row}>
        <Text>{Api.CoinA?.Name} - {Api.CoinA?.HoldingAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text>to buy:</Text>
      </View>
      <View style={styles.row}>
        <Text>{Api.CoinB?.Name} - {Api.CoinB?.ForSaleAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text>Trade</Text>
        <TextInput
          style={Api.ExchangeCoinsStepA?.AmountB==0 || AmountA>Api.CoinA?.HoldingAmount?[styles.input,styles.overamount]:styles.input}
          keyboardType="numeric"
          value={value}
    
          onChangeText={(A) => Calculate(A)}
          placeholder="Enter amount"
        />
      </View>
      <View style={styles.row}>
        <Text>of {Api.CoinA?.Name} </Text>
      </View>
      <View style={styles.row}>
        <Text>at {Api.ExchangeCoinsStepA?.ValuationA}</Text>
      </View>
      <View style={styles.row}>
        <Text>for {Api.ExchangeCoinsStepA?.AmountB} </Text>
        
      </View>
      <View style={styles.row}>
      <Text>of {Api.CoinB?.Name} </Text>
      </View>
      <View style={styles.row}>
      <Text>at {Api.ExchangeCoinsStepA?.ValuationB}</Text>
      </View>
      {
     
      Api.CoinA?.HoldingAmount<AmountA || Api.ExchangeCoinsStepA?.AmountB==0
      
      ?

      <CustomButton
      style={styles.primaryButton}
      textStyle={styles.primaryButtonText}
      link={null}
      linkText="Enter amount to proceed"
      router={router}
    />
      :
      <CustomButton
      style={styles.primaryButton}
      textStyle={styles.primaryButtonText}
      link="/trade"
      linkText="Proceed to Trade"
      router={router}
    />
      }
    </View>
    </View>
    </ScrollView>
    <Minbar Exchange={true} Flag={true} Stats={true}/>
   </>
  );
};

export default PreTrade;

const CustomButton = ({ style, textStyle, link, linkText, router }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => link?router.push(link):null}
  >
    <Text style={[styles.buttonText, textStyle]}>{linkText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  centered:{
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    width:300
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:'center',
    textTransform:'uppercase'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flex: 1,
  },
  overamount:{
    borderWidth: 2,
    borderColor: "red",
  },
  primaryButton: {
    backgroundColor: "#4171e0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
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