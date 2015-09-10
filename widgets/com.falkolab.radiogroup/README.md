# Radio group Widget
![screenshot1](screenshot1.png?raw=true "Example screenshot")

## Usage

First define your custom styles (see widget styles for example).

### View use cases:

#### Example #1

	<Widget id="radioGroup" src="com.falkolab.radiogroup" 
 		items='["male", "female"]' 
	 	icon="true" 
 		title="false" 
	 	selected="male" />

#### Example #2 	

	<Widget id="radioGroup" src="com.falkolab.radiogroup" 
 		generator="radioSource" 
	 	icon="true" 
 		title="true" 
	 	selected="2" />

Item source (commonjs library):
app/lib/radioSource.js

	module.exports = function() {
		return [
			{value: "1", title:"A"},
			{value: "2", title:"B"},
			{value: "3", title:"C"}
		];
	}; 	 	


#### Example #3	(Alloy >= 1.3)

	<Alloy module="com.falkolab.radiogroup/tags">
		<Widget id="radioGroup" src="com.falkolab.radiogroup"		
			icon="true" 
			title="true" 
			selected="blackList">			
				<Radio value="blackList" title="L('option1')"/>
				<Radio value="whiteList" title="L('option2')"/>				
		</Widget>
	</Alloy>

 

#### Any cases
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
	
Give me the star if widget was usefull for you.
