import {PromptService} from "./core/prompt/prompt.service";

export class App {
    async run() {
        const result: number = await (new PromptService()).input<number>("Введите число:", "number");
        console.log(result);
    }
}

const app: App = new App();
app.run();