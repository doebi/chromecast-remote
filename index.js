#!/usr/bin/env node
let chromecasts = require('chromecasts')()
let quality = ["q8c", "q6a", "q4a", "q1a"];

let streams = {
    orf1: { name: "ORF1", url: "http://apasfiisl.apa.at/ipad/orf1_q8c/orf.sdp/playlist.m3u8" },
    orf2: { name: "ORF2", url: "http://apasfiisl.apa.at/ipad/orf2_q6a/orf.sdp/playlist.m3u8" },
    orf3: { name: "ORF3", url: "http://apasfiisl.apa.at/ipad/orf3_q8c/orf.sdp/playlist.m3u8" },
    orfs: { name: "ORF Sport+", url: "http://apasfiisl.apa.at/ipad/orfs_q8c/orf.sdp/playlist.m3u8" },
}

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " [code]");
    console.log("-- Codes --------");
    for (let key in streams) {
        console.log(key, "-", streams[key]["name"]);
    }
    process.exit(-1);
}
let param = process.argv[2];

chromecasts.on('update', function (player) {
    player.play(streams[param]["url"], {title: streams[param]["name"]})
})
