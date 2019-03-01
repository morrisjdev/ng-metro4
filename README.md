# ng-metro4

ng-metro4 is an implementation of the beautiful metro4 components.

[Demo](https://morrisjdev.github.io/ng-metro4/#/)

See metro4 for more details:
[Metro4](https://metroui.org.ua/)

## Installation

1. Install using npm:

````
npm install metro4 ng-metro4 jquery -S
````

2. Add imports in your angular.json

````
"styles": [
  "node_modules/metro4/build/css/metro-all.min.css",
  "src/styles.less"
],
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/metro4/build/js/metro.min.js"
]
````

3. Import modules:

You can add NgMetro4Module to your imports to import the whole library:

````
imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  NgMetro4Module,
  ...
]
````

or just add each component itself in your imports where you need it

## Usage

For usage details check out the whole documentation (coming soon).

## Author

[Morris Janatzek](http://morrisj.net) ([morrisjdev](https://github.com/morrisjdev))
