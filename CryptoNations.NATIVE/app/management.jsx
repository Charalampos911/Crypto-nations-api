const Management = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused');
      if (isFocused) {
        dispatch(setCoinA(null))
        dispatch(setCoinB(null))
      }
    }, []),
);
  var Flag = images.find((item)=>
    item.Id === Api.CurrentCountry?.Id
  )?.source

  return (
    <>

    <View style={styles.container}>
    <View style={styles.ImageContainer}>
      <ImageBackground source={Flag} style={styles.flag} resizeMode="cover">
        <Text style={styles.flagText}>{Api.CurrentCountry?.Name}</Text>
      </ImageBackground>
    </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/parameters')}
        >
          <Text style={styles.buttonText}>Parameters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/coin')}
        >
          <Text style={styles.buttonText}>Coin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/stats')}
        >
          <Text style={styles.buttonText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/exchange')}
        >
          <Text style={styles.buttonText}>Exchange</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

export default Management;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  ImageContainer:{
    height: 160,
    marginBottom:10,
    width:300
  },
  flag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 300,
    height: 160,
    padding: 20,           
    overflow: 'hidden',     
    borderWidth: 1,         
    borderColor: '#90b2e8',   
  },
  flagText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Adds shadow for better contrast
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  buttonRow: {
    width:300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
import images from '../constants/ImageLoader';