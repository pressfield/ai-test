const axios = require('axios')
const ProgressBar = require('progress')
const fs = require('node:fs')
const path = require('node:path')

const download = async (url) => {
  console.log('Connecting …')
  const { data, headers } = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })
  const totalLength = headers['content-length']

  console.log('Starting download')
  const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(totalLength),
  })

  const writer = fs.createWriteStream(path.resolve(__dirname, 'llama-2-7b-chat.ggmlv3.q4_0.bin'))

  data.on('data', (chunk) => progressBar.tick(chunk.length))
  data.pipe(writer)
}

(async () => {
  await download(
    'https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/resolve/main/llama-2-7b-chat.ggmlv3.q4_0.bin'
  )
})()
