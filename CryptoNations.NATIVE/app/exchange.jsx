const exchange = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
          dispatch(setClearExchange())
        }
    }, [])


  return (
    <>
    <View style={styles.container}>
      {Api.CoinA?
      <View style={styles.selectedcrypto}>
        <Text style={styles.title}>{Api.CoinA?.Name}</Text>
        <Text style={styles.title}>{Api.CoinA?.HoldingAmount}</Text>
      </View>
      :null}
      <View style={styles.buttonRow}>
        
        <TouchableOpacity
          style={[styles.button,styles.fullwidth]}
          onPress={() => router.push('/portfolio')}
        >
          <Text style={styles.buttonText}>{Api.CoinA?"Change selection":"Select crypto"}</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => (Api.CoinA? router.push('/sellorder'):null)}
        >
          <Text style={styles.buttonText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => (Api.CoinA? router.push('/buyorders'):null)}
        >
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={[styles.button,styles.fullwidth]}
          onPress={() => router.push('/sellorders')}
        >
          <Text style={styles.buttonText}>Sell orders</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Minbar Flag={true} Stats={true}/>
    </>
  );
};

export default exchange;

const styles = StyleSheet.create({
  fullwidth:{
    width:'100%',
  },
  selectedcrypto:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#658ce6',
    
    borderRadius:10,
    width:300,
    height:90,
    marginBottom:10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width:300,
  },
  button: {
    backgroundColor: '#4171e0',
    padding: 15,
    borderRadius: 8,
    width:'46%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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