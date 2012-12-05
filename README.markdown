## What is Jekyll-Instagram?

This project was created after I added a bunch of customized things to Octopress to allow for easy creation of Instagram posts and the someone asked if it could be its own repo. So here it is!

The project consists mainly of the Rakefile which has a few tasks to batch create Instagram posts and some JavaScript which allows users to comment and like Instagram posts on the post. I tried to strip it down as much as possible so that means as little HTML/CSS/JS as possible. Much of the HTML that is already there was taken from Octopress and them stripped of anything I didn't think was necessary.

## Why?

I am hoping that this is a good starting point for creating your own Instagram blog, with the ability to add all your own CSS and other JS and HTML and stuff.

## Setup

### Get an Instagram API Token
- Go to your [Instagram developer clients page](http://instagram.com/accounts/login/?next=/developer/register/)
- You will need to register a new client. This client will be used to create the Instagram post pages for Jekyll to parse
- Go to `https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code`. It is very important that `REDIRECT-URI` matches the OAuth redirect_uri for your application or you will get an error. I just use `http://localhost`. It doesn't matter as long as it matches.
- Your browser will ask you to authorize your application. Click 'Authorize'.
- The browser will redirect to your redirect URI with a query parameter of `code`. This value will be used to generate your token.
- run `sh gettoken.sh CLIENTID CLIENTSECRET REDIRECTURI CODE`. This will output your access token.
- Paste the token into `./instagram-token`

### Get the site up
- Install [rvm](https://rvm.io/)
- `git clone` the repo
- `cd` into directory
- `rake recent_instagrams`
- `jekyll --server`

### Deployment
The `_site` directory is now full of good ol' fashioned static files. Check out the [jekyll page on deployment](https://github.com/mojombo/jekyll/wiki/Deployment) for all your options.

### Liking + Commenting
The site provides a JS plugin and a server-side PHP proxy to allow for the display and posting of likes and comments for each Instagram media. To get this to work:
- Change `root` and `instagram_client` in `_config.yml`. `root` must match your Instagram redirect_url (minus the http://) and `instagram_client` is your Instagram client ID from previously.
- Your server (or wherever you are testing) will need to support PHP for this to work. Submit a pull request for a different proxy if you want.


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
