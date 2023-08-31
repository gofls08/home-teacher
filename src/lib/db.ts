import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://gofls1128:gofls1128!@cluster0.vtufgzu.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const db = client.db('Data');
export default db;

