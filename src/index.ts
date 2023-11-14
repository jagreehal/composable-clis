#!/usr/bin/env node

import { Command } from 'commander';
import { addCommand } from './commands/addCommand';
import { multiplyCommand } from './commands/multiplyCommand';
import { subtractCommand } from './commands/subtractCommand';
import { divideCommand } from './commands/divideCommand';

const program = new Command();
program.addCommand(addCommand);
program.addCommand(multiplyCommand);
program.addCommand(subtractCommand);
program.addCommand(divideCommand);

// Show help if no arguments
if (process.argv.length <= 2) {
	program.outputHelp();
} else {
	program.parse(process.argv);
}
