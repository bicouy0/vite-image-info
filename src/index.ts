import {createFilter, dataToEsm, FilterPattern} from '@rollup/pluginutils';

import { type Plugin } from 'vite'
import sharp, {type Sharp} from "sharp";

import ExifReader from 'exifreader';

export interface VitePluginOptions {
    include: FilterPattern
    exclude: FilterPattern
}

const defaultOptions: VitePluginOptions = {
    include: [
        '**/*.jp(e)?g\?info',
    ],
    exclude: 'public/**/*',
}

export default function viteImageInfo(userOptions: Partial<VitePluginOptions> = {}): Plugin {
    const pluginOptions: VitePluginOptions = { ...defaultOptions, ...userOptions }
    const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

    return {
        name: 'vite-image-info',
        enforce: 'pre',

        async load(id: string) {
            if (!filter(id)) return null

            const [path, query] = id.split('?', 2)

            let img: Sharp

            try {
                img = sharp(path)
            } catch (ex) {
                console.warn('\n', `${id} couldn't be loaded by vite-image-info, fallback to default loader`)
                return
            }

            const stats = await img.stats()
            const meta = await img.metadata()

            const tags = await ExifReader.load(path);

            const code = dataToEsm({
                meta: meta,
                exif: tags,
                dominant: stats.dominant
            })

            return { code }
        }
    }
}
