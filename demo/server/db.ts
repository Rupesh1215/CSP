import mongoose from 'mongoose';

// Fix common MongoDB URI formatting issues
function fixMongoURI(uri: string): string {
  if (!uri) return 'mongodb://localhost:27017/arogya';
  
  // Fix: /?arogya=CSPProject -> /arogya?retryWrites=true&w=majority
  if (uri.includes('/?arogya=')) {
    uri = uri.replace('/?arogya=CSPProject', '/arogya?retryWrites=true&w=majority');
  }
  
  // Ensure proper format if database name is missing
  if (uri.includes('mongodb.net/?') && !uri.includes('/arogya?')) {
    uri = uri.replace('mongodb.net/?', 'mongodb.net/arogya?');
  }
  
  return uri;
}

const MONGODB_URI = fixMongoURI(process.env.MONGODB_URI || '');

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
