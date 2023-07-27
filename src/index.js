const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gofls1128:NYRezgT9rnygR6C9@cluster0.nbbhxlo.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db('Data');
    const collection = db.collection('User');
    await db.collection('User').insertMany([
        {
        name: "세종대왕",
        age: 40,
        Userid: "0002"
      },
      {
        name: "심사임당",
        age: 31,
        Userid: "0003"
      },{
        name: "율곡이이",
        age: 32,
        Userid: "0004"
      },{
        name: "최치원",
        age: 48,
        Userid: "0005"
      },{
        name: "이순신",
        age: 37,
        Userid: "0006"
      },{
        name: "박혁거세",
        age: 43,
        Userid: "0007"
      },{
        name: "광개토대왕",
        age: 57,
        Userid: "0008"
      },{
        name: "이사부",
        age: 52,
        Userid: "0009"
      }
    ]);
    for(let i=0; i<5; i++){
        const cursor = collection.find({}).skip(i*2).limit(2);
        for await(let f of cursor){
            console.log(f);
        } 
        console.log('------------------------');
    }

    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);