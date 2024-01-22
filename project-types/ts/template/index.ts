//* Imports

async function main () {
    await Promise.all([
        //* Main
    ]);

    //* Post Main
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);