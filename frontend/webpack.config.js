const path = require('path');

module.exports = {
  // ... other webpack configuration options
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    }
  }
};
