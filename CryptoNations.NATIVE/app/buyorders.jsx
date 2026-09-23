const buyorders = () => {
   const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const router = useRouter();
  const handlePress=(CoinB)=>{
    dispatch(setCoinB(CoinB))
    router.push('/pretrade')
  }

  useEffect(() => {
    if(isFocused){
    dispatch(
      apiRequest({
        flatten: false,
        name:"Exchange.jsx | GetOtherSellOrders",
        url: 'api/CryptoNations/GetOtherSellOrders/'+Api.CurrentCountry.Id,
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'OtherSellOrders' // Specify where to store the response
      })
    );
  }
  }, [Api.UpdateTheCoin]);
  
  const renderItem = ({ item }) => (


    <TouchableOpacity
      style={[
        styles.itemContainer,
        Api.CoinB?.Id === item.Id && styles.Selected,
      ]}
      onPress={() => handlePress(item)}
    >
      <Text style={[
        styles.name,
        Api.CoinB?.Id === item.Id && styles.SelectedText]
        }>{item.Name} sold by {Api.Nations.find((nation)=>nation.Id == item.OriginalNationId)?.Name}</Text>
      <Text style={[
        styles.amount,
        Api.CoinB?.Id === item.Id && styles.SelectedText
      ]}>For sale amount: {item.ForSaleAmount}</Text>
    </TouchableOpacity>
    
  );
  return (
    <>
    <ScrollView>
    <View style={styles.centered}>
 
    <View style={styles.container}>

      {Api.OtherSellOrders?
      <FlatList
        data={Api.OtherSellOrders}
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
    alignItems:'center'
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width:300
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

export default buyorders;
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