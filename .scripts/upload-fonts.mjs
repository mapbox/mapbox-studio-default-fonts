#!/usr/bin/env node

import { promises as fs } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

const [, , family, account, domain, token] = process.argv

if (!token) {
    console.log(`Usage:
  .scripts/upload-fonts.mjs [family] [account] [baseurl] [token]`)
    process.exit(1)
}

console.log(`\nUploading '${family}' font family to '${account}'`)

if (!family.match(/^[a-z-]+$/)) {
    console.log(`Invalid font family`)
    process.exit(1)
}

if (!token.match(/^(sk|tk)\.[^.]+\.[^.]+$/i)) {
    console.log(`Invalid token`)
    process.exit(1)
}

const url = `${domain}/fonts/v1/${account}?access_token=${token}`
const files = (await fs.readdir(`./${family}`))
    .map(d => join(family, d))
    .filter(d => d.match(/\.(ttf|otf)$/))

console.log(`\nFound ${files.length} fonts`)

for (const file of files) {
    try {
        const font = await fs.readFile(file)
        const res = await fetch(url, { method: 'POST', body: font })
        const body = await res.json()
        if (299 < res.status) {
            const reason = `[${res.status} ${res.statusText}]: ${
                body.message || JSON.stringify(body)
            }`
            throw new Error(reason)
        }
        console.log(`\nUploaded ${file}`)
    } catch (e) {
        console.error(`\nFailed to upload ${file}:\n`, e)
    }
}

console.log('\nDone!')
