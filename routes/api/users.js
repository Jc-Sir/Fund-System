// for register & login
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport')
const gravatar = require('gravatar');
const keys = require('../../config/config');


const User = require('../../models/User') //引入数据模型

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
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
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


// $router post api/users/login
// @desc   登录  返回token jwt passport
// access public
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查库
    User.findOne({ email }).then(
        user => {
            if (!user) {
                return res.status(404).json({ email: '用户不存在！' });
            }
            // 匹配密码
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // jwt.sign('规则',"加密名字","过期时间","箭头函数")
                    const rule = { id: user.id, name: user.name }
                    jwt.sign(rule, keys.secretkey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // res.json({ msg: 'success' });
                } else {
                    res.status(404).json({ password: '密码错误！' })
                }
            });
        }
    )
})


// 使用令牌获取数据
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email })
})



module.exports = router