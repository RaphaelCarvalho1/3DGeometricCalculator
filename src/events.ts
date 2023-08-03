export class Event {
    private _keyboard: HTMLElement | null;
    private _zoomIn: HTMLElement | null;
    private _zoomOut: HTMLElement | null;
    private _fullScreen: HTMLElement | null;
    private _showKeyboard: HTMLElement | null;

    constructor() {
        this._keyboard = document.getElementById('keyboard');
        this._zoomIn = document.getElementById('zoomIn');
        this._zoomOut = document.getElementById('zoomOut');
        this._fullScreen = document.getElementById('fullScreen');
        this._showKeyboard = document.getElementById('showKeyboard');
        
    }

    private keyboardListener(): void {

    }

    private showText(target: string, text: string): void {

    }
}