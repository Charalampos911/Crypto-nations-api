const portfolio = () => {
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const router = useRouter();
  const handlePress=(CoinA)=>{
    dispatch(setCoinA(CoinA))
    router.push('/exchange')
  }

  useEffect(() => {
    dispatch(
      apiRequest({
        flatten: false,
        name: "Exchange.jsx | GetNationalPortfolio",
        url: 'api/CryptoNations/GetNationalPortfolio/' + Api.CurrentCountry.Id,
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'Portfolio' // Specify where to store the response
      })
    );
  }, [Api.UpdateTheCoin]);
  
  const renderItem = ({ item }) => (
   
    <TouchableOpacity
      style={[
        styles.itemContainer,
        Api.CoinA?.Id === item.Id && styles.Selected,
      ]}
      onPress={() => handlePress(item)}
    >
      <Text style={[
        styles.name,
        Api.CoinA?.Id === item.Id && styles.SelectedText]
        }>{item.Name}</Text>
      <Text style={[
        styles.amount,
        Api.CoinA?.Id === item.Id && styles.SelectedText
      ]}>Holdings: {item.HoldingAmount}</Text>
      <Text style={[
        styles.amount,
        Api.CoinA?.Id === item.Id && styles.SelectedText
      ]}>For sale: {item.ForSaleAmount}</Text>
    </TouchableOpacity>
    
  );
  return (
    <>
    <ScrollView>
    <View style={styles.centered}>
     
    <View style={styles.container}>
      {Api.Portfolio?
      <FlatList
        data={Api.Portfolio}
        keyExtractor={(item) => item.Id}
        renderItem={renderItem}
      />
      :<Text>LOADING...</Text>}
    </View>
 
  
    </View>
    </ScrollView>
      <Minbar Exchange={true} Flag={true} Stats={true}/>
    </>
  );
};

const styles = StyleSheet.create({
  centered:{
    alignItems:'center',


  },
  container: {
    flex: 1,
    padding: 10,
    minWidth:300,
    backgroundColor: "#f5f5f5",
  },
  Selected:{
    backgroundColor: "#4171e0",
  },
  SelectedText:{
    color:"#ffffff"
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "#555",
  },
});

export default portfolio;
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