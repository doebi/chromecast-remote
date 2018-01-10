#!/usr/bin/env node
const program = require('commander');
const request = require('request');
const moment = require('moment');
const streams = require('./streams.js');
const chalk = require('chalk');

function displayInfo(date, key) {
    let infourl = "http://json.xmltv.se/"+streams[key]["jsontv"]+"_"+date+".js.gz";
    request(infourl, function (error, response, body) {
        renderInfo(JSON.parse(body), key);
    });
}

function renderInfo(json, key) {
    let arr = json["jsontv"]["programme"];
    let now = moment();
    if (moment(arr[0].start, "X").isAfter(now)) {
        return displayInfo(now.subtract(1, 'day').format("YYYY-MM-DD"), key);
    }

    for (var i = 0, len = arr.length; i < len; i++) {
        let p = arr[i];
        start = moment(p.start, "X");
        stop = moment(p.stop, "X");
        if (start.isBefore(now) && stop.isAfter(now)) {
            console.log();
            console.log(chalk.bold(streams[key].name));
            console.log(
                p.title ? chalk.bold(chalk.green(p.title["de"])) : "",
                p.subTitle ? chalk.green(p.subTitle["de"]) : "",
                chalk.bold(start.format("HH:mm")), "-", chalk.bold(stop.format("HH:mm")));
            if ("desc" in p) {
                console.log(p.desc["de"]);
            }
        }
    }
}

program
    .arguments('<code>')
    .action(function (k) {
        key = k;
    });

program.parse(process.argv);

let date = moment().format("YYYY-MM-DD");
if (typeof key === 'undefined') {
    // show now playing for all streams
    for (let key in streams) {
        displayInfo(date, key);
    }
} else {
    // show detailed info for given key
    displayInfo(date, key);
}
