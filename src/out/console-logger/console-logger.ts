import {IStreamLogger} from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static INSTANCE: ConsoleLogger;

    private constructor() {
    }

    public static gerInstance() {
        if (!ConsoleLogger.INSTANCE) {
            return new ConsoleLogger();
        }
        return this.INSTANCE;
    }

    end(): void {
        console.log("Выполнено!");
    }

    error(...args: any[]): void {
        console.log(args);
    }

    log(...args: any[]): void {
        console.log(args);
    }
}