import fs from 'fs'
import path from 'path'
import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

type OctokitOptions = NonNullable<Parameters<typeof getOctokit>[1]>

export interface Tools {
  github: ReturnType<typeof getOctokit>['rest']
  context: {
    event: string
    sha: string
    payload: any
    repo: { owner: string; repo: string }
  }
  inputs: { tag_name?: string }
  log: {
    info: (message: string) => void
    complete: (message: string) => void
  }
  workspace: string
  getPackageJSON: <T = Record<string, unknown>>() => T
}

export function createTools(octokitOptions?: OctokitOptions): Tools {
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd()
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/')

  const eventPath = process.env.GITHUB_EVENT_PATH
  const payload =
    eventPath && fs.existsSync(eventPath)
      ? JSON.parse(fs.readFileSync(eventPath, 'utf8'))
      : {}

  return {
    github: getOctokit(process.env.GITHUB_TOKEN || '', octokitOptions).rest,
    context: {
      event: process.env.GITHUB_EVENT_NAME || '',
      sha: process.env.GITHUB_SHA || '',
      payload,
      repo: { owner, repo }
    },
    inputs: {
      get tag_name() {
        return core.getInput('tag_name')
      }
    },
    log: {
      info: (message) => core.info(message),
      complete: (message) => core.info(`✔ ${message}`)
    },
    workspace,
    getPackageJSON: <T>() =>
      JSON.parse(
        fs.readFileSync(path.join(workspace, 'package.json'), 'utf8')
      ) as T
  }
}
