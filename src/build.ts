import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as child_process from 'child_process';

child_process.execSync('node_modules\\.bin\\webpack --config webpack.config.js', {stdio: 'inherit'});

rimraf.sync('./dist-ext');
fs.mkdirSync('./dist-ext');

function copySrc(fileName: string) {
    fs.copyFileSync('./src/' + fileName, './dist-ext/' + fileName);
}
copySrc('manifest.json');
copySrc('smartprogress-archiver.png');
copySrc('export-now.png');

function copyDist(fileName: string) {
    fs.copyFileSync('./dist/' + fileName, './dist-ext/' + fileName);
}
copyDist('content-compiled.js');
copyDist('content-compiled.js.map');
copyDist('background-compiled.js');
copyDist('background-compiled.js.map');

