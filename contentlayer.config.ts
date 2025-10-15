import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    published: {
      type: 'boolean',
      description: 'Whether the post is published',
      required: false,
      default: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the post',
      required: false,
    },
    category: {
      type: 'string',
      description: 'Category of the post',
      required: false,
    },
    image: {
      type: 'string',
      description: 'Featured image for the post',
      required: false,
    },
    author: {
      type: 'string',
      description: 'Author of the post',
      required: false,
      default: 'Your Name',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the project',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the project',
      required: true,
    },
    published: {
      type: 'boolean',
      description: 'Whether the project is published',
      required: false,
      default: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the project',
      required: false,
    },
    github: {
      type: 'string',
      description: 'GitHub repository URL',
      required: false,
    },
    demo: {
      type: 'string',
      description: 'Demo URL',
      required: false,
    },
    image: {
      type: 'string',
      description: 'Featured image for the project',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (project) => `/projects/${project._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (project) => project._raw.flattenedPath,
    },
  },
}))

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeKatex],
  },
  disableImportAliasWarning: true,
})
