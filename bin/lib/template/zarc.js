module.exports = {
    type: '<%-type-%>',
    mfe: <%-mft-%>,
    perset: [<% for (var i=0; i<plugin.length; i ++) {if (i === (plugin.length - 1)) {-%>'<%=plugin[i]-%>'<% } else { -%>'<%=plugin[i]-%>',<% }}-%>],
    configureWebpack: config => {
        config.mode('development')
        const fileType = ['.ts', '.tsx', '.js', '.json', '.vue', '.jsx']
        fileType.map((ele) => {
            config.resolve.extensions.add(ele)
        })
        config.resolve.extensions.end()
    }
}