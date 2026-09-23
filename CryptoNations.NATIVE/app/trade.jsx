const trade = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const Api = useSelector((state) => state.Api);
  const [GuardA, setGuardA] = useState(false);
const FinalizeTransaction=()=>{
  if(Api.ExchangeCoinsStepA?.AmountB){
  dispatch(
      apiRequest({
        flatten: false,
        name:"trade.js | ExchangeCoinsStepB",
        url: 'api/CryptoNations/ExchangeCoinsStepB',
        method: 'POST',
        body: {
          CoinA: Api.ExchangeCoinsStepA?.CoinA,
          AmountA: Api.ExchangeCoinsStepA?.AmountA,
          CoinB: Api.ExchangeCoinsStepA?.CoinB,
          AmountB: Api.ExchangeCoinsStepA?.AmountB
        },
        auth: true,
        tokenRequired: true,
        storeIn: 'ExchangeCoinsStepB',
      })

  )
  setGuardA(true)
}

}
    useEffect(() => {
      if(GuardA && Api.ExchangeCoinsStepB){
        router.push("/successtrade")
      }
    }, [Api.ExchangeCoinsStepB]);
  return (
    <>
    <ScrollView>
    <View style={styles.centered}>
    <View style={styles.container}>
      <Text style={styles.title}>Pending trade</Text>
      <View style={styles.row}>
        <Text>Trade </Text>
        <Text>{Api.ExchangeCoinsStepA?.AmountA} </Text>
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
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => FinalizeTransaction()}
        >
          <Text style={[styles.buttonText, styles.primaryButtonText]}>{"I AGREE"}</Text>
        </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
    <Minbar Exchange={true} Flag={true} Stats={true}/>
    </>
  );
};

export default trade;
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