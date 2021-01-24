import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as child_process from 'child_process';

child_process.execFileSync('cmd', ['/c', 'npm', 'run', 'build-content']);

rimraf.sync("./dist-ext");
fs.mkdirSync('./dist-ext');

function copySrc(fileName: string) {
    fs.copyFileSync('./src/' + fileName, './dist-ext/' + fileName);
}
copySrc('manifest.json');
copySrc('smartprogress-archiver.png');

function copyDist(fileName: string) {
    fs.copyFileSync('./dist/' + fileName, './dist-ext/' + fileName);
}
copyDist('content-compiled.js');

