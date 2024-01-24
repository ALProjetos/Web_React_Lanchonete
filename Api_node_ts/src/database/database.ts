// src/models/db.ts
import mongoose from 'mongoose';

//const MONGODB_URI = 'mongodb://mongo:27017/node-mongo-ts';
const MONGODB_URI = 'mongodb://localhost:27017/node-web-restaurante';

mongoose.connect(MONGODB_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

export default mongoose.connection;
