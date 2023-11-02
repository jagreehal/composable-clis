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

## Composing add and subtract commands into a calc command

```typescript
const calcCommand = new Command('calc')
	.description('Perform add and subtract operations')
	.addCommand(addCommand)
	.addCommand(subtractCommand)
	.addHelpText(
		'after',
		`
    Example:
      calc add 1 2 3
      calc subtract 9 4
    `,
	);

const program = new Command();
program.addCommand(addCommand);
program.addCommand(subtractCommand);
program.addCommand(calcCommand);
```

To use the calc command, simply type:

```bash
calc add 1 2 3
calc subtract 9 4
```
