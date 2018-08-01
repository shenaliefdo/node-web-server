const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); 
//setting view engine, previously used ejs
//npmjs.com/package/hbs
app.set("view engine","hbs");
//created a helper since written in multiple pieces of code
hbs.registerHelper('getCurrYear', function(){
    return new Date().getFullYear()
});
//helper that takes an argument
hbs.registerHelper('screamIt',function(text){
    return text.toUpperCase();   
});

app.use(function(req,res,next){
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFileSync('server.log',log +'\n',function(e){
        if(e){
            console.log(e);
        }
    });
    next();
});

// app.use(function(req,res,next){
//     res.render('maintenance.hbs');
   
// });

//use static files in server with a handler
app.use(express.static(__dirname + '/public'));

//server handlers
app.get('/',function(req,res){
    //res.send('<h1>Hello express</h1>');
    // res.send({
    //     name: "Shenalie",
    //     likes: [
    //         'reading',
    //         'exploring','gaming'
    //     ]

    // })
    //you can use templates from views to render page content for handlers
    res.render('home.hbs',{
        pageTitle: 'Home Page!',
        //currentYear: new Date().getFullYear(),
        data: 'Welcome to my website!!!!'
    });
});

app.get('/about',function(req,res){
    res.render('about.hbs',{
        pageTitle: 'About Page',
       // currentYear: new Date().getFullYear(),
        data: 'Hello my name is Shenalie'
    });
});

 

app.get('/bad',function(req,res){
    res.send({
        errorMessage: "error"
    })
});

app.listen(port,function(){
    console.log(`server is up on port ${port}`);
}); 