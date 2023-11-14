#!/usr/bin/env node

import { Command } from 'commander';
import * as commands from './commands';

const calcCommand = new Command('calc')
	.description('Perform operations on all input numbers')
	.addHelpText(
		'after',
		`
    Example:
      calc add 5 6 7
      calc multiply 2 3 4
      calc subtract 9 4
      calc divide 8 2
    `,
	);

for (const key in commands) {
	calcCommand.addCommand(commands[key]);
}

const program = new Command().addCommand(calcCommand);

// Show help if no arguments
if (process.argv.length <= 2) {
	program.outputHelp();
} else {
	program.parse(process.argv);
}
