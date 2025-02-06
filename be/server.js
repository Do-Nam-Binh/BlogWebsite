import app from "./app.js";
import connectMongoDB from "./db/connectMongoDB.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Database connected successfully!");
  console.log(`Server started at http://localhost:${PORT}`);
  connectMongoDB(); // Ensure MongoDB connection is established
});
