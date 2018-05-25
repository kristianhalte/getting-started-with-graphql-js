var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    ip: String
  }
`);

function loggingMiddleware(req, res, next) {
  // console.log('app:', req.app);
  // console.log('baseUrl:', req.baseUrl);
  // console.log('body:', req.body);
  // console.log('cookies:', req.cookies);
  // console.log('fresh:', req.fresh);
  // console.log('hostname:', req.hostname);
  console.log('ip:', req.ip);
  // console.log('ips:', req.ips);
  // console.log('method:', req.method);
  // console.log('originalUrl:', req.originalUrl);
  // console.log('params:', req.params);
  // console.log('headers:', req.headers);
  next();
}

var root = {
  ip: function (args, request) {
    return request.ip;
  }
};

var app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');