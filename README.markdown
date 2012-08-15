# This project currently doesn't work. It will work soon.

## What is Jekyll-Instagram?

This project was created after I added a bunch of customized things to Octopress to allow for easy creation of Instagram posts and the someone asked if it could be its own repo. So here it is!

The project consists mainly of the Rakefile which has a few tasks to batch create Instagram posts and some JavaScript which allows users to comment and like Instagram posts on the post. I tried to strip it down as much as possible so that means no CSS and as little HTML and JS as possible. Much of the HTML that is already there was taken from Octopress and them stripped of anything I didn't think was necessary.

## Why?

I am hoping that this is a good starting point for creating your own Instagram blog, with the ability to add all your own CSS and other JS and HTML and stuff.\

## Setup

0) Install rvm
1) `git clone`
2) `cd`
3) `echo 'INSTAGRAM_API_TOKEN' > .instagram-token`
4) `rake recent_instagrams`
5) `jekyll` (doesn't work)


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
