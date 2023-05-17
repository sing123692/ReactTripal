import { useState, useEffect } from 'react';
import axios from 'axios';

function AppSessionTest() {
  const [sessionData, setSessionData] = useState(''); // 預設為空物件
  const [labelText, setLabelText] = useState('');
  const [user, setUser] = useState(null);

useEffect(()=>{
  axios.get('/getSessionData')
  .then(response =>{
    console.log(response);
    if(response.data.status === 'successLogin'){
      setSessionData(response.data.data);
    }
  })
  .catch(error=>{
    setSessionData('');
  })
},[]);
 

  return (
    <div>
      <h1>Welcome {sessionData.id}</h1>
      <p>Session data: {sessionData}</p>
      <button >logout</button>
    </div>

  );
}

export default AppSessionTest;