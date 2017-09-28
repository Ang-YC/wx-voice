#!/usr/bin/env node

/*
    [wx-voice]
    Convert audio files between Tencent apps (Weixin / Wechat, QQ) and Silk codec with other general format such as MP3 and M4A
    
    Github: https://github.com/Ang-YC/wx-voice
    Author: AngYC <me@angyc.com>
*/

// TODO: Support Windows
// TODO: Use Promise
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const cmdArgs = require('command-line-args');
const Spinner = require('cli-spinner').Spinner;
const WxVoice = require('./index.js');

const args = cmdArgs([
    { name: "command", defaultOption: true, type: String },
    { name: "input",  alias: "i", type: String },
    { name: "output", alias: "o", type: String },
    { name: "format", alias: "f", type: String },
    { name: "bitrate",   type: Number },
    { name: "frequency", type: Number },
    { name: "channels",  type: Number }
]);

var binSdk = path.resolve(__dirname, "silk");
    sdk    = path.resolve(process.cwd(), "node_modules", "wx-voice", "silk");

var cmdName = "[wx-voice]  ",
    cmdError = "\x1b[41m\x1b[37mERROR\x1b[0m  ";



switch (args.command) {
    case "decode":
    case "encode":
        convert(args.command, args);
        break;

    case "compile":
        exec("make -C "  + binSdk, exec_cb(args.command + "-1", function() {
            if (!fs.existsSync(sdk)) return;
            exec("make -C " + sdk, exec_cb(args.command + "-2"));
        }));
        break;

    case "clean":
        exec("make -C "  + binSdk + " clean", exec_cb(args.command + "-1", function() {
            if (!fs.existsSync(sdk)) return;
            exec("make -C " + sdk + " clean", exec_cb(args.command + "-2"));
        }));
        break;

    default:
        help();
}



function convert(type, args) {
    if (args.input && args.output) {
        var options = {};
        ["format", "bitrate", "frequency", "channels"].forEach((key) => {
            if (args[key])
                options[key] = args[key];
        });

        var wxVoice = new WxVoice();
        wxVoice.on("error", (err) => console.log(cmdName + cmdError + err));
        wxVoice[type](args.input, args.output, options, convert_cb(type));
    } else {
        help();
    }
}

function convert_cb(type) {
    var spinner = loading(type);
        spinner.start();

    return function(output) {
        setTimeout(function() {
            spinner.stop();
            console.log();

            if (output == undefined) {
                console.log(cmdName + cmdError + type + " not successful, file not supported");
            } else {
                console.log(cmdName + type + " success");
            }
        }, 100);
    }
}

function exec_cb(type, cb) {
    var spinner = loading(type);
        spinner.start();

    return function(e, out, err) {
        setTimeout(function() {
            spinner.stop();
            console.log();

            if (err && err.length > 0 && !err.startsWith("ar")) {
                console.log(cmdName + cmdError + err);
            } else {
                console.log(cmdName + type + " success");
            }

            if (cb) cb();
        }, 100);
    }
}

function loading(type) {
    var spinner = new Spinner(cmdName + "%s Running command: " + type + "");
        spinner.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏");
    return spinner;
}

function help() {
    console.log("| wxVoice by AngYC | v0.2.0 |");
    console.log("Usage: wx-voice <command> <options>\n");
    console.log("Command:");
    console.log("  decode    decode to general audio format");
    console.log("  encode    encode from general audio format");
    console.log("  compile   compile wx-voice library");
    console.log("  clean     remove compiled library\n");
    console.log("Options:");
    console.log("  -i <input>    input file path");
    console.log("  -o <output>   output file path");
    console.log("  -f <format>   format of the output file");
    console.log("  --bitrate     bitrate of the output file");
    console.log("  --frequency   frequency of the output file");
    console.log("  --channels    channels of the output file\n");
    console.log("Tested format:");
    console.log("  decode   mp3, m4a, wav");
    console.log("  encode   silk, silk_amr, webm");
}