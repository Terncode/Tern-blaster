export interface Point {
    x: number;
    y: number;
    z?: number;
}
export interface AudioPoint extends Point {
    distance: number;
}
