import { describe, expect, test } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';

function runCommand(command: string): string {
	const cliPath = join(process.cwd(), 'bin/open-closed-example.js');
	try {
		return execSync(`node ${cliPath} ${command}`).toString().trim();
	} catch (error) {
		const output = error.stdout ? error.stdout.toString() : '';
		const errOutput = error.stderr ? error.stderr.toString() : '';
		return output + errOutput;
	}
}

describe('open-closed-example tests', () => {
	describe('add', () => {
		test('add command should correctly sum numbers', () => {
			const result = runCommand('add 1 2 3');
			expect(result).toBe('The result of addition is: 6');
		});

		test('add command without numbers should show help', () => {
			const result = runCommand('add');
			console.log('result', result);
			expect(result).toContain('Usage:');
		});
	});

	describe('subtract', () => {
		test('subtract command should correctly subtract two numbers', () => {
			const result = runCommand('subtract 10 4');
			expect(result).toBe('The result of subtraction is: 6');
		});

		test('subtract command without numbers should show help', () => {
			const result = runCommand('subtract');
			expect(result).toContain('Usage:');
		});
	});

	describe('multiply', () => {
		test('multiply command should correctly multiply numbers', () => {
			const result = runCommand('multiply 2 3 4');
			expect(result).toBe('The result of multiplication is: 24');
		});

		test('multiply command without numbers should show help', () => {
			const result = runCommand('multiply');
			expect(result).toContain('Usage:');
		});
	});

	describe('divide', () => {
		test('divide command should correctly divide two numbers', () => {
			const result = runCommand('divide 20 5');
			expect(result).toBe('The result of division is: 4');
		});

		test('divide command should handle division by zero', () => {
			const result = runCommand('divide 10 0');
			expect(result).toBe('Error: Division by zero.');
		});

		test('divide command without numbers should show help', () => {
			const result = runCommand('divide');
			expect(result).toContain('Usage:');
		});
	});
});
