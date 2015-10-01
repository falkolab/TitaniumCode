# Radio group Widget
![screenshot1](screenshot1.png?raw=true "Example screenshot")

## Quick Start

### Get it 
[![gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/com.falkolab.radiogroup)

<a href='https://pledgie.com/campaigns/30287'><img alt='Click here to lend your support to: com.falkolab.radiogroup and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/30287.png?skin_name=chrome' border='0' ></a>

Download this repository and consult the [Alloy Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets) on how to install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install com.falkolab.radiogroup`

## Usage

### Properties
* `useIcon` _(Boolean)_ - Render item icon
* `useTitle` _(Boolean)_ - Render item title
* `classesPrefix` _(String)_ - Your custom prefix for widget classes
* `disable` _(Boolean)_ - Initial disabled state
* `itemController` _(String)_ - Custom item controller (see widget_root/controllers/items as starting point)

**Source for items:**

* `items` _(Array)_ - Array of radiogroup items with keys: `value`, `title` (optional), `controller` (optional)
* or `generator` _(String)_ - Commonjs module as items generator
* or `children` _(Array)_ - Custom tags (see widget_root/lib/tags and example below)
 

First define your custom styles (see widget styles for example).

### Use cases:

#### Example #1 - inline data source

	<Widget id="radioGroup" src="com.falkolab.radiogroup" 
 		items='["male", "female"]' 
	 	icon="true" 
 		title="false" 
	 	selected="male" />

#### Example #2 - external data source

	<Widget id="radioGroup" src="com.falkolab.radiogroup" 
 		generator="radioSource" 
	 	icon="true" 
 		title="true" 
	 	selected="2" />

Define your custom commonjs library at `app/lib/radioSource.js`:

	module.exports = function() {
		return [
			{value: "1", title:"A"},
			{value: "2", title:"B"},
			{value: "3", title:"C"}
		];
	}; 	 	


#### Example #3	(Alloy >= 1.3) - child tags

	<Alloy module="com.falkolab.radiogroup/tags">
		<Widget id="radioGroup" src="com.falkolab.radiogroup"		
			icon="true" 
			title="true" 
			selected="blackList">			
				<Radio value="blackList" title="L('option1')"/>
				<Radio value="whiteList" title="L('option2')"/>				
		</Widget>
	</Alloy>

 

#### Controller code example
View controller:  

	$.radioGroup.on('changed', function(evt) {
		Ti.API.info("'changed' event", JSON.stringify(evt));
		Ti.API.info("Selected value", this.getValue());
		_.delay(function(widgetCtrl) {
			Ti.API.info('Reset to default after 2 sec');
			widgetCtrl.reset();
		}, 2000, this);
	});

	exports.cleanup = function() {
		$.radioGroup.cleanup();
	};
	
Give me a star if the widget was useful for you or

<a href='https://pledgie.com/campaigns/30287'><img alt='Click here to lend your support to: com.falkolab.radiogroup and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/30287.png?skin_name=chrome' border='0' ></a>
