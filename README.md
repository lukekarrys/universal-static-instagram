universal-static-instagram
===============

**Previously [`jekyll-instagram`](https://github.com/lukekarrys/jekyll-instagram/tree/1da67ca095902c2241753f3722c7a991a39d185c)**


## TL;DR

1. Fetch Instagram data
2. Build HTML and [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)
3. Deploy static files


## What is this?

[Demo](http://insta.lukelov.es)

Way back when, Instagram was iOS only and didn't have a web interface. I wanted one so I built some tools that would download the JSON and images and would publish them as a static site. This site idly for the most part while Instagram created amazing interfaces on all platforms.

Then I deleted my account. Before I deleted it I downloaded all the images and JSON from the API with the plan of using this to just display them on the web. It had no CSS and no (useful) JS, but it kinda worked. But the fact that it was Ruby and Jekyll, which are two things I don't use much anymore, meant it sat untouched.

So I decided to rewrite it using [`react`](https://facebook.github.io/react/), [`react-router`](http://rackt.github.io/react-router/), [`redux`](http://rackt.github.io/redux/), and [`webpack`](http://webpack.github.io/) to be a static site (same as before) but so `react` and `react-router` can take over the clientside (and now I'll hopefully do cooler stuff with it).


## Goals

- Output static `.html` files for every page
- Output static `.json` files for each "API route"
- Completely usable with JS disabled
- `react` + `react-router` takeover client-side on load
- Can be self hosted, including images
- Easy to fetch latest or refresh existing Instagram data/media
- Easy deployment to any static hosting including [Surge](https://surge.sh/) or [GitHub Pages](https://pages.github.com/)


## Usage

The best way to use this is by [forking](https://help.github.com/articles/fork-a-repo/) and [cloning](https://help.github.com/articles/cloning-a-repository/) the repo. After that you'll want to run the initial setup commands.

### Initial Setup

- `cd` into the root of the repo
- `npm install`
- `npm run make.config`
- `npm run fetch.data` (this could take a few minutes)

Now you should have a `config.json` file with the information you entered and a `_cache/USER_ID` directory with all your Instagram data. These are both ignored by default and shouldn't be checked into the repo (especially the `config.json` which has your client secret).

Next you can either edit some of the `src` files to change the appearance and layout of your site, or just go straight to deploying it to your favorite static hosting.

### Editing

All the files for the client are located in the `src/` directory. Check out the [Client Architecture docs](CLIENTREADME.md) for an explanation of the organization and how to go about changing certain things. As you edit things you'll want to see these changes live in your browser, so you'll need to run:

```sh
npm start
```

This spins up a [`webpack-dev-server`](http://webpack.github.io/docs/webpack-dev-server.html) with [`react-hot-loader`](http://gaearon.github.io/react-hot-loader/) and you should be able to see that site at [http://localhost:3000](http://localhost:3000).

*Note: changes inside the `src/` directory should hot load in your browser, but any changes to the `webpack.config.js` or the `server/` directory will require the dev server to be restarted. Also if you rerun `npm run fetch.data` you'll need to restart the dev server as well.*

### Building

Whether you made some local modifications or not, the next step is to build all the static files for the site. As stated in the goals section above, this project aims to create an `html` file for each page, `json` file for each set of data, and a `jpg` for each image size. This can mean a lot of files!

My local example has **3572 files and directories** for ~500 Instagram posts. This may seem like a lot (and some of it is technically duplicated between `json` and `html`), but storage is cheap. The benefits are that each page can be loaded on its own (without JS) and look exactly as it would if it were loaded clientside by populating our `redux` store with the plain `json`.

This may seem like overkill (it probably is), but hey, it's one of the goals of the project. You can't argue with goals! To do this:

```sh
npm run build
```

*Note: This will also minify the JS bundle with a hashed filename like `bundle.HASH.js` and do some other `webpack` stuff to get it ready for production.*

### Deploying

Now you have a directory of static files. It includes a `404.html` to serve when the requested path doesn't exist and a `CNAME` file with your domain (if selected). The only requirement to serve this is a basic web server that can serve `.html`, `.js`, `.css`, `.json`, and `.jpg` files appropriately. There are also a few built in options since they require so little setup.

#### [Surge](https://surge.sh/)

```sh
npm run deploy.surge
```

Surge is really great. If you don't have an account, running this command will prompt you to create one and then it will deploy your site to the domain you chose when running `npm run make.config` (via a [`CNAME` file](https://surge.sh/help/remembering-a-domain)). If you didn't pick a domain, Surge will prompt you for one. See the [Surge help docs](https://surge.sh/help) for more information.

*Note: currently Surge uploads every file for each deployment. This means that even if you only make one small style tweak, the deploy process will still have to upload all the files and images which could be 100s of megabytes. There is an [open issue](https://github.com/sintaxi/surge/issues/119) on the project to allow deploying based on diffs only, but it hasn't been implemented. If this is an issue for you, I recommend using GitHub Pages for deploying.*

#### [GitHub Pages](https://pages.github.com/)

```sh
npm run deploy.gh
# Or deploy to a different repository
npm run deploy.gh -- --repo git@github.com:lukekarrys/insta.lukelov.es.git
```

Since you already have this forked on GitHub, and every path has a matching built file, you can use GitHub Pages, which is pretty neat. Running the above command will push the built site up to your GitHub fork on the `gh-pages` branch. If you picked a domain when running `npm run make.config` it will create a [`CNAME` file](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/#creating-and-committing-a-cname-file) for you. See the [GitHub Pages help docs](https://help.github.com/categories/github-pages-basics/) for more information.

You can also deploy to a different repository by using cli argument: `--repo git@github.com:USERNAME/REPO_NAME.git`. This uses [`git-directory-deploy`](https://github.com/lukekarrys/git-directory-deploy) under the hood, so check out the other available arguments in the [documentation](https://github.com/lukekarrys/git-directory-deploy#usage).

*Note: you will first need to create a `gh-pages` branch on your forked repo.*

### Re-fetching Data

Running `npm run fetch.data` again will start after the most recent Instagram post ID, so that you can easily only fetch the latest Instagram data. Sometimes you'll want to refresh all the existing Instagram `json` data as well.

```sh
npm run fetch.data -- --refresh
```

Also, by default Instagram only includes a few likes and comments with each post. You have the option (at the expense of two extra API requests per post) to fetch as many likes and comments as Instagram allows (which right now is ~120 each).

```sh
npm run fetch.data -- --full
```

These commands can be combined as well:

```sh
npm run fetch.data -- --refresh --full
```

*Note: Instagram photos are never redownloaded because they should never change after being posted.*


## Contributing

PRs, issues, and feature requests welcome!

If you are submitting a PR, make sure that `npm run lint` passes after you've written your code.


## License

MIT
