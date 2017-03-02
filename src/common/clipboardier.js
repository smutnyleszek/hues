// -----------------------------------------------------------------------------
// clipboardier -- a tool for copying text to clipboard
// -----------------------------------------------------------------------------

class Clipboardier {
    copy(text) {
        const textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        try {
            document.execCommand('copy');
            console.info('copied text to clipboard:', text);
        } catch (e) {
            console.error(e);
        }
        textField.remove();
    }
}

export default new Clipboardier();
