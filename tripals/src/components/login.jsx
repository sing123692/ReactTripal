import React, { useState } from 'react';
import './CSS/login.css';
import axios from 'axios';




const Login = (props) => {
    const [id, setId] = useState('');
    const [password, setpassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        

        try{
            

            const response = await axios.post('http://localhost:8000/login2',{
                id: id,
                password : password,
            },{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'

                }
            });
            console.log(id,password);
            const {status} = response.data;

            if (status === 'success') {
                alert('登入成功');
                window.location = '../../TaiwanTripals/Tripals.html';
              } else if (status === 'notuser') {
                alert('尚未註冊');
                window.location = './Register.html';
              } else {
                alert('帳號或密碼輸入錯誤');
              }
        
              console.log('OK');
            } catch (error) {
              console.error(error);
            }
        }
    
    


    return (
        <div id="RegisterPage">
            <h1>Welcome back to Tripals</h1>
            <input type="button" value="透過Google登入" />
            <input type="button" value="透過Facebook登入"/>
            
            <div id="hrOr">
            <hr/>
            <p>OR</p>
            <hr/>
            </div>
            <form id="Loginform"  onSubmit={handleSubmit}>
            <label for="id">信箱</label>
            <input  name="id" 
                    type="text"
                    value={id}
                    onChange={(event)=>setId(event.target.value)}/>
            <label for="password">密碼</label>
            <input  name="password"
                     type="text"
                     value={password}
                     onChange={(event)=>setpassword(event.target.value)}/>
            <label id="errorLabel"></label>
            <input type="submit" value="登入"/>
            <p>沒有Tripals帳號?</p>
            <a href="#">Sign up</a>
            </form>


        </div>


    );
};

export default Login;