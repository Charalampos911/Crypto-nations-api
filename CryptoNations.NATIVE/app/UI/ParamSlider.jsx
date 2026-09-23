// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import React, { useState,useRef,useEffect } from 'react';
// import Slider from '@react-native-community/slider';
// import { Icon } from 'react-native-elements';

// import { useSelector, useDispatch } from "react-redux";
// import { apiRequest } from '../Redux/features/ApiReducer';
// import { useIsFocused  } from '@react-navigation/native';

const ParamSlider = ({ data }) => {
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);
  const category = Api.CurrentCountry?.Categories.find(item => item.CategoryName === data.Name);
  const isFocused = useIsFocused();
  const [value, setValue] = useState(category?.Value || 0);
  const [gains, setGains] = useState(category?.Gains || 0);


  const TempValue = useRef(0);
  const { trackColor, thumbColor } = getSliderColor(gains);
  const [Updated, setUpdated] = useState(0);
  useEffect(() => {
    if(Updated>0 && isFocused){
      dispatch(
        apiRequest({
          flatten: true,
          name:"ParamSlider.jsx | FullNation",
          url: 'api/CryptoNations/FullNation/'+Api.CurrentCountry.Id,
          method: 'GET',
          body: null,
          auth: true,
          tokenRequired: true,
          storeIn: 'CurrentCountry' // Specify where to store the response
        })
      );
    }
  }, [Api.SetAcategory]);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={(val) => TempValue.current=val}
        onSlidingComplete={()=>(
          setValue(TempValue.current),
          CalculateGains(data?.set,TempValue.current,setGains)
       
        )}
        minimumTrackTintColor={trackColor}
        maximumTrackTintColor="#8E8E93"
        thumbTintColor={thumbColor}
      />
      <View style={styles.horizontalContainer}>
        <Text style={styles.value}>Value: {value}% </Text>
        <Text style={styles.value}>Gains: {gains}</Text>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => UpdateCategory(data?.Name,data?.set,TempValue.current,Api.CurrentCountry.Id,setGains,dispatch,apiRequest,setUpdated,Updated) }
      >
      <Icon name="save" type="font-awesome" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ParamSlider;
const getSliderColor = (gains) => {
  if (gains === 0) return { trackColor: 'lightblue', thumbColor: 'lightblue' };
  if (gains === 75) return { trackColor: 'red', thumbColor: 'red' };
  if (gains === 100) return { trackColor: 'orange', thumbColor: 'orange' };
  if (gains === 125) return { trackColor: 'green', thumbColor: 'green' };
  return { trackColor: '#1EB1FC', thumbColor: '#1EB1FC' }; // Default colors
};

const CalculateGains=(set,val,setGains)=>{
  for(var i=0; i<set.length; i++){
    if(set[i].MinLimit<=val && set[i].MaxLimit>=val){
      setGains(set[i].NewPoints)
    }

  }

}
const UpdateCategory=(Name,set,val,CurrentCountry,setGains,dispatch,apiRequest,setUpdated,Updated)=>{
  for(var i=0; i<set.length; i++){
    if(set[i].MinLimit<=val && set[i].MaxLimit>=val){
      setGains(set[i].NewPoints)
      dispatch(
        apiRequest({
          name:"ParamSlider.jsx | SetAcategory",
          url: 'api/CryptoNations/SetAcategory/'+CurrentCountry, 
          method: 'PUT',
          body: {
              categoryName: Name,
              value: val,
              gains: set[i].NewPoints
            },
          auth: true,
          tokenRequired: true,
          storeIn: "SetAcategory" // Specify where to store the response
        })
      );
      setUpdated(Updated+1)
    }

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Optional background color
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the row
  },
  slider: {
    width: 250, // Adjust width as needed
    height: 40,
  },
  value: {
    fontSize: 16,
    marginTop: 10,
    color: '#333', // Optional text color
  },
  submitButton: {
    backgroundColor: '#4171e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    color: '#fff',
    fontSize: 24, // Adjust icon size as needed
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

} from '../imports/importsHub';