"use strict"
const Chalk = require('chalk')
const c = Chalk.default
const helper = require('./helper')
const log = console.log
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports =  function(method,model) {
    const handleRequest = function(req, res) {        
        const types = method.toLowerCase()
        return checkType(types,req,res);
    }

    const checkType = function(types,req,res) {
        try {
            for (let obj in job) {
                if (obj === types) {
                    job[obj](req, res)
                    break;
                }
            }
        } catch (error) {
            throw error
        }        
    }
    const get = function (req,res) {
         try {             
            const Schema = require(`../models/${model}`)             
            Schema.find().exec().then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({
                    message: err,
                    Error: 'data not found'                         
                })
            });
         } catch (error) {
            log(c.red(`please make a sure, that model's name is exited`))
            res.status(500).json({
                Error: 'internal server error'
            })
         }

    }

    const post = function (req, res) {
        try {
            const Schema = require(`../models/${model}.js`)
            const fun = Object.assign(new Schema({
                _id: new mongoose.Types.ObjectId()
            }), req.body)
            fun.save().then((result) => {
                res.status(200).json({
                    create: result
                })
            }).catch((err) => {
                if(err.code === 11000) {
                    res.status(500).json({
                        error: "already exist"
                    })
                } else {
                    res.status(500).json({error: err})
                }
            });
        } catch (error) {
            log(c.red(`please make a sure, that model's name is exited`))                        
            res.status(500).json({
                Error: 'internal server error',
                err: error
            })
        }
    }

    const updateArray = function(req, res) {
        try {
            const Schema = require(`../models/${model}`)
            
            Schema.findOneAndUpdate(req.params,{
                $push: req.body
            }).exec().then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({error: err})
            });
        } catch (error) {
            log(c.red(`please make a sure, that model's name is exited`))
            res.status(500).json({
                Error: 'internal server error',
                err: error
            })
        }
    }

    const deleteArray = function(req, res) {
        try {
            const Schema = require(`../models/${model}`)
            Schema.findOneAndUpdate(req.params,{
                $pull: req.body
            }).exec().then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({error: err})
            });
        } catch (error) {
            log(c.red(`please make a sure, that model's name is exited`))
            res.status(500).json('internal server error')
        }
    }

    const patch = function (req, res) {
        try {
            const Schema = require(`../models/${model}`)            
            const updateOps = {};
            let results = Object.entries(req.body).map(([key, value]) => ({
                [key]: value
            }))
                        
            let query = helper(results).check();
            Promise.all([results, query])
            .then((response) => {
                for(let o of response[1]) {
                    Object.assign(updateOps, o)                    
                }
                return updateOps                
            }).then(response => {
                Schema.update(req.params, {
                    $set: response
                })
                .exec()
                .then((result) => {
                    res.status(200).json(result)
                }).catch((err) => {
                    res.status(500).json({
                        error: err,
                        message: 'Error to update data'
                    })
                });

            }).catch(err => {
                res.status(500).json({message: "internal server error",error: err})
            })
        } catch(error) {
            res.status(500).json({err: error, message: 'please check, that model is exist'})
        }
        
            
        
    }

    const erase = function (req, res) {
        try {
            const Schema = require(`../models/${model}`)
            Schema.remove(req.params).exec().then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({
                    Error: err
                })
            });
        } catch (error) {
            log(c.red(`please make a sure, that model's name is exited`))            
            res.status(500).json({
                Error: 'internal server error'
            })
        }
    }

    const getOne = function (req, res) {
        try {
            const Schema = require(`../models/${model}`)
            Schema.findById(req.params).exec().then((result) => {
                if (result.length !== 0) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({
                        message: 'No entries found'
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    Error: err
                })
            });
        } catch (error) {
            log(c.red(`please make a sure, that model's name is exited`))             
            res.status(500).json({
                Error: 'internal server error'
            })
        }
    }

    const put = function (req, res) {
        res.send('success update '+models)
    }
    
    const login = function (req, res) {
        try {
            const Schema = require(`../models/${model}`)
            const {password} = req.body
            if(req.body.email !== undefined) {
                const email = req.body.email
                Schema.find({email}).exec().then((result) => {
                    if(result.length < 1) {
                        return res.status(401).json({
                            message: 'email doensn\'t exist'
                        })
                    } else {
                        if(result[0].password === password) {
                            const token = jwt.sign({_id: result[0]._id,email: result[0].email},process.env.JWT_KEY,{expiresIn: 12400})
                            return res.status(200).json({
                                message: 'you\'ve authenticated',
                                token
                            })
                        }
                        return res.status(401).json({
                            message: 'failed to authenticated'
                        })
                    }
                }).catch((err) => {
                    res.status(401).json({
                        message: 'failed to authenticated',
                        error: err
                    })
                });
            } else if(req.body.username !== undefined) {
                const {username} = req.body
                Schema.find({username}).exec().then((result) => {
                    if(result.length < 1) {
                        return res.status(401).json({
                            message: 'username doensn\'t exist'
                        })
                    } else {
                        if(result[0].password === password) {
                            const token = jwt.sign({_id: result[0]._id,username: result[0].username},process.env.JWT_KEY,{expiresIn: 12400})
                            return res.status(200).json({
                                message: 'you\'ve authenticated',
                                token
                            })
                        }
                        return res.status(401).json({
                            message: 'failed to authenticated'
                        })
                    }
                }).catch((err) => {
                    return res.status(401).json({
                        message: 'failed to authenticated',
                        error: err
                    })
                });
            } else {
                return res.status(401).json({
                    message: 'failed to authenticated',
                    error: err
                })
            }
        } catch (error) {
            res.status(401).json({
                message: 'failed to authenticated',
                error
            })
        }
    }

    const job = {
        get,
        post,
        patch,
        delete:erase,
        getone:getOne,
        put,
        updatearray: updateArray,
        deletearray: deleteArray,
        login
    }

    return handleRequest
}