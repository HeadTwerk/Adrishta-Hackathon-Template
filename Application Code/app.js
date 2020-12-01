// initialising all packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const xlxs = require('xlsx');
const formidable = require('formidable');
const fs = require('fs');


// setting up an instance of express
const app = express();

// to serve up the static files 
app.use(express.static("public"));

// to set up body parser
app.use(bodyParser.urlencoded({extended:true}));

// to use templating for dynmic content
app.set("view engine","ejs");



var voteCounter=0;
var userQuestion ="What has 4 legs?" ;
var options=[];
var optionsVote=[];
var totalUsers=5;
var startTime;
var voterArr =[];
var fileName;

/////////////// ADMIN ROUTE /////////////////
app.get('/admin',function(req,res){
    res.render('admin',{pageName:"Admin Page"});
});

app.post('/admin',function(req,res){

    var formData = formidable.IncomingForm();
    formData.parse(req,function(err,feilds,files){
        
       fileName = files.file.name;
        var newpath = __dirname+"/uploads/"+files.file.name;
        fs.rename(files.file.path,newpath,function(err){
            
        });
            
                        userQuestion = feilds.ques;
                        options.push(feilds.op1);
                        options.push(feilds.op2);
                        options.push(feilds.op3);
                        totalUsers = feilds.totalVoters;
    });

        


    if(userQuestion.length>3&&totalUsers<1){

        res.render("adminRes",{err:true,pageName: "Admin Page"});
    }
    else {
        res.render("adminRes",{err:false,pageName: "Admin Page"});
    }
        
});

///////////////////// Poll Route /////////////////

app.get('/polls',function(req,res){

    res.render('poll',{pageName:"Polls",question: userQuestion,op1: options[0],op2:options[1],op3:options[2]});
});

app.post('/polls',function(req,res){


  var array = fs.readFileSync(__dirname+'/uploads/'+fileName).toString().split("\n");
   for(i in array) {
       voterArr.push(array[i]);
   }
   if(voterArr.includes(req.body.mail)){
        if(req.body.op === options[0]){
            optionsVote[0]++;
        }else if(req.body.op === options[1]){
            optionsVote[1]++;
        }else{
            optionsVote[2]++;
        }
        voteCounter++;

      var index = voterArr.indexOf(req.body.mail)
       console.log(index);
        voterArr.splice(index,1);
   }

   console.log(voterArr);


   res.render("resp");

});


// set up the server to listen at a port
app.listen('3000',function(){
    console.log("Server running at localhost 3000");
});
