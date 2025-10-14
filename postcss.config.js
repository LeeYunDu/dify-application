// postcss.config.js
import autoprefixer from 'autoprefixer'

export default {
  plugins: {
    autoprefixer: autoprefixer(),
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*']
    }
  }
}
