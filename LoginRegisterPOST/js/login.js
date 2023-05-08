const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var page = express.Router();

var mysqlConn = require('./config');



app.use(bodyParser.json());

page.post('/login2', express.urlencoded(), (req, res) => {

    // console.log(req.body);

    let errorCount = 0;


    const sqllogin = "SELECT * FROM tb_user WHERE id = ? AND password = ?";
    mysqlConn.query(sqllogin, [req.body.id, req.body.password], function (error, results) {
        console.log(res.body);
        if (error) {
            console.log("資料庫發生錯誤");
            return res.send("資料庫發生錯誤");
        } else if (results.length === 0) {
            console.log("尚未註冊");

            return res.json({ status: 'notuser', message: '查無此用戶尚未註冊' });
        } else {
            if (req.body.id !== null && req.body.password !== null) {
                if (results[0].password === req.body.password && results[0].id === req.body.id) {
                    console.log("登入成功了");
                    return res.json({ status: 'success', message: '登入成功' });

                } else {
                    console.log("密碼錯誤");
                    errorCount++;
                    return res.json({ status: 'fail', message: '密碼錯誤' });

                }
            } else {
                console.log("請輸入帳號和密碼");
                return res.json({ status: 'fail', message: '請輸入帳號和密碼' });
            }
        }
    });

});


module.exports = page;










