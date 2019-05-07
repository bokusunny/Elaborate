import { RawDraftContentBlock } from 'draft-js'

export const convertToText = (rawContentBlocks: RawDraftContentBlock[]) => {
  let commitBody = ''
  for (const block of rawContentBlocks) {
    let inlineStyledBlockText = block.text
    block.inlineStyleRanges.forEach((inlineStyle, index) => {
      let start = inlineStyle.offset
      const length = inlineStyle.length
      const insertInlineChar = (text: string, char: string) => {
        start += index * 2 // 前回までのループで加算されたcharの数を加味
        const end = start + length
        return text.slice(0, start) + char + text.slice(start, end) + char + text.slice(end)
      }

      switch (inlineStyle.style) {
        case 'BOLD':
          inlineStyledBlockText = insertInlineChar(inlineStyledBlockText, '*')
          break

        case 'ITALIC':
          inlineStyledBlockText = insertInlineChar(inlineStyledBlockText, '_')
          break
      }
    })

    switch (block.type) {
      case 'unstyled':
        commitBody += `${inlineStyledBlockText}\n`
        break

      case 'header-one':
        commitBody += `# ${inlineStyledBlockText}\n`
        break

      case 'header-two':
        commitBody += `## ${inlineStyledBlockText}\n`
        break

      case 'blockquote':
        commitBody += `> ${inlineStyledBlockText}\n`
        break

      case 'unordered-list-item':
        commitBody += `- ${inlineStyledBlockText}\n`
        break
    }
  }

  return commitBody
}
