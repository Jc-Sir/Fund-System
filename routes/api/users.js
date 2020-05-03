// for register & login
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const gravatar = require('gravatar');
const keys = require('../../config/config');
const User = require('../../models/User') //引入数据模型

// $router post api/users/register
// @desc   注册

/**
 * @api {方法} 路径 标题
 * @apiGroup User
 * @apiDescription 描述这个API的信息
 *
 * @apiParam {String} userName 用户名
 * @apiParamExample {json} request-example
 * {
 *  "userName": "Eve"
 * }
 *
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *   "message": "用户名不存在"
 * }
 * 
 * 
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 * @apiSuccessExample  {json} success-example
 * {
 *   "userName": "Eve",
 *   "createTime": "1568901681"
 *   "updateTime": "1568901681"
 * }
 */
router.post("/register", (req, res) => {
    // 查询邮箱是否已经存在
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json('邮箱已经被注册')
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'retro' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity: req.body.identity,
                    password: req.body.password
                });
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
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
                return res.status(404).json('用户不存在！');
            }
            // 匹配密码
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // jwt.sign('规则',"加密名字","过期时间","箭头函数")
                    const rule = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        identity: user.identity
                    }
                    jwt.sign(rule, keys.secretkey, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    })
                } else {
                    res.status(404).json('密码错误！')
                }
            });
        }
    )
})

// 使用令牌获取数据
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity,
        avatar: req.user.avatar
    })
})


module.exports = router