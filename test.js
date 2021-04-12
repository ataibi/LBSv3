const ytpl = require('@distube/ytpl')

ytpl("https://www.youtube.com/playlist?list=PLrBjj4brdIRwRkGTLKqH5hlS_mlMYn_J0").then(playlist => {
    console.log(playlist)
}).catch(err =>
    console.error('\x1b[41m%s\x1b[0m %s', `> ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} :`, err)
)