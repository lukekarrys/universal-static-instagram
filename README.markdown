## What is Jekyll-Instagram?

This project was created after I added a bunch of customized things to Octopress to allow for easy creation of Instagram posts and the someone asked if it could be its own repo. So here it is!

The project consists mainly of the Rakefile which has a few tasks to batch create Instagram posts and some JavaScript which allows users to comment and like Instagram posts on the post. I tried to strip it down as much as possible so that means as little HTML/CSS/JS as possible. Much of the HTML that is already there was taken from Octopress and them stripped of anything I didn't think was necessary.

## Why?

I am hoping that this is a good starting point for creating your own Instagram blog, with the ability to add all your own CSS and other JS and HTML and stuff.

## But Instagram just rolled out web profile pages

Yeah I know. I started development on this before and used it personally before web profile pages were rolled out. The idea was always to make it something like this: bare bones, more extensible, maybe even add theme support. I thought there might be 0.1% of Instagram users who would appreciate hosting their own pages with full control over the HTML/CSS/JS and still have people be able to like and comment. Now that all Instagram users have their own profile pages, I think that number might have dropped to 0.01% but I still wanted to publish this as a pet project.

## Demo
Check out [this page](http://jekyllgram.com) for a demo of how it looks and works.

## Setup

### rvm and ruby and setup
- Install [rvm](https://rvm.io/)
- `rvm install ruby-1.9.3-p362`
- `git clone git@github.com:lukekarrys/jekyll-instagram.git`
- `cd jekyll-instagram`

### Configuration
- `touch _secret.yml`
- Add `instagram_secret` and `rsync_opts` to `_secret.yml`. These options are moved to this file instead of _config.yml since they either should be kept secret or are environment specific.
- Edit `root`, `instagram_client_id`, `instagram_redirect_uri` in `_config.yml`
- You will need to register an Instagram client at the [Instagram developer clients page](http://instagram.com/accounts/login/?next=/developer/register/). This client will be used to create the Instagram post pages for Jekyll to parse. Use the values from your newly created client for the appropriate config options.

### Get an Instagram API Token
- Run`rake access_token`
- You will be given a URL to go to in your browser (it will be copied to your clipboard for easy access). Your browser will ask you to authorize your application. Click 'Authorize'.
- This will redirect to your specified URI with a query parameter called `code`. Enter the code back into the waiting script.
- Your access token will be saved to `.instagram/access_token`.

### Get the site up
- `rake recent_instagrams` to create posts from all your instagrams
- `jekyll --server`

### All at once
- `rake all` This will create any recent instagrams, genrate via jekyll and deploy via rsync.

### Cron
I've deployed this on an Ubuntu 10.04.3 LTS server and added this to my crontab to get new Instagrams every hour:

```
0 */1 * * * /bin/bash -c 'source /home/USERNAME/.profile && 
source /home/USERNAME/.rvm/environments/ruby-1.9.3-p362@jekyll-instagram && 
cd /PATH/TO/jekyll-instagram/ && 
git pull && 
rake all'
```

Make sure you update your `rsync_opts` to specify where to copy the files to.

I ran into some encoding issues when running jekyll from a cron job, so I am sourcing my .profile. It contains these two lines:
```
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```
See [jekyll issue #188](https://github.com/mojombo/jekyll/issues/188) for more details.

### Customizatiom
The [jekyll wiki](https://github.com/mojombo/jekyll/wiki) is a great place to start to learn about jekyll and how to change this setup to match your needs. This repo is purposefully left as bare bones and as close to the jekyll defaults as possible.

### Deployment
The `public` directory is now full of good ol' fashioned static files. Check out the [jekyll page on deployment](https://github.com/mojombo/jekyll/wiki/Deployment) for all your options.

#### rsync

I use `rsync` to send the public dir to a server.

#### gh-pages

Run `rake setup_github_pages` and then `rake push`.

### Liking + Commenting
The site provides a JS plugin and a server-side PHP proxy to allow for the display and posting of likes and comments for each Instagram media. To get this to work:
- Change `root` and `instagram_client` in `_config.yml`. `root` must match your Instagram redirect_url (minus the http://) and `instagram_client` is your Instagram client ID from previously.
- Your server (or wherever you are testing) will need to support PHP for this to work. Submit a pull request for a different proxy if you want.
- Instagram recently instituted comment whitelisting for applications. If you want comments to work, you'll have to visit [this page](http://bit.ly/instacomments) to request access for commenting on your application.

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
