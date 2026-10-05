import { Tools } from './tools'

export default function getTagName(tools: Tools): string {
  if (tools.inputs.tag_name) {
    return tools.inputs.tag_name
  }

  if (tools.context.event === 'release') {
    return tools.context.payload.release.tag_name
  }

  throw new Error('No tag_name was found or provided!')
}
