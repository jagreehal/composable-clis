import { Command } from 'commander';

export const divideCommand = new Command('divide')
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
      divide 8 2
  `,
	);
