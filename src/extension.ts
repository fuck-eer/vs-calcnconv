import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"calcnconv.calculate",
		() => {
			const { activeTextEditor } = vscode.window;
			const text = activeTextEditor?.document.getText(
				activeTextEditor.selection
			);

			try {
				if (!!text) {
					void activeTextEditor?.edit((editBuilder) => {
						editBuilder.insert(
							activeTextEditor?.selection.end,
							`=${eval(text)}`
						);
					});
				}
			} catch (err) {}
		}
	);

	vscode.commands.registerCommand("calcnconv.pxToRem", () => {
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
