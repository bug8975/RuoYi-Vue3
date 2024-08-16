import * as THREE from 'three';

export class DxfViewer {
    constructor(domContainer: HTMLElement, options?: DxfViewer.Options);

    HasRenderer(): boolean;
    GetRenderer(): THREE.WebGLRenderer | null;
    GetCanvas(): HTMLCanvasElement;
    GetDxf(): any;
    SetSize(width: number, height: number): void;
    Load(options: DxfViewer.LoadOptions): Promise<void>;
    Render(): void;
    GetLayers(): Array<{ name: string; displayName: string; color: number }>;
    ShowLayer(name: string, show: boolean): void;
    Clear(): void;
    Destroy(): void;
    SetView(center: { x: number; y: number }, width: number): void;
    FitView(minX: number, maxX: number, minY: number, maxY: number, padding?: number): void;
    GetScene(): THREE.Scene;
    GetCamera(): THREE.OrthographicCamera;
    GetOrigin(): { x: number; y: number };
    GetBounds(): { maxX: number; maxY: number; minX: number; minY: number } | null;
    Subscribe(eventName: string, eventHandler: Function): void;
    Unsubscribe(eventName: string, eventHandler: Function): void;

    static MessageLevel: { INFO: string; WARN: string; ERROR: string };
    static DefaultOptions: DxfViewer.Options;
    static SetupWorker(): void;
}

export namespace DxfViewer {
    interface Options {
        canvasWidth?: number;
        canvasHeight?: number;
        autoResize?: boolean;
        clearColor?: THREE.Color;
        clearAlpha?: number;
        canvasAlpha?: boolean;
        canvasPremultipliedAlpha?: boolean;
        antialias?: boolean;
        colorCorrection?: boolean;
        blackWhiteInversion?: boolean;
        pointSize?: number;
        sceneOptions?: any;
        retainParsedDxf?: boolean;
        preserveDrawingBuffer?: boolean;
        fileEncoding?: string;
    }

    interface LoadOptions {
        url: string;
        fonts?: string[];
        progressCbk?(phase: string, processedSize: number, totalSize: number | null): void;
        workerFactory?(): Worker;
    }
}