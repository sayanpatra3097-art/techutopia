import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
}

// Cache the connection across serverless function invocations
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var _mongooseCache: MongooseCache;
}

if (!global._mongooseCache) {
    global._mongooseCache = { conn: null, promise: null };
}

const cache = global._mongooseCache;

export async function connectDB(): Promise<typeof mongoose> {
    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        cache.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cache.conn = await cache.promise;
    return cache.conn;
}
