require('dotenv').config();
import * as mongoose from 'mongoose';
import { GraphQLServerLambda } from 'graphql-yoga';
import { resolvers } from './src/schema/resolvers';
import { config } from './src/config/config';

let dbConnection;

const connectDb = async () => {
  const {user, password, host, port, name} = config.mongodb;
  const connection = await mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${name}`);
  dbConnection = mongoose.connection;

  dbConnection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
  });
}


const lambda = new GraphQLServerLambda({
  typeDefs: './src/schema/schema.graphql',
  resolvers
})

export const server = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if(!dbConnection || !dbConnection.readyState){
    connectDb();
  }
  return lambda.graphqlHandler(event, context, callback);
};

export const playground =  (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if(!dbConnection || !dbConnection.readyState){
    connectDb();
  }
  return lambda.playgroundHandler(event, context, callback);
};
