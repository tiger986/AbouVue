module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://art.api.lipengwencai.com',
                changeOrigin: true
            }
        }
    }
}