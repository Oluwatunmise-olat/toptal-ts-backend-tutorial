import mongoose from "mongoose";

class MongooseService {
  private connectionString = "mongodb://localhost:27017/toptal-api-db";

  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(this.connectionString)
      .then((_) => {
        console.log("Db Connected 🫂");
      })
      .catch((err) => {
        console.log(err.name);
        console.log("Db Connection Failed");
      });
  }

  getMongoose() {
    return mongoose;
  }
}

export default new MongooseService();
