import {ConsoleLogger} from "./out/console-logger/console-logger";
import {DirExecuter} from "./commands/dir/dir.executor";

export class App {
    async run() {
        const executor: DirExecuter = new DirExecuter(ConsoleLogger.gerInstance());
        await executor.execute();
    }
}

const app: App = new App();
app.run();