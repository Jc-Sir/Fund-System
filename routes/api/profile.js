const express = require("express");
const router = express.Router();
const passport = require('passport')

const Profile = require('./../../models/Profile')

// 测试接口
router.get('/test', (req, res) => {
    res.json('test12312')
})

// @router  Post 
// @desc  add infomation
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ProfileFields = {};
    if (req.body.type) ProfileFields.type = req.body.type;
    if (req.body.describe) ProfileFields.describe = req.body.describe;
    if (req.body.income) ProfileFields.income = req.body.income;
    if (req.body.expand) ProfileFields.expand = req.body.expand;
    if (req.body.cash) ProfileFields.cash = req.body.cash;
    if (req.body.remark) ProfileFields.remark = req.body.remark;
    new Profile(ProfileFields).save().then(profile => {
        res.json(profile)
    })
})

// @router  Post 
// @desc  edit infomation
// @access private
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ProfileFields = {};
    if (req.body.type) ProfileFields.type = req.body.type;
    if (req.body.describe) ProfileFields.describe = req.body.describe;
    if (req.body.income) ProfileFields.income = req.body.income;
    if (req.body.expand) ProfileFields.expand = req.body.expand;
    if (req.body.cash) ProfileFields.cash = req.body.cash;
    if (req.body.remark) ProfileFields.remark = req.body.remark;

    Profile.findOneAndUpdate({ _id: req.body.id }, { $set: ProfileFields }, { new: true })
        .then(profile => {
            res.json(profile)
        })
})

// @router  Post 
// @desc  delete infomation
// @access private
router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.body.id;
    Profile.findOneAndRemove({ _id: id })
        .then(profile => {
            profile.save().then(profile => {
                res.json(profile)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// @router  get 
// @desc   get all information
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有任何内容');
            }
            res.json(profile)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

// @router  get 
// @desc   get single information
// @access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有任何内容');
            }
            res.json(profile)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

module.exports = router