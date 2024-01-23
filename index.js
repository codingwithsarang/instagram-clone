const express = require("express")
const app = express()
const path = require('path')
const port = 3000

const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'instadata',
    password: "root"
  });

  
const { v4: uuidv4 } = require('uuid');
uuidv4();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }

})
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// let posts = [
//     {
//         id: uuidv4(),
//         username: "Apna collage",
//         image: "../uploads/channels4_profile.jpg",
//         caption: "love from apna collage"
//     },
//     {
//         id: uuidv4(),
//         username: "saaarang_joshi",
//         image: "/uploads/sarang.jpg",
//         caption: "just chill"
//     },
//     {
//         id: uuidv4(),
//         username: "sir stive",
//         image: "/uploads/stive.jpg",
//         caption: "better at any task"
//     },
//     {
//         id: uuidv4(),
//         username: "Elon Musk",
//         image: "/uploads/musk.webp",
//         caption: "rockkkk"
//     }
// ]





// let selfPosts = [
//     {
//         id: uuidv4(),
//         username: "saaarang_joshi",
//         image: "/uploads/sarang.jpg",
//         caption: "just chill"
//     }
// ]

let profile = {
    username: "saaarang_joshi",
   image: "/uploads/sarang.jpg",
   followers: "255",
   following: "124",
   bio: "Keep Calm | learning and growing | he/him"
}
app.get("/",(req,res)=>{
    try{
        let q = "select * from igdata"
        connection.query(q,(err,result)=>{
            if(err) throw err
            let user = result
            // console.log(user)
            res.render("home",{user: user , profile: profile})
        })
    }catch(err){
        console.log("error")
    }
})

app.get("/create",(req,res)=>{
    res.render("create")
})
// app.post("/created",(req,res)=>{
//     console.log(req.body.data)
//     let {username , image , caption} = req.body
//     posts.unshift({username,image,caption})
//     res.redirect("/")
// })

app.post('/upload', upload.single('profileInput'), (req, res) => {
    let img = `/uploads/${req.file.filename}`
    let {username ,caption} = req.body
    let id = uuidv4()
    // posts.unshift({id,username ,image ,caption})
    try{
        let q = "insert into igdata (id,username,img,caption) values (?,?,?,?)"
        let values = [id,username,img,caption]
        connection.query(q,values,(err,result)=>{
            if(err) throw err
            // console.log(result)
        })
    } catch(err){
        console.log(err)
    }
    // selfPosts.unshift({id,username ,img ,caption})
    try{
        let q = "insert into selfposts (id,username,img,caption) values (?,?,?,?)"
        let values = [id,username,img,caption]
        connection.query(q,values,(err,result)=>{
            if(err) throw err
            // console.log(result)
        })
    } catch(err){
        console.log(err)
    }
    res.redirect("/");
});

app.post('/yourposts',(req,res)=>{
    try{
        let q = "select * from selfposts"
        connection.query(q,(err,result)=>{
            if(err) throw err
            
            let selfPosts = result
            res.render("yourposts",{selfPosts: selfPosts})
        })
    } catch(err){
        console.log(err)
    }
})

app.post("/save",(req,res)=>{
    console.log(req.body)
})

app.listen(port,()=>{
    console.log("server is started")
})