import { vi } from 'vitest';

// Mock Electron modules
vi.mock('electron', () => ({
    app: {
        getPath: vi.fn(() => '/tmp/test-userData')
    },
    ipcMain: {
        handle: vi.fn()
    }
}));

// Mock electron-log
vi.mock('electron-log/main', () => ({
    default: {
        info: console.info,
        error: (e: string) => console.warn(`[ERROR LOG] ${e}`),
        warn: (e: string) => console.warn(`[WARN LOG] ${e}`)
    }
}));
