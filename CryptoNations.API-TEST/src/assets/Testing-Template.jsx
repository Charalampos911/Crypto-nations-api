
import React, { useState,useRef,useEffect } from 'react';
import {BASE_URL} from '../App';
import { SlSizeFullscreen } from "react-icons/sl";
import { AiFillCheckSquare } from "react-icons/ai";
import { RiChatDeleteFill } from "react-icons/ri";
import { RiFullscreenExitLine } from "react-icons/ri";

const APITest =  ({
  token = null,
  method,
  dataEndpoint,
  dataBody,
  TestId,
  FullScreen,
  isFullScreen,
  returns,
  ResetA,
  ResetB,
  Autorun
}) => {
  const [AutorunCounter, setAutorunCounter] = useState(0);
  useEffect(() => {
    console.clear()
    console.warn("AutorunCounter===",AutorunCounter)
    setAutorunCounter(AutorunCounter+1)
    if(AutorunCounter>0)
    simulateAPIRequest()
  }, [Autorun]);
  

  useEffect(() => {
    setResponse(null);
    setView(2);
    setStatus('idle')
  }, [ResetA,ResetB]);
  

  const [response, setResponse] = useState(null);
  const [view, setView] = useState(2);
  
  const [status, setStatus] = useState('idle'); // 'idle' | 'fetching' | 'passed' | 'failed'
  const simulateAPIRequest = async () => {
    setStatus('fetching');
    
    try {

      // Step 2: Fetch protected data with bearer token
      const dataRes = await fetch(BASE_URL + dataEndpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: dataBody ? JSON.stringify(dataBody) : null,
      });

      if (!dataRes.ok) throw new Error('Data fetch failed');

      const data = await dataRes.json();
      setResponse(data);
      setStatus('passed');
      returns(data)
    } catch (err) {
      console.error(err);
      setStatus('failed');
    }
  };

  return (
<div className={`APITest ${isFullScreen ? 'fullscreen' : ''}`}>
      <div id='M-Bar'>
        <div className='TestId'>{TestId}</div>
        <div className={method}>{method}</div>
        <div className='bold'>{dataEndpoint}</div>
        <div className={status}>{status == 'passed' ? (<>{status} <AiFillCheckSquare /></>) : status == 'failed' ? (<>{status} <RiChatDeleteFill /></>) : status}</div>
        <div className='button' onClick={simulateAPIRequest}>Run Test</div>
        <div className='btnfullscreen' onClick={()=>FullScreen(isFullScreen?null:TestId)} >{isFullScreen?<RiFullscreenExitLine />:<SlSizeFullscreen/>}</div>
      </div>

      <div id='S-Bar'>
        <div onClick={()=>setView(1)} className={view==1?'Selected':null}>BODY</div>
        <div onClick={()=>setView(2)} className={view==2?'Selected':null}>RESULTS</div>
      </div>
      <div className='DisplayField'>
        {view==1?
        <div className='dataBody'>
        {dataBody==null?
          "There is no body for this request"
        :
          <pre
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(dataBody),
            }}
          >
          </pre>
        }
        </div>
        :
        view==2 && response?
        <pre
          dangerouslySetInnerHTML={{
            __html: syntaxHighlight(response),
          }}
        ></pre>
        :<div className='dataBody'>"Empty response" </div>
        // <pre>Response: {JSON.stringify(response, null, 2)}</pre>
        }
      </div>
    </div>
  );
};

export default APITest;

const syntaxHighlight = (json) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  json = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return json.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+\.?\d*\b)/g,
    (match) => {
      let cls = 'number';
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'key' : 'string';
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
};