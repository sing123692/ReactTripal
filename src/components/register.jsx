import React, { useEffect, useState } from 'react';
import './CSS/Register.css';
import axios from 'axios';



const Register = (props) => {
    const [id, setId] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [labelText, setLabelText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        try{
            

            const response = await axios.post('http://localhost:8000/register2',{
                id: id,
                password : password,
                password2 : password2,
            },{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(id,password);
            const {status} = response.data;
            if(status === 'DoublePasswordError'){
                setLabelText("輸入的密碼不一致請重新輸入");
                window.location = '/';
            }else if (status === 'Exist'){
                setLabelText("用戶已存在");
                
            }

              
            } catch (error) {
              console.error(error);
            }
        }
    
    


    return (
        <div id="RegisterPage">
            <h1>註冊Tripals</h1>
            <input type="button" value="透過Google繼續" />
            <input type="button" value="透過Facebook繼續"/>
            
            <div id="hrOr">
            <hr/>
            <p>OR</p>
            <hr/>
            </div>
            <form id="RegisterForm"  onSubmit={handleSubmit}>
            <label for="id">信箱</label>
            <input  name="id" 
                    type="email"
                    value={id}
                    onChange={(event)=>setId(event.target.value)}/>

            <label for="password">密碼</label>
            <input  name="password"
                    type="password"
                    value={password}
                    onChange={(event)=>setpassword(event.target.value)}/>

            <label for="password2">再次輸入</label>
            <input  name="password2"
                    type="password"
                    value={password2}
                    onChange={(event)=>setpassword2(event.target.value)}/>

            <label htmlFor="">{labelText}</label>
            <input type="submit" value="註冊"/>
            <p>已有Tripals帳號?</p>
            <a href="#">Sign in</a>
            </form>


        </div>


    );
};

export default Register;