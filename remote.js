#!/usr/bin/env node
let program = require('commander');
let key;

let streams = {
    "orf1": { name: "ORF eins", url: "http://apasfiisl.apa.at/ipad/orf1_q8c/orf.sdp/playlist.m3u8" },
    "orf2": { name: "ORF2", url: "http://apasfiisl.apa.at/ipad/orf2_q8c/orf.sdp/playlist.m3u8" },
    "orf3": { name: "ORF III Kultur und Information", url: "http://apasfiisl.apa.at/ipad/orf3_q8c/orf.sdp/playlist.m3u8" },
    "orfs": { name: "ORF Sport+", url: "http://apasfiisl.apa.at/ipad/orfs_q8c/orf.sdp/playlist.m3u8" },
    "br": { name: "BR: Bayerischer Rundfunk", url: "http://brlive-lh.akamaihd.net/i/bfssued_worldwide@119891/master.m3u8" },
    "3sat": { name: "3sat", url: "http://zdf0910-lh.akamaihd.net/i/dach10_v1@392872/master.m3u8" },
    "ard": { name: "Das Erste", url: "http://live-lh.daserste.de/i/daserste_de@91204/master.m3u8" },
    "n24": { name: "N24", url: "https://live2weltcms-lh.akamaihd.net/i/Live2WeltCMS_1@444563/index_1_av-b.m3u8" },
    "wdr": { name: "WDR: Westdeutscher Rundfunk", url: "http://tvstreamgeo.wdr.de/i/wdrfs_geogeblockt@112044/index_3776_av-b.m3u8" },
}

program
  .arguments('<stream>')
  .action(function (k) {
      key = k;
  });

program.parse(process.argv);

if (typeof key === 'undefined') {
    console.log("Usage: tv <code>");
    console.log("-- Codes --------");
    for (let key in streams) {
        console.log(key, "-", streams[key]["name"]);
    }
    process.exit(-1);
}

let chromecasts = require('chromecasts')()
chromecasts.on('update', function (player) {
    player.client(function(){
        console.log(arguments);
    });
    //player.status(function(a, b){
    //    console.log(b);
    //});
    //player.play(streams[param]["url"], {title: streams[param]["name"]})
})
