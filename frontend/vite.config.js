import { defineConfig } from 'vite';

import os from 'os';

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

export default defineConfig({
    server: {
        host: true
    },
    define: {
        __NETWORK_ADDRESS__: JSON.stringify(networkAddress),
    }
});
