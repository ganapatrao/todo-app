export postman collection "Todo App.postman_collection"
1.first use api request >>signin
and use any of the credentials (its hardcoded for now)
>>{
   "email":"test@gmail.com",
   "password":"111" 
}

// {
//    "email":"test2@gmail.com",
//    "password":"222" 
// }

2. grab the response which is jwt token and add in the Authorization of the postman
//go to Environments create a variable as token and in the current value add the token
//for all "to do operation select the  the token variable  refer image   environments-example.png