var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/ilandrei/notary', // Update to point to your repository  
        user: {
            name: 'ilandrei', // update to use your name
            email: 'ilandrei98@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)