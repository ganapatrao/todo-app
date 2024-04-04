const express = require("express")
const app = express();
const todoRouter =require("./src/features/todos/todos.routes")
const accountRouter =require("./src/features/accounts/singin.routes")
// const ratelimitter = require("./src/utilities/ratelimitter")

// const ipfilter = require('express-ipfilter').IpFilter

//parses the JSON data from the request body and makes it available in req.body
app.use(express.json())

// app.use(ratelimitter)

//// Allow the following IPs
// const ips = ['223.233.85.167']

// Create the server
// app.use(ipfilter(ips, { mode: 'allow' })) //remove  { mode: 'allow' } to block
 app.use("/signin", accountRouter);

app.use("/todos", todoRouter);
//app.use("/signIn", accountRouter);

app.listen(4000,()=>{console.log("server is running")})