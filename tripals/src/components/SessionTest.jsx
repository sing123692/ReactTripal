import { useState, useEffect } from 'react';
import axios from 'axios';

function AppSessionTest() {
  const [sessionData, setSessionData] = useState({id:''}); // 預設為空物件

  // useEffect(() => {
  //   axios.get('http://localhost:3000/getSessionData')
  //     .then(response => {
  //       console.log(response);
  //       setSessionData(response.data); // 取得 session 資料後，儲存至 state 中
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  // useEffect(() => {
  //   if (sessionData && sessionData.id) {
  //     console.log(sessionData.id);
  //   }
  // }, [sessionData]);

  return (
    <div>
      <h1>Welcome {sessionData.id}</h1>
      <p>Session data: {JSON.stringify(sessionData)}</p>
    </div>

  );
}

export default AppSessionTest;