const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const app = express();

var page = express.Router();

var mysqlConn = require('./config');


app.use(session({
    secret: 'my secret key', // 用於加密會話ID的密鑰，可以自行替換
    resave: false,
    saveUninitialized: true,
    maxAge: 5 * 1000
}));

app.use(bodyParser.json());




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
                    console.log(req.session.user);
                    return res.json({ status: 'success', message: "登入成功" });
                }

            });
        }

    });


});


module.exports = page;










