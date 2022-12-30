declare module '*.jpeg?info' {
    import type {Stats, Metadata} from "sharp";
    export const asset: string

    export const dominant: Stats['dominant']
    export const meta: Metadata
    export const exif: never

    type Info = {
        dominant: Stats['dominant']
        meta: Metadata
        exif: never
    }
    const info: Info
    export default info
}
