import { MongoClient } from 'mongodb';

export async function GET(req) {
  console.log("=== REGISTER API CALLED ===");

  // Fix URL parsing
  const url = new URL(req.url, `http://${req.headers.get('host')}`);

  // Get parameters - exactly like your frontend sends
  const fullName = url.searchParams.get('fullName');
  const email = url.searchParams.get('email');
  const password = url.searchParams.get('password');

  console.log("Data received:", { fullName, email, password });

  if (!email || !password) {
    console.log("Missing email or password");
    return Response.json({ Valid: false });
  }

    const client = new MongoClient(
      "mongodb+srv://B00160418:mongo1234@cluster0.jf7grv6.mongodb.net/WealthBeing"
    );

    await client.connect();
    console.log("Connected to DB");

    const db = client.db("WealthBeing");
    const users = db.collection("Login");

    // Check if exists
    const existing = await users.findOne({ email: email });

    if (existing) {
      console.log("Email already exists");
      await client.close();
      return Response.json({ Valid: false });
    }

    // Insert - exactly like your original
    console.log("Inserting new user...");
    const result = await users.insertOne({
      fullName: fullName,
      email: email,
      password: password
    });

    console.log("Insert result:", result);

    await client.close();

    return Response.json({ Valid: true });

  }