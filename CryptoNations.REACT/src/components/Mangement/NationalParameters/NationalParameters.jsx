import React, { useState,useRef,useEffect } from 'react';
import TheGreatSlider from "../../UI/Slider";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
export default function NationalParameters({ChangeSelection}) { 
    const [ActiveTab, setActiveTab] = useState(0);
    const Api = useSelector((state) => state.Api);
    var InitatedNation = Api.CurrentCountry;


    var Education = ({
        Value:0,
        Points: 100,
        Type: 'A',// 0-100 w/ %
        Enabled:true,
        Items:[                
                {
                    Class:1,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 1).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 1).Gains,
                    Name:"Uneducated",
                    set:[ 
                            {MinLimit:0,MaxLimit:10,NewPoints:125},
                            {MinLimit:11,MaxLimit:29,NewPoints:100},
                            {MinLimit:30,MaxLimit:100,NewPoints:75},
                    ]
                },{
                    Class:2,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 2).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 2).Gains,
                    Name:"Technical Schools",
                    set:[ 
                            {MinLimit:0,MaxLimit:20,NewPoints:75},
                            {MinLimit:21,MaxLimit:49,NewPoints:125},
                            {MinLimit:50,MaxLimit:100,NewPoints:75},
                        ]
                },{
                    Class:3,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 3).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 3).Gains,
                    Name:"University",
                    set:[ 
                            {MinLimit:0,MaxLimit:10,NewPoints:75},
                            {MinLimit:11,MaxLimit:49,NewPoints:125},
                            {MinLimit:50,MaxLimit:100,NewPoints:75},
                        ]
                },{
                    Class:4,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 4).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Education' && item.Class === 4).Gains,
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
        Items:[
                {
                    Class:1,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 1).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 1).Gains,
                    Name:"Mechanics & Smiths",
                    set:[ 
                            {MinLimit:0,MaxLimit:5,NewPoints:75},
                            {MinLimit:6,MaxLimit:24,NewPoints:100},
                            {MinLimit:25,MaxLimit:100,NewPoints:75},
                    ]
                },{
                    Class:2,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 2).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 2).Gains,
                  Name:"Hardware engineers",
                    Name:"Hardware engineers",
                    set:[ 
                            {MinLimit:0,MaxLimit:5,NewPoints:75},
                            {MinLimit:6,MaxLimit:19,NewPoints:100},
                            {MinLimit:20,MaxLimit:100,NewPoints:75},
                    ]
                },{
                    Class:3,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 3).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 3).Gains,
                    Name:"Software engineers",
                    set:[ 
                            {MinLimit:0,MaxLimit:5,NewPoints:75},
                            {MinLimit:6,MaxLimit:14,NewPoints:100},
                            {MinLimit:15,MaxLimit:100,NewPoints:75},
                    ]
                },{
                    Class:4,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 4).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 4).Gains,
                    Name:"Theoretical science",
                    set:[ 
                            {MinLimit:0,MaxLimit:5,NewPoints:75},
                            {MinLimit:6,MaxLimit:19,NewPoints:100},
                            {MinLimit:20,MaxLimit:100,NewPoints:75},
                        ]
                },{
                    Class:5,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 5).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 5).Gains,
                    Name:"Applied science",
                    set:[ 
                            {MinLimit:0,MaxLimit:5,NewPoints:75},
                            {MinLimit:6,MaxLimit:19,NewPoints:100},
                            {MinLimit:20,MaxLimit:100,NewPoints:75},
                    ]
                },{
                    Class:6,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 6).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='TechnologyExpertise' && item.Class === 6).Gains,
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
        Items:[
                {
                    Class:1,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Replacement' && item.Class === 1).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Replacement' && item.Class === 1).Gains,
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
        Items:[
                {
                    Class:1,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 1).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 1).Gains,
                    Name:"Healthy",
                    set:[ 
                        {MinLimit:0,MaxLimit:65,NewPoints:75},
                        {MinLimit:66,MaxLimit:89,NewPoints:100},
                        {MinLimit:90,MaxLimit:100,NewPoints:125},
                    ]
                },{
                    Class:2,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 2).Value,
                  Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 2).Gains,
                    Name:"Cancer rate",
                    set:[ 
                        {MinLimit:0,MaxLimit:10,NewPoints:100},
                        {MinLimit:11,MaxLimit:11,NewPoints:75},
                        {MinLimit:12,MaxLimit:100,NewPoints:75},
                    ]
                },{
                    Class:3,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 3).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 3).Gains,
                    Name:"Obesity",
                    set:[ 
                        {MinLimit:0,MaxLimit:30,NewPoints:100},
                        {MinLimit:31,MaxLimit:31,NewPoints:75,},
                        {MinLimit:32,MaxLimit:100,NewPoints:75,},
                    ]
                },{
                    Class:4,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 4).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='HealthCare' && item.Class === 4).Gains,
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
        Items:[
                {
                    Class:1,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 1).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 1).Gains,
                    Name:"Road access",
                    set:[  
                        {MinLimit:0,MaxLimit:70,NewPoints:75},
                        {MinLimit:71,MaxLimit:71,NewPoints:100},
                        {MinLimit:72,MaxLimit:100,NewPoints:100},
                    ]
                },{
                    Class:2,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 2).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 2).Gains,
                    Name:"Water access",
                    set:[  
                        {MinLimit:0,MaxLimit:70,NewPoints:75},
                        {MinLimit:71,MaxLimit:71,NewPoints:100},
                        {MinLimit:72,MaxLimit:100,NewPoints:100},
                    ]
                },{
                    Class:3,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 3).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 3).Gains,
                    Name:"Education access",
                    set:[  
                        {MinLimit:0,MaxLimit:70,NewPoints:75},
                        {MinLimit:71,MaxLimit:71,NewPoints:100},
                        {MinLimit:72,MaxLimit:100,NewPoints:100},
                    ]
                },{
                    Class:4,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 4).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 4).Gains,
                    Name:"Health access",
                    set:[  
                        {MinLimit:0,MaxLimit:70,NewPoints:75},
                        {MinLimit:71,MaxLimit:71,NewPoints:100},
                        {MinLimit:72,MaxLimit:100,NewPoints:100},
                    ]
                },{
                    Class:5,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 5).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='Infrastructure' && item.Class === 5).Gains,
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
        Items:[
                {   
                    Class:1,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='SocialMetrics' && item.Class === 1).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='SocialMetrics' && item.Class === 1).Gains,
                    Name:"Homeless rate",
                    set:[  
                        {MinLimit:0,MaxLimit:5,NewPoints:100,},
                        {MinLimit:6,MaxLimit:6,NewPoints:75},
                        {MinLimit:7,MaxLimit:100,NewPoints:75}
                    ]
                },
                {   
                    Class:2,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='SocialMetrics' && item.Class === 2).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='SocialMetrics' && item.Class === 2).Gains,
                    Name:"Mental health rate",
                    set:[  
                        {MinLimit:0,MaxLimit:80,NewPoints:75},
                        {MinLimit:81,MaxLimit:81,NewPoints:100},
                        {MinLimit:82,MaxLimit:100,NewPoints:100},
                    ]
                },
                {   
                    Class:3,
                    Value: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='SocialMetrics' && item.Class === 3).Value,
                    Gains: InitatedNation.Categories.find(
                      (item) =>item.TypeOf=='SocialMetrics' && item.Class === 3).Gains,
                    Name:"Crime rate",
                    set:[  
                        {MinLimit:0,MaxLimit:5,NewPoints:125},
                        {MinLimit:6,MaxLimit:15,NewPoints:75},
                        {MinLimit:16,MaxLimit:100,NewPoints:75},
                    ]
                },
            ],
    });

