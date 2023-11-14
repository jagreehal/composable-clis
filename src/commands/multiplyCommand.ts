import { Command } from 'commander';

export const multiplyCommand = new Command('multiply')
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
      multiply 2 3 4
  `,
	);
