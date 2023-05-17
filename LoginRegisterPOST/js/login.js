const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

var page = express.Router();

var mysqlConn = require('./config');

let userno;


app.use(bodyParser.json());

app.use(session({
    secret: 'mysecretkey', 
    resave: false,
    saveUninitialized: true,
    maxAge: 5 * 1000,
    cookie :{secure:false}
}));



page.post('/login2', express.urlencoded(), (req, res) => {


    if (!req.body.id || !req.body.password) {
        console.log("請輸入帳號密碼");
        return res.json({ status: 'notEnter', message: "請輸入帳號密碼" });
    }

    const sqlCheckUser = "SELECT COUNT(*) as count FROM tb_user WHERE id = ?";
    const sqlCheckPassword = "SELECT COUNT(*) as count FROM tb_user WHERE id = ? AND password = ?";

    mysqlConn.query(sqlCheckUser, [req.body.id], function (error, results) {
        if (error) {
            console.log(error);
            console.log("資料庫錯誤");
        }
        if (results[0].count === 0) {
            console.log("無此用戶");
            return res.json({ status: 'notExist', message: "尚未註冊!" });
        } else {
            mysqlConn.query(sqlCheckPassword, [req.body.id, req.body.password], function (error, results) {
                if (error) {
                    console.log(error);
                    console.log("資料庫錯誤");
                }
                if (results[0].count === 0) {
                    console.log("密碼錯誤了")
                    return res.json({ status: 'fail', message: "密碼錯誤" });
                } else {
                    console.log("成功登入!");
                    req.session.user = {
                        id: req.body.id,
                        password: req.body.password
                     
                    };
                    return res.json({ 
                        status: 'success', 
                        message: "登入成功",
                        data:req.session.user });
                }

            });
        }

    });

  
});



  
//https://custudy.wordpress.com/2016/12/09/session-%E5%9C%A8-express-%E4%B8%8A%E7%9A%84%E6%87%89%E7%94%A8-%E7%99%BB%E5%85%A5%E5%AF%A6%E4%BD%9C%E7%82%BA%E4%BE%8B/

module.exports = page;










