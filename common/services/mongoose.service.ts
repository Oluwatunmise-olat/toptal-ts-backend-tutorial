import mongoose from "mongoose";

class MongooseService {
  private connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false
  };

  private connectionString = "mongodb://localhost:27017/toptal-api-db";

  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(this.connectionString, this.connectionOptions)
      .then((_) => {
        console.log("Db Connected 🫂");
      })
      .catch((err) => {
        console.log("Db Connection Failed");
      });
  }

  getMongoose() {
    return mongoose;
  }
}
