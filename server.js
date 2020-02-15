var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema/schema');
var mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb+srv://admin:admin@cluster0-uxkfo.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open',() => {
  console.log("connected to mongo db");
}).catch(function(err){
  console.log(err)
})



app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});