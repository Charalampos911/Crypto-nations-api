const SliderComponent = ({ data }) => {
  const getSliderColor = (value, item) => {
    const range = item.set.find(
      (range) => value >= range.MinLimit && value <= range.MaxLimit
    );
    switch (range?.NewPoints) {
      case 75:
        return 'red';
      case 100:
        return 'orange';
      case 125:
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.Items.map((item, index) => (
        <View key={index} style={styles.sliderContainer}>
          <Text style={styles.label}>{item.Name}</Text>
          <ParamSlider
            data={item}
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={item.Value}
            step={1}
            minimumTrackTintColor={getSliderColor(item.Value, item)}
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#000"
            onValueChange={(value) => {
              // console.log(`Value changed for ${item.Name}: ${value}`);
            }}
          />

        </View>
      ))}
    </ScrollView>
  );
};

export default SliderComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sliderContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  value: {
    fontSize: 14,
    marginTop: 5,
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
import ParamSlider from '../UI/ParamSlider';

