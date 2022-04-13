declare global {

    export interface Window {
        initPrefs: (type: string, defaultValue: string) => string
    }

    export interface Number {
        coerceAtLeast(limit: number): number
        coerceAtMost(limit: number): number
        coerceIn(min: number, max: number): number
    }

    export interface String {
        toColorNumber(): number
    }

    export interface Array<T> {
        shuffle(): Array<T>
        minBy(getter: (item: T) => any): T
        maxBy(getter: (item: T) => any): T
    }
}

String.prototype.toColorNumber = function(): number {
    return parseInt(this.replace(/^#/, ''), 16);
}

Number.prototype.coerceAtLeast = function (limit: number): number {
    if (limit > this) return limit
    else return this
}

Number.prototype.coerceAtMost = function (limit: number): number {
    if (this > limit) return limit
    else return this
}

Number.prototype.coerceIn = function (min: number, max: number): number {
    if (min > this) return min
    if (this > max) return max
    return this
}

Array.prototype.shuffle = function () {
    const newArr = this.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
    return newArr
}

Array.prototype.minBy = function (getter: (item: any) => any) {
    if (this.length == 0)
        return null

    return this.reduce((a, b) => getter(a) < getter(b) ? a : b)
}

Array.prototype.maxBy = function (getter: (item: any) => any) {
    if (this.length == 0)
        return null

    return this.reduce((a, b) => getter(a) > getter(b) ? a : b)
}

export {}