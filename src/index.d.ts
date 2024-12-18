/**
 * Set the allowed commands for execution.
 * @param list - List of allowed commands.
 */
export function consoleAllowList(list: string[]): void;

/**
 * Execute a shell command if it's in the allowed list.
 * @param command - Command to execute.
 * @returns A promise that resolves when the command is executed.
 */
export function serverlessConsole(command: string): Promise<void>;