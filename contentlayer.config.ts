import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    updated: {
      type: "date",
      required: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    cover: {
      type: "string",
      required: false,
    },
    draft: {
      type: "boolean",
      default: false,
    },
    lang: {
      type: "string",
      default: "ko",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace("blog/", "")}`,
    },
    readingTime: {
      type: "number",
      resolve: (doc) => {
        const wordsPerMinute = 200
        const content = doc.body.raw
        const words = content.split(/\s+/).length
        return Math.ceil(words / wordsPerMinute)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
})
