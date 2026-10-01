import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runSyncScript() {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'importAndBlast.js');
    const process = spawn('node', [scriptPath]);
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, logs: stdout });
      } else {
        reject(new Error(`Sync failed with code ${code}: ${stderr}`));
      }
    });
  });
}
