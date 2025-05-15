import {defineConfig} from 'sanity'
import { deskTool } from 'sanity/desk';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'angga-portfolio',

  projectId: 'boqqxhku',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
})
