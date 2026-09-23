const SellOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const [AmountA, setAmountA] = useState(0);
  const [GuardA, setGuardA] = useState(false);
  const PerformSell = async () => {
    dispatch(
      apiRequest({
        flatten: false,
        name:"Exchange.js | SellOrder",
        url: 'api/CryptoNations/SellOrder/'+Api.CoinA?.Id,
        method: 'PUT',
        body: {
            sellOrderAmount: Number(AmountA),
          },
        auth: true,
        tokenRequired: true,
        storeIn: 'UpdateTheCoin', // Specify where to store the response
      })
    )
    setGuardA(true)
  
  };



  useEffect(() => {
    // Alert.alert('Debug', 'sellorder api dispatch');
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
      dispatch(setCoinA({
        ...Api.CoinA, 
        HoldingAmount: Api.CoinA.HoldingAmount - Number(AmountA),
        sellOrderAmount: Api.CoinA.sellOrderAmount + Number(AmountA)
      }));
      setGuardA(false)
      router.push('/exchange')
    }
 }, [Api.UpdateTheCoin]);
//  return (
//   <Text>wtf</Text>
//  )
  return (
    <View>
    <View 
      style={styles.centered}
    >
      <View 
      style={styles.container}
      >
        <Text style={styles.title}>Sell Order</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.centeredText]}>Sell</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            onChangeText={(text) => setAmountA(text)}
            placeholder="0"
          />
          <Text style={[styles.centeredText]}>amount of {Api.CoinA?.Name}</Text>
        </View>
        <CustomButton
          style={styles.primaryButton}
          textStyle={styles.primaryButtonText}
          linkText="Place Sell Order"
          onPress={PerformSell}
        />
        
      </View>
    </View>
    {/* <Minbar Exchange={true} Flag={true} Stats={true}/> */}
    </View>
  );
};

const CustomButton = ({ style, textStyle, linkText, onPress }) => (
  <TouchableOpacity style={[style]} onPress={onPress}>
    <Text style={[textStyle]}>{linkText}</Text>
  </TouchableOpacity>
);

export default SellOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    width:300
  },
  centeredText:{
       textAlign:'center'
  },
  centered:{
    height:'100%',
    ...Platform.select({
      web: {
        alignItems: 'center',
      }
      })
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center'
  },
  inputContainer: {
    marginBottom: 20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
     textAlign:'center'
  },
  primaryButton: {
    backgroundColor: '#4171e0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
     textAlign:'center'
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