const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
const Blog = require('./model/Blog')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
const multer = require('multer');
const uploadMiddleware = multer({dest : 'uploads/'})
const fs = require('fs');

const salt = bcrypt.genSaltSync(10)
const secret = '1234567890'
const connect = async () => {
    await mongoose.connect("mongodb://localhost:27017/");
}



connect();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email: email });
        // console.log(userDoc);
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ email, id: userDoc._id, name:userDoc.name }, secret, (err, token) => {
                if (err) throw err
                res.cookie('token', token).json({email,_id: userDoc._id,name:userDoc.name});
                // res.cookie('token',token);
                // res.json(token);
            })
        }
        else {
            res.status(400).json("invalid credentials");
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        jwt.sign({ email, id: userDoc._id }, secret, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json(userDoc);
        })
        // res.json(userDoc);

    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    // console.log(response);
    // res.json("login successfull");
})

app.post('/create-blog', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath= path + '.' + ext
    fs.renameSync(path,newPath);
    const { title, country, category, description, image } = req.body;
    let id = ''
    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
        id = info.id;
        // email = data.email;
    })
    try {
        console.log(id);
        const user = await User.findOne({ _id:id })
        // authorId = user._id
        // console.log(user);
        const blogDoc = await Blog.create({
            title,
            country,
            category,
            description,
            authorId :user._id,
            timestamp: new Date(),
            cover: newPath,
            author:user.name
        })
        res.json(blogDoc);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    // res.json(ext);


})


app.put('/edit-blog', async (req, res) => {
    const { title, country, category, description, image,id } = req.body;
    // console.log(country)
    // let email = ''
    // let author = ''
    // const { token } = req.cookies;
    // jwt.verify(token, secret, async (err, info) => {
    //     email = info.email;
    //     // email = data.email;
    // })
    try {
        // const user = await fi.findOne({ _id:id })
        // author = user.name
        const blogDoc = await Blog.findOneAndUpdate({_id:id},{
            title,
            country,
            category,
            description,
            timestamp: new Date(),
            image,
        })
        res.json(blogDoc);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

app.get('/get-my-blogs', async (req, res) => {
    // let email =''
    const { token } = req.cookies;
    const id = jwt.verify(token, secret, (err, info) => {
        // const id = info.id;
        // email = data.email;
        return info.id
    })
    try {
        const docs = await Blog.find({ authorId:id }).sort({timestamp:-1});
        res.json(docs);
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e);
    }

})

app.get('/get-blogs', async (req, res) => {
    // const email =''
    // const {token} = req.body;
    // jwt.verify(token,secret,async (err,info)=>{
    //     const data = await info.json();
    //     email = data.email;
    // })
    try {
        const docs = await Blog.find().sort({timestamp:-1});
        res.json(docs);
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e);
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, (err, info) => {
        if (err) throw err
        console.log({name:info.email,email:info.email   ,_id:info.id})
        res.json({name:info.email,email:info.email,info,_id:info.id})
    })
    //  res.json(req.cookies)
})
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.delete("/delete-blog",async (req,res)=>{
    const  {id} =req.body;
    // console.log(id)
    try{
    const userDoc = await Blog.findOneAndDelete({_id:id})
    res.json(userDoc);
    }catch(e){
        console.log(e)
        res.status(400).json(e);
    }
    
})


app.listen(3000, () => {
    console.log("app is listening to port 3000");
})