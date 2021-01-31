import * as fs from 'fs';
import * as child_process from 'child_process';
import * as rimraf from 'rimraf';

const apiKey = fs.readFileSync('./moz-key.txt');
const apiSecret = fs.readFileSync('./moz-key-secret.txt');
const command = 'node_modules\\.bin\\web-ext sign ' +
    '--source-dir=dist-ext ' +
    `--api-key=${apiKey} --api-secret=${apiSecret}`;
child_process.execSync(command, {stdio: 'inherit'});
