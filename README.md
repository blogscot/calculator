# Calculator App

This project implements a basic calculator application, which I'll eventually submit to Free Code Camp.

Technologies used for development: TypeScript, CSS GRID, Parcel bundler.

## Getting started

To run the development enviroment enter the following command:

```zsh
yarn run start
```

## Tips and Tricks

One important thing to remember when using `Parcel` is that the _scss_ (in this case) needs to be imported into the _js_ file. `Parcel` transforms this into vanilla css which is placed in its own file in the dist folder. If you forget to do this the `Hot Module Reloading` won't work for your styles!

Parcel also supports TypeScript out of the box, so I've sprinkled a few simple types into the code.

## Deploying Using Parcel

To deploy to Github Pages, the production source files can be placed in the /docs folder. I found it was also necessary to use a flat directory structure, i.e. html, js and css files in the same directory. The parcel command to build the production files is shown below:

```zsh
parcel build index.html -d docs --public-url ./
```

You can have a look at the deployed calculator [here](https://blogscot.github.io/calculator/).

## Build Status

[![Build Status](https://travis-ci.org/blogscot/calculator.svg?branch=master)](https://travis-ci.org/blogscot/calculator)
