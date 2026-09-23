const Nations = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused');
      if (isFocused) {
        dispatch(setCurrentCountry(null))
        dispatch(setCoinA(null))
        dispatch(setCoinB(null))
      }
    }, []),
);

const GoTo=(Id)=>{
  if(Api.Nations.find((item)=>item.Id == Id).IsInitiated){
    router.push('/management')
  }else{
    router.push('/initiate')
  }
}


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => (
        dispatch(
          apiRequest({
            flatten: true,
            name:"nations.jsx | FullNation",
            url: 'api/CryptoNations/FullNation/'+item.Id,
            method: 'GET',
            body: null,
            auth: true,
            tokenRequired: true,
            storeIn: 'CurrentCountry' // Specify where to store the response
          }),
          GoTo(item.Id)
        )
      )
      }
    >
      <ImageBackground source={item.source} style={styles.flag} resizeMode="cover">
        <Text style={styles.flagText}>{item.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Nation</Text>
      <FlatList
        style={styles.list}
        data={images} // Ensure this contains { source: imagePath, name: 'Country Name' }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
    ...Platform.select({
      android: {
        // alignItems: 'center',
        minWidth:200,
      }
      })
  },
  list:{
    minWidth:300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    height: 130,
    maxWidth: 700, // Maximum width for the content
    width: 180, // Ensures content doesn't exceed parent width
    padding: 16,
    ...Platform.select({
      android: {
        // alignItems: 'center',
        Width: 180,
        height:70,
        padding: 0,
          
      }
      })
  },
  flag: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    borderRadius: 8,
    width: 160,
    height: 100,
    padding: 20,              // Padding inside the ImageBackground
    overflow: 'hidden',       // Ensures child content does not overflow
    borderWidth: 1,           // 1px border width
    borderColor: '#90b2e8',   // Blue border color
    ...Platform.select({
      android: {
        width:'100%',
        height:'100%',
        padding:0,
      }
    })
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
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Nations;
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