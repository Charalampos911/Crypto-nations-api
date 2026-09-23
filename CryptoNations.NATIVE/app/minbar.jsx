const Minbar = (props) => {
    const Api = useSelector((state) => state.Api);
    const router = useRouter();
    var Flag = images.find((item)=>
        item.Id === Api.CurrentCountry?.Id
    )?.source

  return (
    <View style={styles.NavBarPositioning}>
    <View style={styles.customNavBar}>
        {props.Stats?
        <View> 
            <TouchableOpacity
            style={styles.infoStats}
            onPress={() => router.push('/stats') }
            >
                <Icon name="info" type="font-awesome" color="#4171e0" size={24} />
            </TouchableOpacity>
        </View>
        :null}
        {props.Flag?
        <View style={styles.ImageContainer}  >
            <TouchableOpacity style={styles.FlagPress} onPress={() => router.push('/management')}>
                <ImageBackground source={Flag} style={styles.flag} resizeMode="cover">
                </ImageBackground>
            </TouchableOpacity>
        </View>
        :null}
        {props.Exchange?
        <View> 
          <TouchableOpacity
          style={styles.exchange}
          onPress={() => router.push('/exchange') }
          >
              <Icon name="currency-exchange" type="material" color="#4171e0" size={24} />
          </TouchableOpacity>
        </View>
        :null}
    </View>
    </View>
  )
}

export default Minbar

const styles = StyleSheet.create({ 
  NavBarPositioning:{
    width:'100%',
    height:60,
    position:'fixed',
    bottom:0,
    left:0,
    backgroundColor:'#e3e3e3',
    padding: 10,

  }, 
  customNavBar:{
    position:'relative',
    width:'100%',
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',

  },
  FlagPress:{
    borderRadius: 10,
    width: 60,
    height: 40,
  },
  exchange:{
    backgroundColor:'white',
    borderColor:'#4171e0',
    borderWidth:4,
    borderRadius:10,width:40,height:40,    
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:4,
    marginRight:4,
    zIndex: 1
  },
  ImageContainer:{
    borderRadius: 10,
    width: 60,
    height: 40,
    overflow: "hidden",
    border: "1px solid #ccc",
    cursor: "pointer",
    marginLeft:4,
    marginRight:4,
    zIndex: 1
  },
  flag:{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },  
  infoStats:{
    backgroundColor:'white',
    borderColor:'#4171e0',
    borderWidth:4,
    borderRadius:10,width:40,height:40,    
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:4,
    marginRight:4,
    // position:'fixed',
    // bottom:10,
    // left:20,
    zIndex: 1
  },
})
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