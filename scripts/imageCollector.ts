import { resolve, join } from 'https://deno.land/std/path/mod.ts'
import { red, green } from 'https://deno.land/std/fmt/colors.ts'
import { range } from 'https://deno.land/x/fae/mod.ts'

const imageRootPath =
  'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/04-explode-tips'
const distDir = resolve(Deno.cwd(), '_testImages')
const imgSuffix = '.jpg'
const limit = 300

const downloadImage = async (image: string, distPath: string) => {
  const res = await fetch(image)
  const body = new Uint8Array(await res.arrayBuffer())
  await Deno.writeFile(distPath, body)
  console.log(green('[success]'), distPath)
}

const collectImages = async (
  imageRootPath: string,
  distDir: string,
  imgSuffix: string,
  limit: number
) => {
  await Deno.mkdir(distDir, { recursive: true })
  return Promise.all(
    range(0, limit).map((index) => {
      try {
        const filename = ('' + index).padStart(4, '0') + imgSuffix
        const image = join(imageRootPath, filename)
        const distPath = resolve(distDir, filename)
        return downloadImage(image, distPath)
      } catch (err) {
        console.log(red('[error]'), err)
        throw err
      }
    })
  )
}

const successMessage = green('\nDownload Complete.')
const errorMessage = red('\nDownload Failed.')

try {
  await collectImages(imageRootPath, distDir, imgSuffix, limit)
  console.log(successMessage)
} catch {
  console.log(errorMessage)
}
