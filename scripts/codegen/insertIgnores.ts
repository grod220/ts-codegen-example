import { readdir } from 'fs/promises'
import { join, resolve } from 'path'
import prependFile from 'prepend-file'

void (async function () {
  const generatedTypesDir = resolve(join(__dirname, '../../types/generated'))
  const typeFiles = await getFiles(generatedTypesDir)
  for (const file of typeFiles) {
    await prependFile(file, '// @ts-nocheck\n')
  }
})()

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    }),
  )
  return Array.prototype.concat(...files)
}
