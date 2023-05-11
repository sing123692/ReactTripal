import React, { useState } from 'react';
import './CSS/login.css';
import axios from 'axios';



const Login = () => {
    const [id, setId] = useState('');
    const [password, setpassword] = useState('');
    const [labelText, setLabelText] = useState('');

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

            // console.log(response);
            console.log(id,password);
            const {status} = response.data;
            if(status === 'notEnter'){
                setLabelText("尚未輸入");
            }else if (status === 'success'){
                setLabelText("登入成功");
                // window.location = '/SessionTest';
                console.log('kk');
            }else if(status === 'notExist'){
                setLabelText("尚未註冊");
            }else if(status === 'fail'){
                setLabelText("密碼錯誤");
            }

              
            } catch (error) {
              console.error(error);
            }
        }
    
        const google = () =>{
            window.open("http://localhost:8000/auth/google","_self");
        }


    return (
        <div id="RegisterPage">
            <h1>Welcome back to Tripals</h1>
            <input type="button" value="透過Google登入" onClick={google} />
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
            <label id='checkLabel' htmlFor="">{labelText}</label>
            <input type="submit" value="登入"/>
            <p>沒有Tripals帳號?</p>
            <a href="#">Sign up</a>
            </form>


        </div>


    );
};

export default Login;