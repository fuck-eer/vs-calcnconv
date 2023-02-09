// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Range, Position } from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "calnconv" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand("calnconv.calculate", () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const { activeTextEditor } = vscode.window;
		const text = activeTextEditor?.document.getText(activeTextEditor.selection);

		try {
			if (!!text) {
				void activeTextEditor?.edit((editBuilder) => {
					editBuilder.insert(activeTextEditor?.selection.end, `=${eval(text)}`);
				});
			}
		} catch (err) {}
	});

	vscode.commands.registerCommand("calnconv.pxToRem", () => {
		const { activeTextEditor } = vscode.window;
		let remValue: number | null;
		const text = activeTextEditor?.document.getText(activeTextEditor.selection);
		if (!!text) {
			const [pxVAlue, ...rest] = text.toLowerCase().split("px");
			remValue =
				rest.length === 1 && parseFloat(pxVAlue)
					? parseFloat(pxVAlue) / 16
					: null;
			try {
				void activeTextEditor?.edit((editBuilder) => {
					if (remValue) {
						editBuilder.replace(activeTextEditor?.selection, `${remValue}rem`);
					}
				});
			} catch (err) {}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
