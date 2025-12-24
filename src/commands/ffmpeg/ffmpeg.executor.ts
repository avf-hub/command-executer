import {CommandExecutor} from "../../core/executor/command.executor";
import {ChildProcessWithoutNullStreams, spawn} from "node:child_process";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/prompt/prompt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg {
        const output: string = this.fileService.getFilePath(path, name, "mp4");
        const args: string[] = (new FfmpegBuilder())
            .input(path)
            .setVideoSize(width, height)
            .output(output)
            .build();
        return {command: "ffmpeg", args, output};
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler: StreamHandler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width: number = await this.promptService.input<number>("Ширина", "number");
        const height: number = await this.promptService.input<number>("Высота", "number");
        const path: string = await this.promptService.input<string>("Путь к файлу", "input");
        const name: string = await this.promptService.input<string>("Имя файла", "input");
        return {width, height, path, name};
    }

    protected spawn({command, args, output}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(command, args);
    }
}