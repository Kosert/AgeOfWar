export class Repeater {

    counter: number = 0

    repeatFor(iterations: number, fun: (iteration: number) => void): boolean {
        if (this.counter >= iterations) {
            return true
        }
        fun(this.counter)
        this.counter++
        return false
    }

    repeatSuccessFor(iterations: number, fun: (iteration: number) => boolean): boolean {
        if (this.counter >= iterations) {
            return true
        }
        if (fun(this.counter))
            this.counter++
        return false
    }
}