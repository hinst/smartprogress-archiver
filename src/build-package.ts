import * as fs from 'fs';
import * as child_process from 'child_process';
import * as rimraf from 'rimraf';

child_process.execSync(`node_modules\\.bin\\web-ext sign --api-key=${}`);
