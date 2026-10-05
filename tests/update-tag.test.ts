import nock from 'nock'
import updateTag from '../src/lib/update-tag'
import { generateToolkit } from './helpers'
import { Tools } from '../src/lib/tools'

describe('update-tag', () => {
  let tools: Tools
  let params: any

  beforeEach(() => {
    nock('https://api.github.com')
      .patch('/repos/step-security/test/git/refs/tags%2Fv1.0.0')
      .reply(200, (_, body) => {
        params = body
      })

    tools = generateToolkit()
  })

  it('updates the tag', async () => {
    await updateTag(tools, '123abc', 'v1.0.0')

    expect(nock.isDone()).toBe(true)
    expect(params).toEqual({
      force: true,
      sha: '123abc'
    })
  })
})
