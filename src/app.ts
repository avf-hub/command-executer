import {FfmpegExecutor} from "./commands/ffmpeg/ffmpeg.executor";
import {ConsoleLogger} from "./out/console-logger/console-logger";

export class App {
    async run() {
        const executor: FfmpegExecutor = new FfmpegExecutor(ConsoleLogger.gerInstance());
        await executor.execute();
    }
}

const app: App = new App();
app.run();