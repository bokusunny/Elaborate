export const rootURL = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:3000'

    case 'production':
      return 'https://elabor-8.com'

    default:
      console.warn("'NODE_ENV' is not found in .env and temporarily set localhost:3000 instead.")
      return 'http://localhost:3000'
  }
})()
