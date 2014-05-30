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
	* Dependent Libraries (These already are added automatically into the maps content type through the dropdown menu)
		- highcharts.js
		- leaflet.js
	* Data.js
		- Data for the map in json objects. This would be added to the maps content type.
	* Script
		- script that executes all commands on graphic. This would be added to the maps content type.
3. CSS
	* mapbox.css 
		- preset items for map by mapbox.com
	* style.css
		- custom css to be added to map. CSS that would be added to the maps content type.
	* links to external, master energy.gov css styles
		- note these break often
	* master_style.css
		- A static copy of the above as a fallback when the energy.gov links break.

## Needs/Ideal Work flow

Dan: Create jekyll installation that allows markup, js, and css to be merged into default.html. This will allow markup, js, and css to be housed seperately and cleanly.

Phase II: Create a workflow that allows more clean deployment of Markup, JS, and CSS into a new/existing maps content type instance.

## Notes

We may also consider renaming the the "maps" section something else, like graphics, data visualizations, etc.

