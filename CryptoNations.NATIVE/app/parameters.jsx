const Parameters = () => {


  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.categoryContainer, styles.content]}>
          <Text style={styles.categoryTitle}>{Education.Name}</Text>
          <SliderComponent data={Education}/>
      </View>
      <View style={[styles.categoryContainer, styles.content]}>
          <Text style={styles.categoryTitle}>{TechnologyExpertise.Name}</Text>
          <SliderComponent data={TechnologyExpertise}/>
      </View>
      <View style={[styles.categoryContainer, styles.content]}>
          <Text style={styles.categoryTitle}>{ReplacementRate.Name}</Text>
          <SliderComponent data={ReplacementRate}/>
      </View>
      <View style={[styles.categoryContainer, styles.content]}>
          <Text style={styles.categoryTitle}>{HealthCare.Name}</Text>
          <SliderComponent data={HealthCare}/>
      </View>
      <View style={[styles.categoryContainer, styles.content]}>
          <Text style={styles.categoryTitle}>{Infrastructure.Name}</Text>
          <SliderComponent data={Infrastructure}/>
      </View>
      <View style={[styles.categoryContainer, styles.content]}>
          <Text style={styles.categoryTitle}>{SocialMetrics.Name}</Text>
          <SliderComponent data={SocialMetrics}/>
      </View>
    </ScrollView>
    <Minbar Flag={true} Stats={true}/>
    </>
  );
};
export default Parameters;

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1, // Ensures ScrollView takes up the available space
    alignItems: 'center', // Centers the content horizontally
  },
  content: {
    maxWidth: 700, // Maximum width for the content
    width: '100%', // Ensures content doesn't exceed parent width
    padding: 16, // Optional padding for better layout
  },
});















