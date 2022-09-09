import { config }  from '../wdio.shared.kobiton.conf';
import { readFileSync } from 'fs';
import { join, basename, dirname, extname, relative, isAbsolute } from 'path';

// ============
// Specs
// ============
config.specs = [
    './tests/specs/**/uel*.spec.ts',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities

const file = readFileSync(join(__dirname, '..', '..', 'utils', 'deviceList.json'));
const parseFile = JSON.parse(file);
config.capabilities = parseFile;

config.maxInstances = 10;

exports.config = config;
