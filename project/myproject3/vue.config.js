module.exports = {
    devServer: {
        proxy: {
            '/v2': {
                target: 'https://api.douban.com',  //需要在访问接口处加 ?apikey=0df993c66c0c636e29ecbb5344252a4a
                //target: 'https://douban.uieee.com', //不需要
                changeOrigin: true
            }
        }
    }
}