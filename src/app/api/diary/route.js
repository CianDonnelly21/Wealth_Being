import { MongoClient } from 'mongodb';

export async function POST(req) {
  // 1. Get data and timestamp from request body
  const { data, timestamp } = await req.json();

  // Validate required fields
  if (!data || !timestamp) {
    console.log("Missing data or timestamp");
    return Response.json({ valid: false, error: "Missing required fields" });
  }

  // 2. Connect to MongoDB
  const client = new MongoClient("mongodb+srv://root:myPassword123@cluster0.jf7grv6.mongodb.net/?appName=Cluster0");

  try {
    await client.connect();
    console.log("Connected to DB");

    // 3. Access database
    const db = client.db("WealthBeing");
    const diary = db.collection("diary_entry");

    console.log("Diary entry to insert: { Data: ", data, ", Timestamp: ", timestamp, " }");

    // Insert the diary entry
    const result = await diary.insertOne({
      data: data,
      timestamp: timestamp
    });

    console.log("Insert result:", result);

    // 4. Return success result
    return Response.json({ valid: true, insertedId: result.insertedId });

  } catch (error) {
    console.log("MongoDB error:", error.message);
    return Response.json({ valid: false, error: error.message });
  } finally {
    await client.close();
  }
}

export async function GET(req) {
  console.log("=== GET ROUTE CALLED ===");
  
  // Connect to MongoDB
  const client = new MongoClient("mongodb+srv://root:myPassword123@cluster0.jf7grv6.mongodb.net/?appName=Cluster0");

  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("Connected to DB successfully!");

    // Access database
    const db = client.db("WealthBeing");
    const diary = db.collection("diary_entry");

    // Get all entries, sorted by timestamp (newest first)
    const entries = await diary.find({}).sort({ timestamp: -1 }).toArray();

    return Response.json({ valid: true, entries });

  } catch (error) {
    console.log("MongoDB error:", error.message);
    return Response.json({ valid: false, entries: [] });
  } finally {
    await client.close();
  }
}
