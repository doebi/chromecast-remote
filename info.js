#!/usr/bin/env node
const program = require('commander');
const request = require('request');
const moment = require('moment');
const streams = require('./streams.js');
const chalk = require('chalk');

let now = moment();

function renderItem(key, p) {
    start = moment(p.start, "X");
    stop = moment(p.stop, "X");
    console.log();
    console.log(chalk.bold(chalk.bgBlackBright(streams[key].name)),
        chalk.bold(start.format("HH:mm")), "-", chalk.bold(stop.format("HH:mm")));
    console.log(
        p.title ? chalk.bold(chalk.green(p.title["de"])) : "",
        p.subTitle ? chalk.green(p.subTitle["de"]) : "");
    if (program.option.description && "desc" in p) {
        console.log(p.desc["de"]);
    }
}

function displayInfo(date, key, num) {
    let infourl = "http://json.xmltv.se/"+streams[key]["jsontv"]+"_"+date+".js.gz";
    request(infourl, function (error, response, body) {
        try {
            renderInfo(JSON.parse(body), key, num);
        } catch(e) {
        }
    });
}

function renderInfo(json, key, num) {
    let arr = json["jsontv"]["programme"];

    if (moment(arr[0].start, "X").isAfter(now)) {
        return displayInfo(now.subtract(1, 'day').format("YYYY-MM-DD"), key, num);
    }

    for (var i = 0, len = arr.length; i < len; i++) {
        let p = arr[i];
        start = moment(p.start, "X");
        stop = moment(p.stop, "X");
        if (start.isBefore(now) && stop.isAfter(now)) {
            for (var j = 0; j < num; j++) {
                if (arr.length >= (i+j+1)) {
                    renderItem(key, arr[i+j]);
                }
            }
        }
    }
}

program
    .arguments('<code>')
    .option('-d, --description', 'Show Description')
    .action(function (k) {
        key = k;
    });

program.parse(process.argv);

let date = moment().format("YYYY-MM-DD");
if (typeof key === 'undefined') {
    // show now playing for all streams
    for (let key in streams) {
        displayInfo(date, key, 1);
    }
} else {
    now = now.subtract(1, "hour");
    // show detailed info for given key
    if (key in streams) {
        displayInfo(date, key, 5);
    } else {
        console.log(chalk.red("unknown key"), chalk.white(chalk.bgRed(key)));
    }
}
