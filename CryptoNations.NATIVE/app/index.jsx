import { LogBox } from 'react-native';


const Index = () => {
  LogBox.ignoreAllLogs(); // Ignores all warnings
  const isFocused = useIsFocused();
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);

  //Make sure to register first
  useEffect(() => {
    //Then
    var credentials ={
      Username: "Harry@gmail.com",  
      Password: "123456"
    }
    dispatch(
      apiRequest({
        flatten: true,
        name:"index.js | Auth/Login",
        url: 'api/v1/Auth/Login',
        method: 'POST',
        body: credentials,
        auth: true,
        tokenRequired: false,
        storeIn: 'Token', // Specify where to store the response
      })
    );

  }, []);
  useEffect(() => {
   
    if (isFocused) {
    dispatch(
      apiRequest({
        flatten: false,
        name:"index.js | NationsWithQuery",
        url: 'api/CryptoNations/NationsWithQuery?pageNumber=1&pageSize=1000',
        method: 'GET',
        body: null,
        auth: true,
        tokenRequired: true,
        storeIn: 'Nations' // Specify where to store the response
      })
    );
    }
  }, [Api.Token]);
  const CustomButton = ({ style, textStyle, link, linkText }) => (
    <>
    {Api.Nations?
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() =>  router.push(link)}
      >
      <Text style={[styles.buttonText, textStyle]}>{linkText}</Text>
      </TouchableOpacity>
      :    
      <TouchableOpacity
        style={[styles.button, style]}
        // onPress={() =>   alert("Api.Token==="+Api.Token)}
      >
        <Text style={[styles.buttonText, textStyle]}>wait...</Text>
      </TouchableOpacity>
    }
</>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Crypto Nations</Text>
      <Text style={styles.subtitle}>Create your nation of choice.</Text>
      <Text style={styles.subtitle}>Inflate, lend, and trade cryptos.</Text>

      <CustomButton
        style={styles.primaryButton}
        textStyle={styles.primaryButtonText}
        link="/nations"
        linkText="Go to Nations"
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Adds a shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#4171e0',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});

export default Index;

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
