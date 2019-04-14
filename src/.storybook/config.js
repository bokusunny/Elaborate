import { configure } from '@storybook/react'

// storyファイルを一括取得
const req = require.context("../components", true, /.stories.(ts|tsx)$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
