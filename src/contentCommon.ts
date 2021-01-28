export function getWindow() {
    return window['wrappedJSObject'];
}

export function downloadTextFile(fileText: string, mimeType: string) {
    const blob = new Blob([fileText], { type: mimeType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'archive.html';
    a.style.display = 'hidden';
    document.body.appendChild(a);
    a.click();
}