var Education = ({
    Value:0,
    Points: 100,
    Type: 'A',// 0-100 w/ %
    Enabled:true,
    Name:'Education',
    Items:[                
            {
                Class:1,
                Value: 0,
                Gains: 0,
                Name:"Uneducated",
                set:[ 
                        {MinLimit:0,MaxLimit:10,NewPoints:125},
                        {MinLimit:11,MaxLimit:29,NewPoints:100},
                        {MinLimit:30,MaxLimit:100,NewPoints:75},
                ]
            },{
                Class:2,
                Value: 0,
                Gains: 0,
                Name:"Technical Schools",
                set:[ 
                        {MinLimit:0,MaxLimit:20,NewPoints:75},
                        {MinLimit:21,MaxLimit:49,NewPoints:125},
                        {MinLimit:50,MaxLimit:100,NewPoints:75},
                    ]
            },{
                Class:3,
                Value: 0,
                Gains: 0,
                Name:"University",
                set:[ 
                        {MinLimit:0,MaxLimit:10,NewPoints:75},
                        {MinLimit:11,MaxLimit:49,NewPoints:125},
                        {MinLimit:50,MaxLimit:100,NewPoints:75},
                    ]
            },{
                Class:4,
                Value: 0,
                Gains: 0,
                Name:"Crafts & Arts",
                set:[ 
                        {MinLimit:0,MaxLimit:2,NewPoints:75},
                        {MinLimit:3,MaxLimit:4,NewPoints:125},
                        {MinLimit:5,MaxLimit:100,NewPoints:75},
                    ]
                }
        ],
});
var TechnologyExpertise = ({
    Points: 100,
    Type: 'A',// 0-100 w/ %
    Enabled:true,
    Name:'Technology Expertise',
    Items:[
            {
                Class:1,
                Value: 0,
                Gains: 0,
                Name:"Mechanics & Smiths",
                set:[ 
                        {MinLimit:0,MaxLimit:5,NewPoints:75},
                        {MinLimit:6,MaxLimit:24,NewPoints:100},
                        {MinLimit:25,MaxLimit:100,NewPoints:75},
                ]
            },{
                Class:2,
                Value: 0,
                Gains: 0,
                Name:"Hardware engineers",
                set:[ 
                        {MinLimit:0,MaxLimit:5,NewPoints:75},
                        {MinLimit:6,MaxLimit:19,NewPoints:100},
                        {MinLimit:20,MaxLimit:100,NewPoints:75},
                ]
            },{
                Class:3,
                Value: 0,
                Gains: 0,
                Name:"Software engineers",
                set:[ 
                        {MinLimit:0,MaxLimit:5,NewPoints:75},
                        {MinLimit:6,MaxLimit:14,NewPoints:100},
                        {MinLimit:15,MaxLimit:100,NewPoints:75},
                ]
            },{
                Class:4,
                Value: 0,
                Gains: 0,
                Name:"Theoretical science",
                set:[ 
                        {MinLimit:0,MaxLimit:5,NewPoints:75},
                        {MinLimit:6,MaxLimit:19,NewPoints:100},
                        {MinLimit:20,MaxLimit:100,NewPoints:75},
                    ]
            },{
                Class:5,
                Value: 0,
                Gains: 0,
                Name:"Applied science",
                set:[ 
                        {MinLimit:0,MaxLimit:5,NewPoints:75},
                        {MinLimit:6,MaxLimit:19,NewPoints:100},
                        {MinLimit:20,MaxLimit:100,NewPoints:75},
                ]
            },{
                Class:6,
                Value: 0,
                Gains: 0,
                Name:"Future Tech",
                set:[ 
                    {MinLimit:0,MaxLimit:5,NewPoints:100},
                    {MinLimit:6,MaxLimit:6,NewPoints:125},
                    {MinLimit:7,MaxLimit:100,NewPoints:125},
                ]
            }
    ],    
});
var ReplacementRate = ({
    Points: 100,
    Type: 'B',// 0-10 w/ no %
    Enabled:true,
    Name:'Replacement Rate',
    Items:[
            {
                Class:1,
                Value: 0,
                Gains: 0,
                Name:"Replacement rate",
                set:[ 
                    {MinLimit:0,MaxLimit:18,NewPoints:75},
                    {MinLimit:19,MaxLimit:24,NewPoints:100},
                    {MinLimit:25,MaxLimit:100,NewPoints:125},
                ]
            }
        ],
});
var HealthCare = ({
    Points: 100,
    Type: 'A',// 0-100 w/ %
    Enabled:true,
    Name:'HealthCare',
    Items:[
            {
                Class:1,
                Value: 0,
                Gains: 0,
                Name:"Healthy",
                set:[ 
                    {MinLimit:0,MaxLimit:65,NewPoints:75},
                    {MinLimit:66,MaxLimit:89,NewPoints:100},
                    {MinLimit:90,MaxLimit:100,NewPoints:125},
                ]
            },{
                Class:2,
                Value: 0,
                Gains: 0,
                Name:"Cancer rate",
                set:[ 
                    {MinLimit:0,MaxLimit:10,NewPoints:100},
                    {MinLimit:11,MaxLimit:11,NewPoints:75},
                    {MinLimit:12,MaxLimit:100,NewPoints:75},
                ]
            },{
                Class:3,
                Value: 0,
                Gains: 0,
                Name:"Obesity",
                set:[ 
                    {MinLimit:0,MaxLimit:30,NewPoints:100},
                    {MinLimit:31,MaxLimit:31,NewPoints:75,},
                    {MinLimit:32,MaxLimit:100,NewPoints:75,},
                ]
            },{
                Class:4,
                Value: 0,
                Gains: 0,
                Name:"Handicap rate",
                set:[ 
                    {MinLimit:0,MaxLimit:25,NewPoints:100},
                    {MinLimit:26,MaxLimit:26,NewPoints:75,},
                    {MinLimit:27,MaxLimit:100,NewPoints:75,},
                ]
            }
        ]
 });
 var Infrastructure = ({
    
    Points: 100,
    Type: 'A',// 0-100 w/ %
    Enabled:true,
    Name:'Infrastructure',
    Items:[
            {
                Class:1,
                Value: 0,
                Gains: 0,
                Name:"Road access",
                set:[  
                    {MinLimit:0,MaxLimit:70,NewPoints:75},
                    {MinLimit:71,MaxLimit:71,NewPoints:100},
                    {MinLimit:72,MaxLimit:100,NewPoints:100},
                ]
            },{
                Class:2,
                Value: 0,
                Gains: 0,
                Name:"Water access",
                set:[  
                    {MinLimit:0,MaxLimit:70,NewPoints:75},
                    {MinLimit:71,MaxLimit:71,NewPoints:100},
                    {MinLimit:72,MaxLimit:100,NewPoints:100},
                ]
            },{
                Class:3,
                Value: 0,
                Gains: 0,
                Name:"Education access",
                set:[  
                    {MinLimit:0,MaxLimit:70,NewPoints:75},
                    {MinLimit:71,MaxLimit:71,NewPoints:100},
                    {MinLimit:72,MaxLimit:100,NewPoints:100},
                ]
            },{
                Class:4,
                Value: 0,
                Gains: 0,
                Name:"Health access",
                set:[  
                    {MinLimit:0,MaxLimit:70,NewPoints:75},
                    {MinLimit:71,MaxLimit:71,NewPoints:100},
                    {MinLimit:72,MaxLimit:100,NewPoints:100},
                ]
            },{
                Class:5,
                Value: 0,
                Gains: 0,
                Name:"Electricity access",
                set:[  
                    {MinLimit:0,MaxLimit:70,NewPoints:75},
                    {MinLimit:71,MaxLimit:71,NewPoints:100},
                    {MinLimit:72,MaxLimit:100,NewPoints:100},
                ]
            }
        ],
});
var SocialMetrics = ({
    Points: 100,
    Type: 'A',// 0-100 w/ %
    Enabled:true,
    Name:'Social Metrics',
    Items:[
            {   
                Class:1,
                Value: 0,
                Gains: 0,
                Name:"Homeless rate",
                set:[  
                    {MinLimit:0,MaxLimit:5,NewPoints:100,},
                    {MinLimit:6,MaxLimit:6,NewPoints:75},
                    {MinLimit:7,MaxLimit:100,NewPoints:75}
                ]
            },
            {   
                Class:2,
                Value: 0,
                Gains: 0,
                Name:"Mental health rate",
                set:[  
                    {MinLimit:0,MaxLimit:80,NewPoints:75},
                    {MinLimit:81,MaxLimit:81,NewPoints:100},
                    {MinLimit:82,MaxLimit:100,NewPoints:100},
                ]
            },
            {   
                Class:3,
                Value: 0,
                Gains: 0,
                Name:"Crime rate",
                set:[  
                    {MinLimit:0,MaxLimit:5,NewPoints:125},
                    {MinLimit:6,MaxLimit:15,NewPoints:75},
                    {MinLimit:16,MaxLimit:100,NewPoints:75},
                ]
            },
        ],
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
  import SliderComponent from './UI/SliderComponent';
