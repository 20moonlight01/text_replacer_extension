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

	context.subscriptions.push(disposable);
}

export function deactivate() {}
