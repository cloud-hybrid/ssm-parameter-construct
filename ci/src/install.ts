import Path from "path";
import Process from "process";
import Subprocess from "child_process";

import { Handler, Exit } from "./handler.js";

(async () => await Handler())();

const $ = Subprocess.spawn("npm", [ "install", "." ]);

const Output = $.stdout;
const Error = $.stderr;

Output.on("data", async (data: Buffer | String) => {
    /// Runtime.stdout.clearLine();

    let Allocation = 0;

    // Allocate --> Array Buffer of (n + 1) Bytes
    const Buffer = await data;
    new Array(Buffer[Symbol.iterator]).forEach(
        (_) => Allocation += 1
    );

    // Shift <-- Left to Release Empty Byte for String[0]
    const Output = Buffer.toString();

    (process.argv.splice(2).includes("--verbose"))
        ? Process.stdout.write(Output) : null;
});

Error.on("data", async (data: Buffer | String) => {
    let Allocation = 0;

    const Buffer = await data;
    new Array(Buffer[Symbol.iterator]).forEach(
        (_) => Allocation += 1
    );

    const Output = Buffer.toString();
});

$.on("error", (error: Error) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    console.error("Error", JSON.stringify(
        error, null, 4)
    );
});

$.on("close", (code: number) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    const Signal = String(code);
    const Status = (Signal !== "0")
        ? "(Error)" : "(Success)";

    Process.stdout.write("Exit Code: " + Signal + " " + Status + "\n");

    Exit(code);
});

export default $;
