const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var page = express.Router();

var mysqlConn = require('./config');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



page.post('/register2', express.urlencoded(), (req, res) => {


    const sqlselect = "SELECT * FROM tb_user WHERE id = ?";
    const sqlinsert = "INSERT INTO tb_user (id, password) VALUES (?, ?);";

    mysqlConn.query(sqlselect, [req.body.id], function (error, results) {
        //判斷密碼二次輸入
        if(req.body.password !== req.body.password2){
            console.log("輸入的密碼不一致請重新輸入");
            return res.json({ status: 'DoublePasswordError', message: "輸入的密碼不一致請重新輸入" });
        }
        //判斷是否有被註冊
        if (results.length > 0) {

            console.log("已經被註冊");
            return res.json({ status: 'Exist', message: "已經被註冊" });

        } else {

            mysqlConn.query(sqlinsert, [req.body.id, req.body.password], function (err, results) {
                if (err) {
                    console.error('DB error:', err);
                } else {
                    console.log("註冊成功");
                    return res.redirect('../Success');
                }


            });

        }
    });




});





module.exports = page;