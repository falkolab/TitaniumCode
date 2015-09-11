# Radio group Widget
![screenshot1](screenshot1.png?raw=true "Example screenshot")

## Quick Start

### Get it 
[![gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/com.falkolab.radiogroup)

Download this repository and consult the [Alloy Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets) on how to install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install com.falkolab.radiogroup`

## Usage

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
	
Give me a star if the widget was useful for you.
