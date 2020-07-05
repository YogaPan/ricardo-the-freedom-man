import { resolve, join } from 'https://deno.land/std/path/mod.ts'
import { red, green } from 'https://deno.land/std/fmt/colors.ts'
import { range } from 'https://deno.land/x/fae/mod.ts'

const config = {
  imageRootPath:
    'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/04-explode-tips',
  distDir: resolve(Deno.cwd(), '_testImages'),
  imgSuffix: '.jpg',
  limit: 300,
}

const message = {
  success: green('\nDownload Complete.'),
  error: red('\nDownload Failed.'),
}

async function downloadImage(
  imageUrl: string,
  distPath: string
): Promise<void> {
  const res = await fetch(imageUrl)
  const body = new Uint8Array(await res.arrayBuffer())
  await Deno.writeFile(distPath, body)
  console.log(green('[success]'), distPath)
}

async function collectImages({
  imageRootPath,
  distDir,
  imgSuffix,
  limit,
}: typeof config): Promise<PromiseSettledResult<void>[]> {
  return Promise.allSettled(
    range(0, limit).map((index) => {
      try {
        const filename = ('' + index).padStart(4, '0') + imgSuffix
        const imageUrl = join(imageRootPath, filename)
        const distPath = resolve(distDir, filename)
        return downloadImage(imageUrl, distPath)
      } catch (err) {
        console.log(red('[error]'), err)
        throw err
      }
    })
  )
}

try {
  await Deno.mkdir(config.distDir, { recursive: true })
  const results = await collectImages(config)
  console.log(
    results.some((r) => r.status === 'rejected')
      ? message.error
      : message.success
  )
} catch (err) {
  console.error(err)
}
