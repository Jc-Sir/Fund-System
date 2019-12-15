// for register & login

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");


const User = require('../../models/User') //引入数据模型

// $route  api/users/test
// @desc   返回请求的json数据
// access  public 公有接口
router.get("/test", (req, res) => {
    res.json({ msg: 'login works' })
})

// $router post api/users/register
// @desc   注册
router.post("/register", (req, res) => {
    // 查询邮箱是否已经存在
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: '邮箱已经被注册' })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        console.log(hash)

                        // Store hash in your password DB. 
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => {
                                console.log(err);
                            })
                    });
                });

            }
        })
})

module.exports = router