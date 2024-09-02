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
const uploadMiddleware = multer({
    dest: 'uploads/',
    limits: { fieldSize: 2 * 1024 * 1024 }
})
const fs = require('fs');

const port = process.env.PORT || 3000;
const salt = bcrypt.genSaltSync(10)
const secret = '1234567890'
const connect = async () => {
    const res = await mongoose.connect("mongodb+srv://akashrananaware318:jxkOuR1H0IxPRCHI@cluster0.6rxck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    // console.log(res);
}

connect();
const allowedOrigin = 'http://localhost:3000'
const corsOptions = {
    origin:["https://pixl-blog-api.vercel.app"], //included origin as true
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))


app.get('/',(req,res)=>{
    res.json("Hello");
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email: email });
        console.log(email,password);
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ email, id: userDoc._id, name: userDoc.name }, secret, (err, token) => {
                if (err) throw err
                res.cookie('token', token).json({ email, _id: userDoc._id, name: userDoc.name });
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
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath);
    const { title, country, category, description } = req.body;
    let id = ''
    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
        id = info.id;
        // email = data.email;
    })
    try {
        // console.log(id);
        const user = await User.findOne({ _id: id })
        // authorId = user._id
        // console.log(user);
        const blogDoc = await Blog.create({
            title,
            country,
            category,
            description,
            authorId: user._id,
            timestamp: new Date(),
            cover: newPath,
            author: user.name
        })
        res.json(blogDoc);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    // res.json(ext);


})

app.get('/edit-blog/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const blogDoc = await Blog.findOne({ _id: id }).populate('authorId')
        console.log(blogDoc)
        res.json(blogDoc)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
    // res.json(req.params)
})

app.put('/edit-blog', async (req, res) => {
    const { title, country, category, description, id } = req.body;
    // console.log(req.body);
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
        if (err) throw err
        // email = data.email;
        try {
            const blogDoc = await Blog.findById(id)
            // console.log(blogDoc);
            const isAuthor = JSON.stringify(blogDoc.authorId) === JSON.stringify(info.id)
            if (!isAuthor) {
                res.status(400).json("You are not author");
            }
            // console.log(blog)
            const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, {
                title,
                country,
                category,
                description,
                lastUpdated: new Date(),
                cover: newPath ? newPath : blogDoc.cover
            })
            res.json(updatedBlog);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    })

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
        const docs = await Blog.find({ authorId: id }).sort({ timestamp: -1 });
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
        const docs = await Blog.find().sort({ timestamp: -1 });
        console.log(docs)
        res.json(docs);
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e);
    }

})

app.get('/profile', (req,res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, async (err, info) => {
        if (err) throw err
        const userDoc = await User.findOne({ _id: info.id })
        console.log(userDoc);
        // console.log({ name: userDoc.name, email: userDoc.email, _id: userDoc.id })
        res.json({ name: userDoc.name, email: userDoc.email, _id: userDoc.id })
    })
    //  res.json(req.cookies)
})
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.delete("/delete-blog", async (req, res) => {
    const { id } = req.body;
    // console.log(id)
    try {
        const userDoc = await Blog.findOneAndDelete({ _id: id })
        res.json(userDoc);
    } catch (e) {
        console.log(e)
        res.status(400).json(e);
    }

})

app.get("/display-blog/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const blogDoc = await Blog.findOne({ _id: id }).populate('authorId')
        res.json(blogDoc)
    }
    catch (e) {
        console.log(e),
            res.status(400).json(e);

    }
    // console.log(_id)
    // res.json(req.params);
})

app.listen(port)
