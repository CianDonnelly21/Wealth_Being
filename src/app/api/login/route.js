import { MongoClient } from 'mongodb';

export async function GET(req) {
  // 1. Get email and password from URL
  const url = new URL(req.url, `http://${req.headers.get('host')}`);
  const email = url.searchParams.get('email');
  const password = url.searchParams.get('password');

  // 2. Connect to MongoDB
  const client = new MongoClient("mongodb+srv://B00160418:mongo1234@cluster0.jf7grv6.mongodb.net/WealthBeing");

  try {
    await client.connect();
    console.log("Connected to DB");

    // 3. Check database
    const db = client.db("WealthBeing");
    const users = db.collection("Login");

    console.log("Profile logged in DB: { Email: ", email, ", Password", password, " }");

    // Find the specific user
    const user = await users.findOne({
      email: email,
      password: password
    });

    // 4. Return result
    return Response.json({ valid: !!user });

  } catch (error) {
    console.log("MongoDB error:", error.message);
    return Response.json({ valid: false });
  } finally {
    await client.close();
  }
}