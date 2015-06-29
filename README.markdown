universal-react-instagram
===============

**This used to be [`jekyll-instagram`](https://github.com/lukekarrys/jekyll-instagram/tree/1da67ca095902c2241753f3722c7a991a39d185c) but I hadn't really updated it since March of 2013. Since my interests have moved mostly to JS I decided to rewrite it.**


# What is this?

Way back when, Instagram was iOS only and didn't have a web interface. I wanted one so I built some tools that would download the JSON and images and would publish them as a static site. This site idly for the most part while Instagram created amazing interfaces on all platforms.

Then I deleted my account. Before I deleted it I downloaded all the images and JSON from the API with the plan of using this to just display them on the web. It had no CSS and no (useful) JS, but it kinda worked. But the fact that it was Ruby and Jekyll which are two things I don't use much anymore, meant it sat untouched.

So I decided to rewrite it using `react`, `react-router`, and `webpack` to be a static site (same as before) but so `react` and `react-router` can take over the clientside (and now I'll hopefully do cooler stuff with it).


# Can I use this?

Sure! But it still needs the tools to fetch all the data from the Instagram API to be rewritten in JS if you want it to use your data.


# Usage

- `_cache` holds all the json in the format `ID.json`
- `_media` holds all the images in the form `INSTAGRAM/PATH/MINUS/HTTP.jpg`
- `npm install`
- `npm run build`
- `npm run deploy`