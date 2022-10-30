
// import fetch from 'node-fetch';
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const fetch = require("node-fetch");


// import fetch from 'node-fetch';
// const fetch = require("node-fetch");
const app = express();
app.use(cors());
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();



app.get("/api/search",(req,res) => {
    // console.log(req);
    // const params  = req.body;
    
    // res.send(myCache.json());
    // return false;

    
    let searchVar =req.query.query;
    valueCache = myCache.get( searchVar );
    if ( valueCache != undefined ){
        // handle miss!
        console.log("CACHE "+searchVar);
        res.send(valueCache);
        // res.send("YOLA");
        return valueCache;
    }
    // console.log("HOAL");
    // const completed = params.completed;
    // res.send();
    // console.log(params);
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q='+searchVar;
    const ajax =     fetch(url)
        .then(response => response.json() ) 
        .then((response) => {
        // Do something with response
        // let obj = {  response };
        let obj =  response ;
        myCache.set( searchVar, obj, 10000 );

        res.send(response);
    
        // console.log(response)
        })
        .catch(function (err) {
            res.send(err);
        // console.log("Unable to fetch -", err);
        //   res.send(err);
        });
        // res.send(ajax);
        return ajax;
   
})

app.listen(4000, () => console.log("HOLA SOY EL SERVER"));