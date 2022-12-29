declare module '*.jpeg?info' {
    import type {Stats, Metadata} from "sharp";
    import type {Tags} from 'exifreader';

    export const dominant: Stats['dominant']
    export const meta: Metadata
    export const exif: Partial<Tags>

    type Info = {
        dominant: Stats['dominant']
        meta: Metadata
        exif: Partial<Tags>
    }
    const info: Info
    export default info
}
