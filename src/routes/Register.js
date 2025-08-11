let RegisterRouter = require('express').Router()
let userdata = require('../schema/Schema')
let JWT = require('jsonwebtoken')
let bcrypt = require('bcrypt')


RegisterRouter.post('/SignUp', async(req, res)=>{
    try {
        let FindUser = await userdata.findOne({email: req.body.email})

        if (FindUser) throw new Error()

        let data = {
                "fullname": req.body.fullname,
                "email": req.body.email,
                "age": req.body.age,
                "mobile": req.body.mobile,
                "password": await bcrypt.hash(req.body.password, 10),
                }

        await new userdata(data).save()
        res.status(201).send('Your account has been created successfully. Welcome!')

    } catch (error) {
        res.status(500).send(`This email is already registered.`)
    }
})






















RegisterRouter.post('/CheckAndGenerateToken', async(req, res)=>{
    try {
        let FindUser = await userdata.findOne({email: req.body.email})
        if (!FindUser) throw new Error()

            let checkPassword = await bcrypt.compare(req.body.password, FindUser.password)
            if (!checkPassword) throw new Error()

            let Payload = {
                            "email": FindUser.email,
                            "password" : FindUser.password
                        }

            let token = JWT.sign(Payload, process.env.SECRET_KEY, {expiresIn: "72h"})
            res.status(201).send(token)

    } catch (error) {
        res.status(500).send('Login failed. Please check your email and password.')
    }
})

































RegisterRouter.get('/LogIn', 
    
    
    
async(req, res, next)=>{
        let token = req.get('Authorization')
        if(!token) return res.status(401).send('token is not provided!')

            
            JWT.verify(token, process.env.SECRET_KEY, async(err, payload)=>{
                if(err) return res.status(500).send('invalid token')

                    let User = await userdata.findOne({email : payload.email})
                    req.User = User;
                    next();
            })
}, 




async(req, res)=>{
    try {
        await res.send(req.User)
    } catch (error) {
        res.status(500).send('An error occurred while processing your request.');
    }
})
































// RegisterRouter.put('/Update', async(req, res)=>{
//     let UpdataUser =  await userdata.findByIdAndUpdate(req.body.id, req.body, {new : true})
//     res.send(UpdataUser)
// })



module.exports = RegisterRouter