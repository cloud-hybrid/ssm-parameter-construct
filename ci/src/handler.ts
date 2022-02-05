const Hide = () => process.stdout.write("\x1b[?25l");

const Show = "\x1b[?25h";

const Spinner = [
    "┃ ●    ┃",
    "┃  ●   ┃",
    "┃   ●  ┃",
    "┃    ● ┃",
    "┃     ●┃",
    "┃    ● ┃",
    "┃   ●  ┃",
    "┃  ●   ┃",
    "┃ ●    ┃",
    "┃●     ┃"
];

let $ = 0;
const Handler = async () => setInterval(() => {
    (process.stdin.isTTY) && process.stdout.clearLine(0);
    (process.stdin.isTTY) && process.stdout.cursorTo(0);

    $ = ($ + 1) % Spinner.length;

    (process.stdin.isTTY) && process.stdout.write("Installing" + " " + Spinner[$]);
}, 150);

const Exit = ($?: number) => {
    process.stdout.write(Show);

    process.exit($ ?? 0);
};

Hide();

export { Handler, Exit };

export default Handler;
