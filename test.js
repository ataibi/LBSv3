const ytpl = require('@distube/ytpl')

ytpl("https://www.youtube.com/playlist?list=PLrBjj4brdIRwRkGTLKqH5hlS_mlMYn_J0").then(playlist => {
    console.log(playlist)
}).catch(err =>
    console.error(err)
)