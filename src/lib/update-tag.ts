import { Tools } from './tools'

export default async function updateTag(
  tools: Tools,
  sha: string,
  tagName: string
) {
  const ref = `tags/${tagName}`

  tools.log.info(`Updating ${ref}`)
  return tools.github.git.updateRef({
    ...tools.context.repo,
    ref,
    force: true,
    sha
  })
}
