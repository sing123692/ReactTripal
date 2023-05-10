import { useState, useEffect } from 'react';
import axios from 'axios';

function AppSessionTest() {
  const [sessionData, setSessionData] = useState({}); // 預設為空物件

  useEffect(() => {
    axios.get('/getSessionData')
      .then(response => {
        console.log(response.data);
        setSessionData(response.data); // 取得 session 資料後，儲存至 state 中
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome {sessionData.name}</h1>
      <p>Your ID: {sessionData.id}</p>
    </div>
  );
}

export default AppSessionTest;