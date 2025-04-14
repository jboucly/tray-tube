import chalk from 'chalk';
import log from 'electron-log/main';

export class Logger {
    private static isDev = process.env.NODE_ENV === 'development';

    public static info(message: string, ...args: any[]): void {
        console.info(chalk.blue('[INFO] ') + message, args && args.length ? args : '');

        if (!this.isDev) {
            log.info('[INFO]' + message, args && args.length ? args : '');
        }
    }

    public static error(message: string, ...args: any[]): void {
        console.error(chalk.red('[ERROR] '), message, args && args.length ? args : '');

        if (!this.isDev) {
            log.error('[ERROR]' + message, args && args.length ? args : '');
        }
    }

    public static warn(message: string, ...args: any[]): void {
        console.warn(chalk.yellow('[WARN] '), message, args && args.length ? args : '');

        if (!this.isDev) {
            log.warn('[WARN]' + message, args && args.length ? args : '');
        }
    }

    public static debug(message: string, ...args: any[]): void {
        console.debug(chalk.magenta('[DEBUG] '), message, args && args.length ? args : '');

        if (!this.isDev) {
            log.debug('[DEBUG]' + message, args && args.length ? args : '');
        }
    }
}
