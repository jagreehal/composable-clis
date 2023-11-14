# Composable Command Line Interfaces

This repository demonstrates the power and flexibility of [commander.js](https://github.com/tj/commander.js) in creating composable command-line interfaces (CLIs).

## The Concept of Composable Commands

Just like how Express allows you to compose your application using modular routes, `commander.js` enables you to build a CLI tool by composing modular commands.

This modular approach to CLI design not only enhances the maintainability of your cli but also makes it scalable and easy to understand and extend.

## Key Advantages

- **Modularity**

  Having each command with a single responsibility allows for independent development, testing, and maintenance.

- **Scalability**

  Seamlessly compose CLIs using commands without impacting existing functionalities. This adaptability is crucial for evolving projects and requirements.

- **Reusability**

  Promotes the use of shared utilities and libraries across different commands, minimizing code duplication and potential errors.

## Command: add

Let's start with a simple add command:

```typescript
const addCommand = new Command('add')
	.arguments('<numbers...>')
	.action(async (numbers: string[]) => {
		await new Promise((r) => setTimeout(r, 2000));
		const result = numbers.map(Number).reduce((accumulator, number) => {
			return accumulator + number;
		}, 0);
		console.log(`The result of addition is: ${result}`);
	})
	.addHelpText(
		`after`,
		`    
    'Examples:'
      add 1 2 3
  `,
	);

const program = new Command();

program.addCommand(addCommand);
```

To use the add command, simply type:

```bash
add 1 2 3
```

which outputs `6`

## Command: adding subtract

Adding a subtract command is easy as

```typescript
...
const subtractCommand = new Command('subtract')
  .arguments('<a> <b>')
  .action((a: string, b: string) => {
    const result = Number(a) - Number(b);
    console.log(`The result of subtraction is: ${result}`);
  })
  .addHelpText(
    `after`,
    `
    'Example:'
      subtract 9 4
  `
  );

const program = new Command();

program.addCommand(addCommand);
program.addCommand(subtractCommand);
```

To use the subtract command, simply type:

```bash
subtract 9 4
```

which outputs `5`

## Composing commands manually

To compose commands manually, we simply add them to the program:

```typescript
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
```

## Composing using open closed principle

The Open/Closed Principle, a fundamental concept in software engineering, states that software entities (like classes, modules, functions, etc.) should be open for extension but closed for modification.

Authors can extend the behaviour of a module without altering its source code, which is particularly beneficial in maintaining and scaling complex systems like CLIs.

By adopting this principle, we can compose our commands in a way that allows easy addition of new functionality without changing existing code.s

This is efficient and reduces the risk of introducing bugs into the existing system.

Instead of adding commands one by one, we utilize the Open/Closed principle to compose commands dynamically:

```typescript
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
```

## Composing commands into a calc command

The `calc` command is a prime example of the power of composability in CLI tools.

By composing the functionality of `add`, `subtract`, `divide` and `multiply` commands, `calc` is a versatile and user-friendly interface for various arithmetic operations.

This streamlines the user experience by providing a single entry point for multiple operations and demonstrates the ease of extending functionality in a modular CLI design.

```typescript
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
```

To use the calc command, simply type:

```bash
calc add 1 2 3
calc subtract 9 4
```
