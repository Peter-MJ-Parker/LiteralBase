const { inspect } = require('node:util');

const COLOR = {
	RED: '\x1B[31m',
	ORANGE: '\x1B[38;5;202m',
	YELLOW: '\x1B[33m',
	GREEN: '\x1B[32m',
	BLUE: '\x1B[34m',
	PINK: '\x1B[35m',
	PURPLE: '\x1B[38;5;129m',
	CYAN: '\x1B[36m',
	WHITE: '\x1B[37m',
	RESET: '\x1B[0m'
}

function getTimestamp() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parse(message: string) {
	if (typeof message === 'string') return message;

	const properties = inspect(message, { depth: 3 });

	const regex = /^\s*["'`](.*)["'`]\s*\+?$/gm;

	const response = [];
	for (const line of properties.split('\n')) {
		response.push( line.replace(regex, '$1') );
	}

	return response.join('\n');
}

function info(message: string) {
	console.log(`${COLOR.YELLOW}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

function warn(message: string) {
	console.log(`${COLOR.ORANGE}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

function error(message: string) {
	console.log(`${COLOR.RED}[${getTimestamp()}] ${parse(message)}${COLOR.RESET}`);
}

function success(message: string) {
	console.log(`${COLOR.GREEN}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

function debug(message: string) {
	console.log(`${COLOR.BLUE}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

function deleted(message: string) {
	console.log(`${COLOR.PINK}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

function updated(message: string) {
	console.log(`${COLOR.PURPLE}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

function created(message: string) {
	console.log(`${COLOR.CYAN}[${getTimestamp()}]${COLOR.RESET} ${parse(message)}`);
}

export default { getTimestamp, info, warn, error, success, debug, deleted, updated, created };