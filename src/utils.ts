import { Point } from './interfaces';

export function removeItem<T>(items: T[], item: T): boolean {
    const index = items.indexOf(item);

    if (index !== -1) {
        items.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

export function pushUniq<T>(array: T[], item: T) {
    const index = array.indexOf(item);

    if (index === -1) {
        array.push(item);
        return array.length;
    } else {
        return index + 1;
    }
}

export function distance(a: Point, b: Point): number {
    return distanceXY(a.x, a.y, b.x, b.y);
}

export function distanceXY(ax: number, ay: number, bx: number, by: number): number {
    return lengthOfXY(ax - bx, ay - by);
}

export function lengthOfXY(dx: number, dy: number): number {
    return Math.sqrt(dx * dx + dy * dy);
}

export function lastSplit(string: string, splitter: string) {
    if (string.lastIndexOf(splitter) === -1) {
        return [string, ''];
    }

    const a = string.slice(string.lastIndexOf(splitter) + 1);
    const b = string.slice(0, string.lastIndexOf(splitter));
    return [b, a];
}
