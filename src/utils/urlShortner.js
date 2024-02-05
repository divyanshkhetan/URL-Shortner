import crypto from 'crypto';
import mongoose from 'mongoose';
import os from 'os';

// TODO: REPLACE with own model.
import Url from '../models/url'; 


function generateShortUrlCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const uniquePart = os.hostname() + process.pid + Date.now();
    const hash = crypto.createHash('sha256');
    hash.update(uniquePart);
    const hashed = hash.digest('base64');
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(hashed.charCodeAt(i) % characters.length);
    }
    return result;
}

async function isHashUnique(code) {
    const url = await Url.findOne({ code: code });
    return url === null;
}

export { generateShortUrlCode, isHashUnique };