import * as vscode from 'vscode';

const keyMap: { [key: string]: string } = {
    'a': 'ф', 'b': 'и', 'c': 'с', 'd': 'в', 'e': 'у', 'f': 'а',
    'g': 'п', 'h': 'р', 'i': 'ш', 'j': 'о', 'k': 'л', 'l': 'д',
    'm': 'ь', 'n': 'т', 'o': 'щ', 'p': 'з', 'q': 'й', 'r': 'к',
    's': 'ы', 't': 'е', 'u': 'г', 'v': 'м', 'w': 'ц', 'x': 'ч',
    'y': 'н', 'z': 'я', '[': 'х', ']': 'ъ', '`': 'ё', ',': 'б',
    '.': 'ю', ';': 'ж', "'": 'э',
    'A': 'Ф', 'B': 'И', 'C': 'С', 'D': 'В', 'E': 'У', 'F': 'А',
    'G': 'П', 'H': 'Р', 'I': 'Ш', 'J': 'О', 'K': 'Л', 'L': 'Д',
    'M': 'ь', 'N': 'Т', 'O': 'Щ', 'P': 'З', 'Q': 'Й', 'R': 'К',
    'S': 'ы', 'T': 'Е', 'U': 'Г', 'V': 'М', 'W': 'Ц', 'X': 'Ч',
    'Y': 'Н', 'Z': 'Я', '{': 'Х', '}': 'ъ', '~': 'Ё', '<': 'Б',
    '>': 'Ю', ':': 'Ж', '"': 'Э'
};

function replaceText(text: string): string {
    return text.split('').map(char => keyMap[char] || char).join('');
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('textreplacer.replaceText', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            const replacedText = selectedText.split('').map(char => keyMap[char] || char).join('');

            editor.edit(editBuilder => {
                editBuilder.replace(selection, replacedText);
            });
        }
    });

	let disposable2 = vscode.commands.registerCommand('textreplacer.replaceTextInComments', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
	
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
	
		const singleLineCommentRegex = /\/\/.*/g;
		const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;
	
		const replacedText = selectedText
			.replace(singleLineCommentRegex, (match) => replaceText(match))
			.replace(multiLineCommentRegex, (match) => replaceText(match));
	
		editor.edit(editBuilder => {
			editBuilder.replace(selection, replacedText);
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

export function deactivate() {}
