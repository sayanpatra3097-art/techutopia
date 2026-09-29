import { sendAnnouncementEmail } from './src/utils/emailService.js';
import dotenv from 'dotenv';
import path from 'path';

// Need to load env from parent directory if script run from root
dotenv.config({ path: '../.env' }); 

async function test() {
  console.log('Sending test email...');
  const result = await sendAnnouncementEmail({
    name: 'Shreyas Roy',
    email: 'shreyasroy2023@gmail.com',
    password: 'TEST_PASSWORD_123'
  });
  console.log('Result:', result);
}

test();
