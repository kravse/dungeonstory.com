# VueJS / Netfliy Boilerplate

[A boilerplate by Jared Krause](https://github.com/kravse/)

#### This is a simple boilerplate for folks looking to build a VueJS site and host it on Netlify. This is basically just a [VueCLI](https://cli.vuejs.org/) build with some subtle config to make getting started easier.

I've added:
* [PrerenderSpaPlugin](https://github.com/chrisvfritz/prerender-spa-plugin) for production builds. This helps with SEO and Accessibility by allowing the site to work without JavaScript and giving crawlers a bit more access to the code without having to compile JS.

* A structure to add views and components with scoped CSS files.

* A simple [Stylus](https://stylus-lang.com/) setup with some variables, base styles etc.

* A `netlify.toml` file that adds some useful security headers and a redirect rule to help with serving Single Page Apps.

* General meta and meta tags for Twitter & Facebook.

* A Javascript file in `/public/outside-vue.js` that will run any logic you want to live outside the VueJS framework. I don't recommend using this unles you have a very specific use case. In [kravse.dev](https://kravse.dev) I used it to load [Three.js](https://threejs.org/) after Vue had rendered the page.

* Favicons and a properly sized shareing image for link previews.

* `robots.txt`, `sitemap_index.xml`, and `sitemap_main.xml` please be sure to modify these to include your site information.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Customization
1. Replace `YOURSITE.com` with your website address in:
* `/public/robots.txt`
* `/public/sitemap_index.xml`
* `/public/sitemap_main.xml`
* `/public/index.html`

2. Replace `/public/favicon.ico` and `/public/favicon.png` with custom favicons.

3. Replace `/public/share-img.png` with a 1200x630 image of your choice. This image will populate link previews on Facebook, Twitter, Slack, etc.

4. Be sure to update the prerendered routes in `./vue.config.js`. Whatever routes you add here will be pre-rendered for production.

## Netlify
I recommend hosting & deploying for free with [Netlify](https://docs.netlify.com/site-deploys/overview/).


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
