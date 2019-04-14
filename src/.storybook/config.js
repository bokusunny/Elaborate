import { configure } from '@storybook/react'

// storyファイルを一括取得
const req = require.context("../components", true, /.stories.(ts|tsx)$/)

<<<<<<< HEAD
function loadStories() {
=======
const loadStories = () => {
>>>>>>> 171736acfc9f0ba0abddfab0704eb42cb61eef97
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
