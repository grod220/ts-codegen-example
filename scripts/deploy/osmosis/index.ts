import { taskRunner } from '../base'
import { osmosisTestnetConfig } from './config'

void (async function () {
  await taskRunner(osmosisTestnetConfig)
})()

// TODO: should have whale + generated wallet
// Move shell script to node: https://nodejs.org/api/child_process.html
