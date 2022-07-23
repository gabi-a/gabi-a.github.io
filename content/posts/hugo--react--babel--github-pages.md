---
title: "Hugo + React + Babel + GitHub Pages"
date: 2022-07-24T00:10:00+11:00
draft: false
tags: ["JavaScript", "Hugo", "Babel", "GitHub", "Pages"]
jsFiles:
- "https://unpkg.com/react@16/umd/react.production.min.js"
- "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
---

This is a short tutorial on how to integrate React into a Hugo site hosted on GitHub Pages, to make interactive content such as [explorabl.es](https://explorabl.es/).

There are a few very helpful tutorials out there on this already, however they both have (thankfully different) minor shortcomings:

1. [Wictor Wilen's "How to add a React scripts to Hugo"](https://www.wictorwilen.se/blog/how-to-add-a-react-script-to-hugo/)
2. [José Gilgado's "Javascript in a post in Hugo"](https://josem.co/how-to-render-a-react-component-in-hugo/)

Tutorial (1) is great because it shows how to install Babel with NPM so that the Babel is run when the site is built rather than served, however it is designed to have a single .jsx file on every page (e.g. a search box) rather than a unique .jsx file for each blog (which is what I want for building explorables).

Tutorial (2) is great because it nicely lets each blog post have it's own JavaScript file (by searching for a .jsx file with the same name as the blog post title) but unfortuanately it uses the in-browser Babel transformer, i.e. the .jsx file is converted to .js by the web browser whereas it _should_ be generated when the website is built.

Luckily, all we have to do is combine (1) and (2) and we get the best of both - precompilation and individual scripts! 🚀

# Installing Babel

This procedure largely follows [Tutorial 1](https://www.wictorwilen.se/blog/how-to-add-a-react-script-to-hugo/).

Babel is a "transpiler" - it allows you to write your React code in .jsx (nicer), which is then converted to .js (less nice, but standard) for the browser. 

To install Babel:
1. In the site root, run  
`npm init`  
`npm install @babel/cli @babel/core @babel/preset-react --save`
2. Also in the site root, create a file `babel.config.js` with contents:
```js
module.exports = function (api) {
    api.cache(true);
    const presets = [
      ["@babel/preset-react"]
      ]
    const plugins = [];
    return {
      presets,
      plugins
    };
  }
```
3. Add the following to the `.github\workflows\gh-pages.yml` file to make GitHub Pages automagically install Babel:
```yml
- uses: actions/setup-node@v3
    with:
        node-version: 16
- name: Install NPM Packages
    run: npm ci
```
4. Before you push to GitHub, add `node_modules/*` to `.gitignore` since all those files will be created when the workflow is run.

# Integrating React

This procedure largely follows [Tutorial 2](https://josem.co/how-to-render-a-react-component-in-hugo/).

1. In the Theme folder, add the following to `header.html` (for me it is `themes\ezhil\layouts\partials\header.html`):
```js
	{{- if and .IsPage .Params.jsFiles -}}
	{{- range .Params.jsFiles -}}
		<script src="{{ . }}"></script>
	{{- end -}}
	{{- end -}}
```

2. Also in the Theme folder, add the following after the line containing `{{ .Content }}`:
```js
    {{- $jsFileName := .Title | anchorize -}}
    {{- $pathWithoutExtension := (printf "%s%s" "scripts/" $jsFileName)  -}}
    {{- $pathJS := (printf "%s%s" $pathWithoutExtension ".js" ) -}}
    {{- $pathJSX := (printf "%s%s" $pathWithoutExtension ".jsx" ) -}}
    {{- if (fileExists (printf "%s%s" "assets/" $pathJS)) -}}
    <script src="{{ $pathJS | absURL }}"></script>
    {{- else if (fileExists (printf "%s%s" "assets/" $pathJSX)) -}}
    {{- $app := resources.Get $pathJSX | babel  -}}
    <script src="{{ $app.RelPermalink | absURL }}"></script>
    {{- end -}}
```
This searches for the .jsx (or .js) file with name given by the "anchorized" title, i.e. `My React Post` ➡ `my-react-post.jsx`. 

3. Also in the Theme folder, in the shortcodes folder, create a file `raw-html.html` with contents
```html
<!-- raw html -->
{{.Inner}}
```

# Creating a React Blog Post

We're finally ready to make a React post!

Make a new post, e.g. with title `My React Post`. It's contents are:
```
{{</* raw-html */>}}   
<div id="root"></div>
{{</* /raw-html */>}}
```

Then, in the site root, create the directory `assets\scripts`. In it, create the file `my-react-post.jsx` with contents:
```js
'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}

ReactDOM.render(
  <LikeButton />,
  document.getElementById('root')
);
```

If all goes well, this should render as:

{{< raw-html >}}
<div id="root"></div>
{{</ raw-html >}}

### Extra Tips

If you're not sure what the anchorized tile of your post is (for example, what does `+` become?) you can add the following line to `header.html` to print it to the console:
```js
<script>console.log("Anchorized title: {{ .Title | anchorize }}")</script>
```