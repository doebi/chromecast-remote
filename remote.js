#!/usr/bin/env node
const program = require('commander');
const streams = require('./streams.js');
const chalk = require('chalk');

let state = null;

let log = function(state) {
    let prefix = "";
    if (state == "PLAYING") {
        prefix = "▶ ";
    }
    console.log("\u001B[1F\u001B[G\u001B[2K" + prefix + state);
}

program
    .arguments('<code>')
    .action(function (k) {
        key = k;
    });

program.parse(process.argv);

if (typeof key === 'undefined') {
    console.log(chalk.green("Usage:", __filename, chalk.yellow("<code>")));
    for (let key in streams) {
        console.log(chalk.bold(key), "-", streams[key]["name"]);
    }
    process.exit(-1);
}

let checkState = function(player) {
    setTimeout(function() {
        player.status(function(a, b){
            if (typeof b != 'undefined') {
                state = b.playerState;
                log(state);
                if (state == "PLAYING") {
                    process.exit(1)
                } else {
                    checkState(player);
                }
            } else {
                connect(player);
            }
        });
    }, 1000);
}

let connect = function(player) {
    try {
        player.play(streams[key]["url"], {title: streams[key]["name"]})
        checkState(player);
    } catch(err) {
        console.log("invalid code");
        process.exit(-1);
    }
}

let chromecasts = require('chromecasts')()
chromecasts.on('update', function (player) {
    if (state == null) {
        connect(player);
    }
})
