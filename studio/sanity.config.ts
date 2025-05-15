import {defineConfig} from 'sanity'
import { deskTool } from 'sanity/desk';
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const ProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const Dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'default',
  title: 'angga-portfolio',

  projectId: ProjectId,
  dataset: Dataset,

  plugins: [deskTool(), visionTool()],
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
})
