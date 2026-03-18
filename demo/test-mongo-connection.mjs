// Quick MongoDB connection test
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('URI format check:');
console.log('- Length:', uri?.length || 0);
console.log('- Starts with mongodb+srv:', uri?.startsWith('mongodb+srv://'));
console.log('- Contains /arogya?:', uri?.includes('/arogya?'));
console.log('- Full URI:', uri);
console.log('');

async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Successfully connected to MongoDB!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
