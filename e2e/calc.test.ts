import { describe, expect, test } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';

function runCommand(command: string): string {
	const cliPath = join(process.cwd(), 'bin/calc-example.js');
	try {
		return execSync(`node ${cliPath} ${command}`).toString().trim();
	} catch (error) {
		const output = error.stdout ? error.stdout.toString() : '';
		const errOutput = error.stderr ? error.stderr.toString() : '';
		return output + errOutput;
	}
}

describe('calc tests', () => {
	test('calc command should work with add subcommand', () => {
		const result = runCommand('calc add 4 5 6');
		expect(result).toBe('The result of addition is: 15');
	});

	test('calc command should work with subtract subcommand', () => {
		const result = runCommand('calc subtract 20 5');
		expect(result).toBe('The result of subtraction is: 15');
	});

	test('calc command should work with multiply subcommand', () => {
		const result = runCommand('calc multiply 3 3 3');
		expect(result).toBe('The result of multiplication is: 27');
	});

	test('calc command should work with divide subcommand', () => {
		const result = runCommand('calc divide 15 3');
		expect(result).toBe('The result of division is: 5');
	});

	test('calc command by itself should show help', () => {
		const result = runCommand('calc');
		expect(result).toContain('Usage:');
	});
});
