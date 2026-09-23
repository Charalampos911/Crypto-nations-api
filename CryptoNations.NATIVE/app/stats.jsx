const Stats = () => {
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const isFocused = useIsFocused();
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

  var MyCoin = Api.CurrentCountry?.Crypto?.find(
    (item) => item.TypeOf === "NationalCoin"
  );

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
    <View style={styles.centered}>
    <View style={styles.container}>
      {/* Inflation */}
      <View style={styles.section}>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Inflation:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.Inflation}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Circulation:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.IniCirculation}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Reserved:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.ReservedForPayments}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Banking dept:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.BankingDept}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Investor dept:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.InvestmentDept}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Selling amount:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.ForSaleAmount}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Foreign holding:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.ForeignHolding}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Holdings amount:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{MyCoin?.HoldingAmount}</Text>
        <Text style={[styles.subtitle,styles.nonWrappableText]}>Standing:</Text>
        <Text style={[styles.subtitle,styles.grey]}>{Api.CurrentCountry?.InternationalStanding}</Text>
      </View>
    </View>
    </View>
    </ScrollView>
    <Minbar Exchange={true} Flag={true} Stats={false}/></>
  );
};

export default Stats;

const styles = StyleSheet.create({
  nonWrappableText: {
    whiteSpace: 'nowrap',
    flexShrink: 1,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    overflow: 'hidden',
  },
  container: {
    padding: 20,
    textAlign: 'center',
    flexDirection:'row',
    Width:300,
    marginTop:6,
    borderRadius:10,
    backgroundColor:'#4171e0',
    justifyContent:'center',
    ...Platform.select({
      android: {
        // Additional Android-specific styles (if needed)
      }
    }),
  },
  centered:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  grey:{
    textAlign:'center',
    textAlign:'left',
    color:'#c4c4c4',
    marginBottom:6
  },
  subtitle:{
    textAlign:'center',
    fontWeight:900,
    textTransform:'uppercase',
    color:'white'
  },
  alt:{
    color:'#e9e7e7'
  },
  section: {
    marginRight:4,
    marginLeft:4,
    width:300,
    marginBottom: 20,
    alignItems:'center',
  }
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
