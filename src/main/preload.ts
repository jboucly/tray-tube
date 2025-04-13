import { ipcRenderer } from 'electron';

function logToMain(...args: any[]) {
    ipcRenderer.send('log-from-renderer', args.map(String).join(' '));
}

console.log = (...args) => {
    logToMain(...args);
};

console.error = (...args) => {
    logToMain(...args);
};

console.warn = (...args) => {
    logToMain(...args);
};
