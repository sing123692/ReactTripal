const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var page = express.Router();

var mysqlConn = require('./config');



app.use(bodyParser.json());

page.post('/login2', express.urlencoded(), (req, res) => {

    if (!req.body.id || !req.body.password) {
        console.log("請輸入帳號密碼");
        return res.json({ status: 'notEnter', message: "請輸入帳號密碼" });
    }
    const sql = "SELECT IF(id = ? AND password = ?, 1, 0) as `match` FROM tb_user WHERE id = ? LIMIT 1";
    mysqlConn.query(sql, [req.body.id, req.body.password, req.body.id], function (error, results) {
        console.log(results);
        if (error) {
            console.log("資料庫發生錯誤");
            return res.send(error);
        } else if (results.length === 0) {
            console.log("帳號不存在");
            return res.json({ status: 'fail', message: "帳號不存在" });
        } else if (results[0].match === 1) {
           
            console.log("登入成功");
            return res.json({ status: 'success', message: "登入成功" });
        } else {
            console.log("密碼錯誤");
            return res.json({ status: 'fail', message: "密碼錯誤" });
        }
    });



    // const sqllogin = "SELECT id FROM tb_user;";
    // const sqllogin2 = "SELECT password  FROM tb_user WHERE id =?;";
    // mysqlConn.query(sqllogin2, [req.body.id], function (error, results) {})
    // mysqlConn.query(sqllogin, [], function (error, results) {
    //     // console.log(error);
    //     console.log(results)
    //     if (error) {
    //         console.log("資料庫發生錯誤");
    //         return res.send("資料庫發生錯誤");
    //       } else if (results.length===0) {
    //           console.log(results.length);
    //           console.log(req.body.id);
    //         console.log("使用者不存在");
    //         return res.json({ status: 'fail', message: "使用者不存在" });
    //       } else {

    //         if (results[0].password === req.body.password) {
    //           console.log("登入成功");
    //           return res.json({ status: 'success', message: "登入成功" });
    //         } else {
    //           console.log("帳號或密碼錯誤");
    //           return res.json({ status: 'fail', message: "帳號或密碼錯誤" });
    //         }
    //       }



    //         // if (results[0].password === req.body.password) {
    //         //     console.log("登入成功");
    //         // } else if (results[0].id == req.body.id && req.body.password !== results[0].password) {
    //         //     console.log("密碼錯誤");
    //         // }

    // });

});


module.exports = page;










