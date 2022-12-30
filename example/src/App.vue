<script setup lang="ts">
import { prettyPrintJson } from 'pretty-print-json'
import "pretty-print-json/pretty-print-json.css"

import IMG_0023_info, { asset as IMG_0023 } from "./assets/IMG_0023.jpeg?info"
</script>

<style lang="css">
#photo {
  border: 3px solid rgb(
      v-bind('IMG_0023_info.dominant.r'),
      v-bind('IMG_0023_info.dominant.g'),
      v-bind('IMG_0023_info.dominant.b')
  );
}
</style>

<template>
  <div>
    <img id="photo" :src="IMG_0023" :width="IMG_0023_info.meta.width" :height="IMG_0023_info.meta.height" />
    <hr />
    <h4>Meta</h4>
    <pre class="json-container" v-html="prettyPrintJson.toHtml(IMG_0023_info.meta)" />
    <h4>Dominant color</h4>
    <pre class="json-container" v-html="prettyPrintJson.toHtml(IMG_0023_info.dominant)" />
    <h4>EXIF</h4>
    <pre class="json-container" v-html="prettyPrintJson.toHtml(IMG_0023_info.exif)" />
  </div>
</template>
