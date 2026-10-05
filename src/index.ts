import * as core from '@actions/core'
import buildAndTagAction from './lib'
import { createTools } from './lib/tools'
import validateSubscription from './subscription'

async function run() {
  await validateSubscription()

  try {
    await buildAndTagAction(createTools())
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error))
  }
}

run()
