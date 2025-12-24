export class FfmpegBuilder {
    private inputPath: string;
    private outputPath: string;
    private options: Map<string, string> = new Map();

    constructor() {
        this.options.set("-c:v", "libx264");
    }

    input(inputPath: string): this {
        this.inputPath = inputPath;
        return this;
    }

    setVideoSize(width: number, height: number): this {
        this.options.set("-s", `${width}x${height}`);
        return this;
    }

    output(outputPath: string): this {
        this.outputPath = outputPath;
        return this;
    }

    build(): string[] {
        if (!this.inputPath) {
            throw new Error("Не задан параметр input");
        }
        const args: string[] = ["-i", this.inputPath];
        this.options.forEach((key: string, value: string) => {
            args.push(key);
            args.push(value);
        });
        args.push(this.outputPath);
        return args;
    }
}