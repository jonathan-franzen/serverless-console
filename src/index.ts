import { exec, ExecException } from 'child_process';

let allowList: string[] = [];

/**
 * Set the allowed commands for execution.
 * @param list - List of allowed commands.
 */
export const consoleAllowList: (list: string[]) => void = (list: string[]): void => {
	allowList = list;
};

/**
 * Execute a shell command if it's in the allowed list.
 * @param command - Command to execute.
 * @returns A promise that resolves when the command is executed.
 */
export const serverlessConsole: (command: string) => Promise<void> = async (command: string): Promise<void> => {
	if (allowList.length > 0 && !allowList.includes(command)) {
		console.error('Command not allowed.');
		console.error('Allowed commands are:');
		allowList.forEach((cmd: string): void => {
			console.log(cmd);
		});
		return;
	}

	try {
		const data: string = await new Promise<string>((resolve: (value: string | PromiseLike<string>) => void, reject: (reason?: any) => void): void => {
			exec(command, (error: ExecException | null, stdout: string, stderr: string): void => {
				if (error) {
					reject(stderr || error.message);
				} else {
					resolve(stdout);
				}
			});
		});

		data.split('\n').forEach((line: string): void => {
			if (line.trim()) {
				console.log(line);
			}
		});
	} catch (error) {
		const errorMessage: string = typeof error === 'string' ? error : (error as Error).message;

		errorMessage.split('\n').forEach((line: string): void => {
			if (line.trim()) {
				console.error(line);
			}
		});
	}
};
