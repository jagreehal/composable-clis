#!/usr/bin/env node

import { Command } from 'commander';
import * as commands from './commands';

const program = new Command();
for (const key in commands) {
	program.addCommand(commands[key]);
}

// Show help if no arguments
if (process.argv.length <= 2) {
	program.outputHelp();
} else {
	program.parse(process.argv);
}
