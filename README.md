# Calculator App

This project will implement a basic calculator application, which I'll eventually submit to Free Code Camp.

Technologies used for development: CSS GRID, Parcel bundler.

## Getting started

To run the development enviroment enter the following command:

```zsh
yarn run start
```

## Tips and Tricks

One important thing to remember when using `Parcel` is that the _scss_ (in this case) needs to be imported into the _js_ file. `Parcel` transforms this into vanilla css which is placed in its own file in the dist folder. If you forget to do this the `Hot Module Reloading` won't work for your styles!
