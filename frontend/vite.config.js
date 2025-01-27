import { defineConfig } from 'vite';

import os from 'os';
import fs from 'fs';
import path from 'path';

function getNetworkAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
}

const networkAddress = getNetworkAddress();
const envPath = path.resolve(__dirname, '../.env');
const envVariable = `NETWORK_ADDRESS=${networkAddress}`;

try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, { encoding: 'utf8' });
        const envLines = envContent.split('\n');
        let variableUpdated = false;
        const updatedLines = envLines.map(line => {
            if (line.startsWith('NETWORK_ADDRESS=')) {
                variableUpdated = true;
                return envVariable;
            }
            return line;
        });
        if (!variableUpdated) {
            updatedLines.push(envVariable);
        }
        envContent = updatedLines.join('\n');
    } else {
        envContent = envVariable;
    }
    fs.writeFileSync(envPath, envContent, { encoding: 'utf8' });
} catch (error) {
    console.error(`${error.message}`);
}

export default defineConfig({
    server: {
        host: true,
    },
    define: {
        __NETWORK_ADDRESS__: JSON.stringify(networkAddress),
    },
});