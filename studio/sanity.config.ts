import {defineConfig} from 'sanity'
import { deskTool } from 'sanity/desk';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'angga-portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [deskTool(), visionTool()],
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
})
