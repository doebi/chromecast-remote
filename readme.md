# ORF Chromecast Remote
A simple remote for streaming ORF livestreams to a chromecast. This was created because of the hassle it is to start a stream on the official orf app.

![demo](https://raw.githubusercontent.com/doebi/chromecast-remote/master/img/tvinfo.gif)

## Currently Configured Streams
 * ORF eins
 * ORF2
 * ORF III Kultur und Information
 * ORF Sport+
 * BR
 * 3sat
 * ARD: Das Erste

 More streams can easily be added.

## Usage
To start ORF2 stream on your local chromecast simply run:
```
./remote.js orf2
```
or
```
./info.js orf2
```

## Timetable Information
The companion `info.js` is capable of displaying information about currently playing shows by using infos from http://json.xmltv.se/.

![demo](https://raw.githubusercontent.com/doebi/chromecast-remote/master/img/info.png)