const HandleReturnValue =(e)=>{
    switch (e.id) {
        case "Education":
            Education.Items.forEach((item, index) => {
                if(item.Class==e.Class){
                    Education.Items[index].Value = e.val
                    Education.Items[index].Gains = e.Gains
                }
            })
            break;
        case "TechnologyExpertise":
            TechnologyExpertise.Items.forEach((item, index) => {
                if(item.Class==e.Class){
                    TechnologyExpertise.Items[index].Value = e.val   
                    TechnologyExpertise.Items[index].Gains = e.Gains 
                }
            })
            
            break;
        case "ReplacementRate":
            ReplacementRate.Items.forEach((item, index) => {
                if(item.Class==e.Class){
                    ReplacementRate.Items[index].Value = e.val   
                    ReplacementRate.Items[index].Gains = e.Gains 
                }
            })
            break;
        case "HealthCare":
            HealthCare.Items.forEach((item, index) => {
                if(item.Class==e.Class){
                    HealthCare.Items[index].Value = e.val   
                    HealthCare.Items[index].Gains = e.Gains 
                }
            })
            break;
        case "Infrastructure":
            Infrastructure.Items.forEach((item, index) => {
                if(item.Class==e.Class){
                    Infrastructure.Items[index].Value = e.val    
                    Infrastructure.Items[index].Gains = e.Gains  
                }
            })
            break;
        case "SocialMetrics":
            SocialMetrics.Items.forEach((item, index) => {
                if(item.Class==e.Class){
                    SocialMetrics.Items[index].Value = e.val   
                    SocialMetrics.Items[index].Gains = e.Gains 
                }
            })
            break;
        default:
            // Code for any other case, if needed
            break;
    }
}

   return (
    <> {/*className="National-Parameters"*/}
        {ActiveTab==0?
        <>
          <div className="ChangeSelection" onClick={()=>ChangeSelection()}><FaArrowLeft /></div>
          <label>National parameters</label>
          <div className='Main-button' onClick={()=>setActiveTab(1)}>
          Education
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(2)}>
          Technology & Expertise
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(3)}>
          Replacement rate
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(4)}>
          Healthcare
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(5)}>
          Infrastructure
          </div>
          <div className='Main-button' onClick={()=>setActiveTab(6)}>
          SocialMetrics
          </div>
        </>
        :null}
        {ActiveTab==1?
        <TheGreatSlider id={"Education"} Categ={"EDUCATION"} params={Education}  returnValue={HandleReturnValue} ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==2?
        <TheGreatSlider id={"TechnologyExpertise"}  Categ={"TECHNOLOGY & EXPERTISE"} params={TechnologyExpertise}  returnValue={HandleReturnValue} ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==3?
        <TheGreatSlider id={"ReplacementRate"} Categ={"REPLACEMENT RATE"} params={ReplacementRate}  returnValue={HandleReturnValue} ChangeSelection={()=>setActiveTab(0)}/>
        :null}
        {ActiveTab==4?
        <TheGreatSlider id={"HealthCare"} Categ={"HEALTHCARE"} params={HealthCare}  returnValue={HandleReturnValue} ChangeSelection={()=>setActiveTab(0)}/>
        :null} 
        {ActiveTab==5?
        <TheGreatSlider id={"Infrastructure"} Categ={"INFRASTRUCTURE"} params={Infrastructure}  returnValue={HandleReturnValue} ChangeSelection={()=>setActiveTab(0)}/>
        :null} 
        {ActiveTab==6?
        <TheGreatSlider id={"SocialMetrics"} Categ={"SOCIAL METRICS"} params={SocialMetrics}  returnValue={HandleReturnValue} ChangeSelection={()=>setActiveTab(0)}/>
        :null} 
    </>
    )
}
