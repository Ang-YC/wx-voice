# wx-voice [![npm](https://img.shields.io/npm/v/wx-voice.svg?colorB=4c1)](https://www.npmjs.com/package/wx-voice)
转换 腾讯App（微信、微信小程序、QQ）或 Silk 编码的音频 至其他音乐格式如 mp3 及 m4a  
[English Readme](README.md)


## 安装
```
$ npm install wx-voice --save
$ npm install wx-voice -g
$ wx-voice compile
```


## 必须先安装的 Library
- **Ffmpeg**: [安装 Ffmpeg](#installing-ffmpeg)
- **Build tools**: [安装 Build tools](#installing-build-tools)


## CLI 使用方法
`wx-voice <command> <options>`
```
例子：
$ wx-voice decode -i input.silk -o output.mp3 -f mp3
$ wx-voice encode -i input.mp3 -o output.silk -f silk
```


## CLI 参数
```
Command:
  decode    解码 silk 或 webm 去其他格式
  encode    编码其他格式至 silk 或 webm
  compile   编制 wx-voice（必须在每次更新及安装时执行）
  clean     清除已编制的 wx-voice

Options:
  -i <input>    输入的音频文件路径
  -o <output>   输出的音频文件路径
  -f <format>   输出的格式
  --bitrate     输出的比特率
  --frequency   输出的频率
  --channels    输出的通道数
```


## API 使用方法
```js
// 初始化
const WxVoice = require('wx-voice');
var voice = new WxVoice();

// 错误处理
voice.on("error", (err) => console.log(err));

// 从 silk 解码至 MP3
voice.decode(
    "input.silk", "output.mp3", { format: "mp3" },
    (file) => console.log(file));

// 输出: "/path/to/output.mp3"
```


## API

### new WxVoice([tempFolder, [ffmpegPath]])
初始化 wxVoice

| 参数 | 说明 |
| ---------- | ----------- |
| tempFolder | 自定义临时文件文件夹，默认为系统temp |
| ffmpegPath | 自定义 FFMPEG 执行档, 默认为 `$PATH` |

### decode(input, output, [options, [callback]])
解码 silk 或 webm 去其他格式

### encode(input, output, [options, [callback]])
编码其他格式至 silk 或 webm

| 参数 | 说明 |
| --------- | ---------------- |
| input     | 输入的音频文件路径  |
| output    | 输出的音频文件路径  |
| options   | 设置参数 (Object), 详见 [设置](#options) |
| callback  | 回调，如果成功将输出 `output`，失败则输出 `undefined` |
```js
voice.encode(
    "input.mp3", "output.silk", { format: "silk" },
    (file) => console.log(file));

// 输出: "/path/to/output.silk"
```

### duration(filePath, [callback])
获取音频的时长
*(目前只接受解码后的音频)*

| 参数 | 说明 |
| --------- | ---------------------- |
| filePath  | 音频文件路径 |
| callback  | 回调，如果成功将输出其时长，单位为秒，失败则输出 `0` |
```js
voice.encode("output.mp3", (dur) => console.log(dur));
// 输出: "10.290"
```


### Options
Javascript Object，用来设置输出的参数

| 参数       | 说明 |
| --------- | ---- |
| format    | 输出的格式 (silk, webm, mp3, m4a...)，默认从 `output` 的扩展名提取 |
| bitrate   | 输出的比特率，以 bps 为单位 |
| frequency | 输出的频率，以 Hz 为单位    |
| channels  | 输出的通道数，默认为单通道   |


## 支持格式
已测试的格式为：`silk`, `silk_amr`, `webm`, `mp3`, `m4a`, `wav`


## Todo
- 用 Javascript Object 为参数
- 转换过程允许超时中断
- Command line 支持转换
- 支持 Windows


---


### Installing build tools

| 作业系统 | 指令 |
| ------- | ---- |
| Ubuntu  | `sudo apt-get install build-essential` |
| CentOS  | `sudo yum groupinstall 'Development Tools'` |
| Mac     | 下载 **XCode** |

### Installing ffmpeg
#### Ubuntu
```
$ sudo add-apt-repository ppa:mc3man/trusty-media  
$ sudo apt-get update  
$ sudo apt-get install ffmpeg
```
#### CentOS
```
$ sudo yum install epel-release
$ sudo yum update
$ sudo rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
```
CentOS 7:
```
$ sudo rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
```
CentOS 6:
```
$ sudo rpm -Uvh http://li.nux.ro/download/nux/dextop/el6/x86_64/nux-dextop-release-0-2.el6.nux.noarch.rpm
```
安装 FFMPEG:
```
$ sudo yum install ffmpeg
```
#### Mac
```
$ brew install ffmpeg
```


## 开源协议
MIT © [Ang YC](https://angyc.com)