import codegen from '@cosmwasm/ts-codegen'
import { join, resolve } from 'path'
import { printGreen, printRed } from '../utils/chalk'
import { readdir } from 'fs/promises'

void (async function () {
  try {
    const schemasDir = resolve(join(__dirname, '../../../schemas'))
    const schemas = await readdir(schemasDir)

    for (const schema of schemas) {
      await codegen({
        contracts: [`${schemasDir}/${schema}`],
        outPath: `./types/generated/${schema}`,
      })
    }
    printGreen('✨ all done!')
  } catch (e) {
    printRed(e)
  }
})()
