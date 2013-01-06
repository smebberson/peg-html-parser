PEG HTML parser
===============

An example of a HTML parser, written for [Canopy][canopy] (which is a PEG parser compiler for JavaScript).

It's a fairly basic example, and written mainly to demonstrate recursive parsing (i.e. nested HTML tags). It can handle ```<!DOCTYPE html>``` and opening and closing (must be present) tags, but that is it so far. The tree output by the parser is fairly simplistic, as it doesn't seaparate HTML tag names, from attributes for example.

Tests
-----

There are bunch of basic tests in the /tests/ folder. They can be run from the browser without issues (but I suggest using a web server, you can use [static][staticserver] if you have node setup).

The HTML for the tests can be found in the TestRunner.html file.

[canopy]: http://canopy.jcoglan.com/
[staticserver]: https://npmjs.org/package/node-static