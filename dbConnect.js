const mongooes = require("mongoose");

module.exports = async () => {
  const mongooseUrl =
    "mongodb+srv://nikhilgsingh007:YEe0ldetvnV5GETV@cluster0.jkj5x1g.mongodb.net/?retryWrites=true&w=majority";

  try {
    const connect = await mongooes.connect(mongooseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongoose Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
