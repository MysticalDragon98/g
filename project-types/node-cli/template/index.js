const Minimist = require('minimist');
const args = Minimist(process.argv.slice(2), {
    boolean: ["json"]
});

async function main () {

}

function tty (result) {

}

function json (result) {
    process.stdout.write(JSON.stringify(result));
}

function stdout (result) {

}

main().then((result) => {
    if (args.json) {
        json(result)
    } else if (process.stdout.isTTY) {
        tty(result)
    } else {
        stdout(result)
    }
})