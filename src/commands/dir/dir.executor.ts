import {DirInput} from "./dir.types";
import {CommandExecutor} from "../../core/executor/command.executor";
import {PromptService} from "../../core/prompt/prompt.service";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {ICommandExec} from "../../core/executor/command.types";
import {DirBuilder} from "./dir.builder";
import {ChildProcessWithoutNullStreams, spawn} from "node:child_process";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class DirExecuter extends CommandExecutor<DirInput> {
    private promptService: PromptService = new PromptService()

    constructor(
        logger: IStreamLogger,
    ) {
        super(logger);
    }

    protected async prompt(): Promise<DirInput> {
        let path = await this.promptService.input<string>('Путь', 'input');
        return {path};
    }

    protected build({path}: DirInput): ICommandExec {
        const args = (new DirBuilder())
            .detailedOutput()
            .output();
        return {command: 'ls', args: args.concat(path)};
    }

    protected spawn({command: commmand, args}: ICommandExec): ChildProcessWithoutNullStreams {
        return spawn(commmand, args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, output: IStreamLogger): void {
        const handler = new StreamHandler(output);
        handler.processOutput(stream);
    }
}