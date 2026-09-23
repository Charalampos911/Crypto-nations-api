const CustomHeader = ({ title,CustomLocation,router }) => (
  
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => router.push(CustomLocation)} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const RootLayout = () => {
    const router = useRouter();
  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'WELCOME' }} />
      <Stack.Screen name="nations" options={{ headerShown: false, title: 'NATIONS' }} />
      <Stack.Screen 
        name="initiate" 
        options={{
          header: () => <CustomHeader title="INITIATION FORM" CustomLocation="/nations" router={router}/>,
        }} 
      />
      <Stack.Screen 
        name="management" 
        options={{
          header: () => <CustomHeader title="MANAGAMENT PORTAL" CustomLocation="/nations" router={router}/>,
        }} 
      />  
      <Stack.Screen 
        name="parameters" 
        options={{
          header: () => <CustomHeader title="NATIONAL PARAMETERS" CustomLocation="/management" router={router}/>,
        }} 

      />
      <Stack.Screen 
        name="coin" 
        options={{
          header: () => <CustomHeader title="YOUR COIN" CustomLocation="/management" router={router}/>,
        }} 
      />
      <Stack.Screen
        name="exchange"
        options={{
            header: () =><CustomHeader title="EXCHANGE PORTAL" CustomLocation="/management" router={router}/>,
          }} 
      />

      <Stack.Screen
        name="portfolio"
        options={{
            header: () =><CustomHeader title="YOUR PORTFOLIO" CustomLocation="/exchange" router={router}/>,
          }} 
      />

      <Stack.Screen
        name="sellorder"
        options={{
            header: () =><CustomHeader title="NEW SELL ORDER" CustomLocation="/exchange" router={router}/>,
          }} 
      />
      <Stack.Screen
        name="sellorders"
        options={{
            header: () =><CustomHeader title="YOUR SELL ORDERS" CustomLocation="/exchange" router={router}/>,
          }} 
      />

      <Stack.Screen
        name="buyorders"
        options={{
            header: () =><CustomHeader title="AVAILABLE SELL ORDERS" CustomLocation="/exchange" router={router}/>,
          }} 
      />

      <Stack.Screen
        name="pretrade"
        options={{
            header: () =><CustomHeader title="PREPARE STATEMENT" CustomLocation="/buyorders" router={router}/>,
          }} 
      />

      <Stack.Screen
        name="trade"
        options={{
            header: () =><CustomHeader title="FINAL STATEMENT" CustomLocation="/pretrade" router={router}/>,
          }} 
      />

      <Stack.Screen
        name="successtrade"
        options={{
            header: () =><CustomHeader title="TRADE RESULTS" CustomLocation="/exchange" router={router}/>,
          }} 
      />
      <Stack.Screen
        name="stats"
        options={({ navigation, route }) => {
          // Get the previous screen name from the navigation state
          const state = navigation.getState();
          const previousRoute =
            state.routes[state.routes.length - 2]?.name; // Fallback to 'Default' if no previous screen

          return {
            header: () => (
              <CustomHeader title="STATS" CustomLocation={previousRoute} router={router} />
            ),
          };
        }}
      />
    </Stack>
    </Provider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#4171e0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  backButton:{
    position:'absolute',
    top:18,
    left:12,
    zIndex: 1
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export default RootLayout;
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