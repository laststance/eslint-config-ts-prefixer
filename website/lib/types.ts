export interface EslintRule {
  pluginName: string
  ruleName: string
  documentationUrl: string
  id: string // for anchor links and unique key
  content: string // markdown content
  frontmatter: {
    title?: string
    description?: string
    rule_type?: string
    [key: string]: any
  }
}
