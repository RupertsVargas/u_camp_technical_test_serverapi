
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

// var hola = "HOLA";


// var getApiMercadoLibre = () =>{
//     const url = 'https://randomuser.me/api/?results=10';

// fetch(url)
// .then((resp) => resp.json())
// .then(function(data) {
//   let authors = data.results;
//   return authors.map(function(author) {
//     let li = createNode('li');
//     let img = createNode('img');
//     let span = createNode('span');
//     img.src = author.picture.medium;
//     span.innerHTML = `${author.name.first} ${author.name.last}`;
//     append(li, img);
//     append(li, span);
//     append(ul, li);
//   })
// })
// .catch(function(error) {
//   console.log(error);
// });
// }



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