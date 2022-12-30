import {createFilter, dataToEsm, FilterPattern} from '@rollup/pluginutils';

import { type Plugin } from 'vite'
import sharp, {type Sharp} from "sharp";
import exifr from 'exifr'
// import ExifReader from 'exifreader'

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
        name: 'vite-plugin-image-info',
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
            delete meta['exif']
            delete meta['xmp']
            delete meta['icc']
            delete meta['iptc']
            delete meta['tifftagPhotoshop']

            const exif = await exifr.parse(path)
            /*
            const rotation = await exifr.orientation(path)
            console.debug(rotation)
             */
            /*
            const exif = await ExifReader.load(path, { expanded: true })
            if (exif.exif) {
                delete exif.exif['MakerNote']
                delete exif.exif['UserComment']
            }
            */

            const code = `export { default as asset } from ${JSON.stringify(path)};` +
                dataToEsm({
                meta: meta,
                exif: exif,
                dominant: stats.dominant
            }, {
                namedExports: true,
                preferConst: true,
                objectShorthand: true
            })

            return { code }
        }
    }
}
