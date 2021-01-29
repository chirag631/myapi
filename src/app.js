const express = require("express");
require("./db/conn");
//const Student = require("./models/students");
const Register=require("./models/registers");

const app = express();
const port=process.env.PORT || 8000;
const path =require("path");
const hbs=require("hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path=path.join(__dirname,"../public");

const templete_path=path.join(__dirname,"../templete/views");
const partial_path=path.join(__dirname,"../templete/partials");

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templete_path);
hbs.registerPartials(partial_path);



app.get("/",(req,res)=>{
    console.log(path.join(__dirname,"../templete/views"));
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register");
})


//create a new user

app.post("/register", async(req,res)=>{

    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        console.log(req.body);
        
        if(password == cpassword){
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword

            });

            const registered= await registerEmployee.save();
            res.status(201).render("index");


        }
        else{
            res.send("passords are not mtching");
        }


    }catch(e){
        res.status(400).set("error");
    }
})

/*
app.post("/register",(req,res)=>{

    console.log(req.body);
    const user = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
    });
    
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send("error");
    })
    
    

})*/

/*app.post("/students",(req,res)=>{

    console.log(req.body);
    const user = new Student(req.body);
    
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
    
    

})
*/

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(port,()=>{
    console.log(`connection on port:${port}`);
})