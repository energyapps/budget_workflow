## Typical Repo for inclusion in Energy.gov

This is a repo that contains the typical information that would go into an energy.gov/maps entry. 

Our goal is to develop a workflow that would allow us to: 

* Version control our code in an open location (github).
* Deploy markup, css, js without cutting and pasting into the Drupal backend

## What's here

1.	HTML
	* default.html
		- This is the HTML testing template for local development.
		- This is a very rough cannibalization of the DOM elements in energy.gov/maps element.
		- Eventually we may be able to auto merge the JS, DOM, CSS into this using jekyll to create static views of our projects in development.
	* index.html
		- Working index that combines all of the following markup, js, and css files. Find it at [](energyapps.github.com/budget_production)
	* markup.html
		- Markup that would be pasted in the maps content type, i.e. anything that goes within the "map" frame.
2. JS
	* Dependent Libraries
		- highcharts.js
		- leaflet.js
	* Data.js
		- Data for the map in json objects
	* Script
		- script that executes all commands on graphic
3. CSS
	* mapbox.css 
		- preset items for map by mapbox.com
	* style.css
		- custom css to be added to page
	* links to external energy.gov css pages 
		- note these break often
	* master_style.css
		- A static copy of the above as a fallback when the energy.gov links break.

## Ideal work flow

1. Program 