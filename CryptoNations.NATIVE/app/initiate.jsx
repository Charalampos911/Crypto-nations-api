const Initiate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);

  const [CountryType, setCountryType] = useState(0);
  const [GunControlType, setGunControlType] = useState(0);
  const [AllianceType, setAllianceType] = useState(0);
  const [GuardA, setGuardA] = useState(false);
  const [GuardB, setGuardB] = useState(false);

  const isReady = CountryType !== 0 && GunControlType !== 0 && AllianceType !== 0 && Api.CurrentCountry;

  // Check if the current country is already initiated
  useFocusEffect(
    useCallback(() => {
      if (Api.CurrentCountry?.IsInitiated) {
        router.push('/nations');
      }
      return () => {
        console.log('Screen is unfocused');
      };
    }, [Api.CurrentCountry, router])
  );

  // Fetch nations data when GuardA is active
  useFocusEffect(
    useCallback(() => {
      if (GuardA) {
        dispatch(
          apiRequest({
            flatten: true,
            name: "initiate.jsx | NationsWithQuery",
            url: 'api/CryptoNations/NationsWithQuery?filterOn=&filterQuery=&pageNumber=1&pageSize=1000',
            method: 'GET',
            body: null,
            auth: true,
            tokenRequired: true,
            storeIn: 'Nations',
          })
        );
      }
    }, [GuardA, dispatch])
  );

  // Fetch current country data when GuardB is active
  useFocusEffect(
    useCallback(() => {
      if (GuardB && Api.CurrentCountry) {
        dispatch(
          apiRequest({
            flatten: true,
            name: "initiate.jsx | FullNation",
            url: `api/CryptoNations/FullNation/${Api.CurrentCountry.Id}`,
            method: 'GET',
            body: null,
            auth: true,
            tokenRequired: true,
            storeIn: 'CurrentCountry',
          })
        );
        router.push('/management');
      }
    }, [GuardB, Api.CurrentCountry, dispatch, router])
  );





  const OptionButton = ({ text, onPress, isSelected }) => (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, isSelected && styles.selectedText]}
      >{text}</Text>
    </TouchableOpacity>
  );

  return (
  <>
    <Text style={styles.title}>Initiate Your Nation</Text>
    
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.centered}>

      <View style={styles.optionGroup}>
        <Text style={styles.groupTitle}>GOVERNMENT TYPE</Text>
        <OptionButton
          text="Dictatorship"
          onPress={() => setCountryType(1)}
          isSelected={CountryType === 1}
        />
        <OptionButton
          text="Democracy"
          onPress={() => setCountryType(2)}
          isSelected={CountryType === 2}
        />
        <OptionButton
          text="Republic"
          onPress={() => setCountryType(3)}
          isSelected={CountryType === 3}
        />
      </View>

      <View style={styles.optionGroup}>
        <Text style={styles.groupTitle}>GUN CONTROL</Text>
        <OptionButton
          text="Ban"
          onPress={() => setGunControlType(1)}
          isSelected={GunControlType === 1}
        />
        <OptionButton
          text="Home Defense"
          onPress={() => setGunControlType(2)}
          isSelected={GunControlType === 2}
        />
        <OptionButton
          text="Open Carry"
          onPress={() => setGunControlType(3)}
          isSelected={GunControlType === 3}
        />
      </View>

      <View style={styles.optionGroup}>
        <Text style={styles.groupTitle}>ALLIANCE</Text>
        <OptionButton
          text="Solo"
          onPress={() => setAllianceType(1)}
          isSelected={AllianceType === 1}
        />
        <OptionButton
          text="Small Alliance"
          onPress={() => setAllianceType(2)}
          isSelected={AllianceType === 2}
        />
        <OptionButton
          text="Intercontinental Block"
          onPress={() => setAllianceType(3)}
          isSelected={AllianceType === 3}
        />
      </View>
      </View>
    </ScrollView>
    <View style={styles.centered}>
    <TouchableOpacity
        style={styles.submitButton}
        onPress={isReady?()=> ReadyToInitiate(Api.CurrentCountry.Id,CountryType,GunControlType,AllianceType,setGuardA,setGuardB,dispatch,apiRequest):null }
      >
        <Text style={styles.submitText}>{isReady?'Initiate nation':'Select options'}</Text>
    </TouchableOpacity>
    </View>
  
    </>
  );
};

const styles = StyleSheet.create({
  centered:{
    alignItems:'center'
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionGroup: {
    marginBottom: 30,
    width:300
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
  },
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4171e0',
    borderColor: '#0056b3',
  
  },
  selectedText:{
    color:'white',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    letterSpacing:1,
  },
  submitButton: {
    backgroundColor: '#4171e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width:300
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Initiate;
const ReadyToInitiate=( CurrentCountry,CountryType,GunControlType,AllianceType,setGuardA,setGuardB,dispatch,apiRequest)=>{

  setGuardA(true)
  setGuardB(true)
  dispatch(
    apiRequest({
      flatten: false,
      name:"initiate.jsx | InitiateNation",
      url: 'api/CryptoNations/InitiateNation/'+CurrentCountry,
      method: 'PUT',
      body: [
        {
          initiateTheTypeOf:"GovType",
          setItsClassTo: Number(CountryType),
        },
        {
          initiateTheTypeOf: "GunControl",
          setItsClassTo: Number(GunControlType), 
        },
        {
          initiateTheTypeOf: "Alliance",
          setItsClassTo: Number(AllianceType), 
        }
      ],
      auth: true,
      tokenRequired: true,
      storeIn: "InitiateNation", // Specify where to store the response

    })
  );
}


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
