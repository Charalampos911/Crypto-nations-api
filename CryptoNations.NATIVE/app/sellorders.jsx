const SellOrders = () => {
  const isFocused = useIsFocused();
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
    
  useEffect(()=>{
    if(isFocused){
    dispatch(
      apiRequest({
        flatten: false,
        name:"Exchange.jsx | GetNationalSellOrders",
        url: 'api/CryptoNations/GetNationalSellOrders/'+Api.CurrentCountry.Id,
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'SellOrders' // Specify where to store the response
      })
    );
  }
  },[])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      // onPress={() => handlePress(item.Id)}
    >
      <Text style={styles.name}>{item.Name}</Text>
      <Text style={styles.amount}>Sell Amount: {item.ForSaleAmount}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <View style={styles.centered}>
    <View style={styles.container}>
      <FlatList
        data={Api.SellOrders}
        keyExtractor={(item) => item.Id}
        renderItem={renderItem}
      />
    </View>
    </View>
    <Minbar Exchange={true} Flag={true} Stats={true}/>
    </>
  );
};

const styles = StyleSheet.create({
  centered:{
    height:'100%',
    ...Platform.select({
      web: {
        alignItems: 'center',
      }
      })
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width:300
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

export default SellOrders;
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