import {IStreamLogger} from "../handlers/stream-logger.interface";
import {ChildProcessWithoutNullStreams} from "node:child_process";
import {ICommandExec} from "./command.types";

export abstract class CommandExecutor<T> {
    protected constructor(private logger: IStreamLogger) {
    }

    public async execute(): Promise<void> {
        const input: T = await this.prompt();
        const command: ICommandExec = this.build(input);
        const stream: ChildProcessWithoutNullStreams = this.spawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<T>;
    protected abstract build(input: T): ICommandExec;
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}