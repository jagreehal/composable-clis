#!/usr/bin/env node

import { Command } from 'commander';

const addCommand = new Command('add')
	.arguments('[numbers...]')
	.action(async (numbers: string[]) => {
		if (!numbers || numbers.length === 0) {
			console.error('No numbers provided.');
			addCommand.help();
			return;
		}

		// Simulate async operation
		await new Promise((r) => setTimeout(r, 2000));

		const result = numbers.map(Number).reduce((accumulator, number) => {
			return accumulator + number;
		}, 0);
		console.log(`The result of addition is: ${result}`);
	})
	.addHelpText(
		`after`,
		`
    Examples:
      calculator add 5 6 7
  `,
	);

const divideCommand = new Command('divide')
	.arguments('[a] [b]')
	.action((a: string, b: string) => {
		if (a === undefined || b === undefined) {
			console.error('Missing required arguments for division.');
			divideCommand.help();
			return;
		}

		if (Number(b) === 0) {
			console.log('Error: Division by zero.');
			return;
		}

		const result = Number(a) / Number(b);
		console.log(`The result of division is: ${result}`);
	})
	.addHelpText(
		'after',
		`
    'Example:'
      calculator divide 8 2
  `,
	);

const multiplyCommand = new Command('multiply')
	.arguments('[numbers...]')
	.action((numbers: string[]) => {
		if (!numbers || numbers.length === 0) {
			console.error('No numbers provided.');
			multiplyCommand.help();
			return;
		}

		const result = numbers.map(Number).reduce((accumulator, number) => {
			return accumulator * number;
		}, 1);
		console.log(`The result of multiplication is: ${result}`);
	})
	.addHelpText(
		`after`,
		`
    Example:
      calculator multiply 2 3 4
  `,
	);

const subtractCommand = new Command('subtract')
	.arguments('[a] [b]')
	.action((a: string, b: string) => {
		if (a === undefined || b === undefined) {
			console.error('Missing required arguments for subtraction.');
			subtractCommand.help();
			return;
		}

		const result = Number(a) - Number(b);
		console.log(`The result of subtraction is: ${result}`);
	})
	.addHelpText(
		'after',
		`
    'Example:'
      calculator subtract 9 4
  `,
	);

const calcCommand = new Command('calc')
	.description('Perform operations on all input numbers')
	.addCommand(addCommand)
	.addCommand(multiplyCommand)
	.addCommand(subtractCommand)
	.addCommand(divideCommand)
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

const program = new Command();

program.addCommand(addCommand);
program.addCommand(multiplyCommand);
program.addCommand(subtractCommand);
program.addCommand(divideCommand);
program.addCommand(calcCommand);

// Show help if no arguments
if (process.argv.length <= 2) {
	program.outputHelp();
} else {
	program.parse(process.argv);
}
