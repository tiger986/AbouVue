module.exports = {
    devServer: {
        proxy: {
            '/v2': {
                target: 'https://douban.uieee.com',
                changeOrigin: true
            }
        }
    }
}