import { Command } from 'commander';

export const subtractCommand = new Command('subtract')
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
      subtract 9 4
  `,
	);
