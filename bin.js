#!/usr/bin/env node

/*
    [wx-voice]
    Convert audio files between Tencent apps (Weixin / Wechat, QQ) and Silk codec with other general format such as MP3 and M4A
    
    Github: https://github.com/Ang-YC/wx-voice
    Author: AngYC <me@angyc.com>
*/

// TODO: Support Windows
const path = require('path');
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;

var args = process.argv,
    sdk = path.resolve(process.cwd(), "node_modules", "wx-voice", "silk");

var cmdName = "[wx-voice]  ",
    cmdError = "\x1b[41m\x1b[37mERROR\x1b[0m  ";



if (args.length <= 2) {
    help();
} else {
    switch (args[2]) {
        case "compile":
            exec("make -C " + sdk, exec_cb(args[2]));
            break;
        case "clean":
            exec("make -C " + sdk + " clean", exec_cb(args[2]));
            break;
        default:
            help();
    }
}



function exec_cb(type) {
    var spinner = new Spinner(cmdName + "%s Running command: " + type + "");
    spinner.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏");
    spinner.start();

    return function (e, out, err) {
        setTimeout(function() {
            spinner.stop();
            if (err && err.length > 0 && !err.startsWith("ar")) {
                console.log("\n" + cmdName + cmdError + err);
            } else {
                console.log("\n" + cmdName + type + " success");
            }
        }, 100);
    }
}

function help() {
    console.log("Usage: wx-voice <mode>\n")
    console.log("Mode:")
    console.log("  compile   compile wx-voice library");
    console.log("  clean     remove compiled library\n");
}