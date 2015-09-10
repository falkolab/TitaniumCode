var selectedValue, defaultValue, cpfx = "falkolab-";
init(arguments[0] || {});

/*
 Usage:
 
//******************
// First define your custom styles (see widget styles for example)

// View usecases:

// Case #1
<Widget id="radioGroup" src="com.falkolab.radiogroup" 
 	items='["male", "female"]' 
 	icon="true" 
 	title="false" 
 	selected="male" />

// Case #2 	
<Widget id="radioGroup" src="com.falkolab.radiogroup" 
 	generator="radioSource" 
 	icon="true" 
 	title="true" 
 	selected="2" />

// Case #3 	(Alloy >= 1.3)
<Alloy module="com.falkolab.radiogroup/tags">
	<Widget id="radioGroup" src="com.falkolab.radiogroup"		
		icon="true" 
		title="true" 
		selected="blackList">				
			<Radio value="blackList" title="L('option1')"/>
			<Radio value="whiteList" title="L('option2')"/>				
	</Widget>
</Alloy>

//******************  
// app/lib/radioSource.js

module.exports = function() {
	return [
		{value: "1", title:"A"},
		{value: "2", title:"B"},
		{value: "3", title:"C"}
	];
};  

//******************
// View controller:  

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

*/
 

function createClasses(element, id) {
	var classes = ['radio-'+element, 'radio-'+element+'-' + id];	
	return _.map(classes, function(cls) {return cpfx+cls;});	
}

function createClassesOn(element, id) {
	return _.map(createClasses(element,id), function(cls) {return cls+'-on';});
}

function init(args) {
	var items,		
		useIcon   = args.icon === 'true' || args.icon === true,
		useTitle  = args.title === 'true' || args.title === true;
	
	if(_.isString(args.classPrefix)) {
		$.removeClass($.widget, cpfx+'radio-container');	
		cpfx = args.classPrefix;	
	}
	$.addClass($.widget, cpfx+'radio-container');

	$.widget.removeAllChildren();	
	
	if(_.isString(args.generator)) {		
		items = require(args.generator)();				
	}
	
	if(_.isUndefined(items) && _.isString(args.items)) {
		items = JSON.parse(args.items);	
	}	
	
	if(_.isUndefined(items) && args.children && args.children.length) {
		items = args.children[0].items||args.children||[];
	}
	
	!_.isArray(items) && (items = []);
	
	items = _.map(items, function(v) {
		return _.isObject(v)? v: {value: v};
	});

	for(var i=0,l=items.length; i<l; i++){			
		var id = items[i].value,
			title =	items[i].title || "";
			
		if(!_.isString(id)) {
			Ti.API.warn("'value' property of item must be string!");
			id = _.isObject(id) && _.isFunction(id.toString)? id.toString() : id + "";
		}			
	  	
	  	var radio = $.UI.create('View', { classes: cpfx+'radio-item', dataId: id });
	  	  		
  		useIcon  && radio.add( $.UI.create('ImageView', { classes: createClasses('icon', id), autoStyle: true}) );
  		
	  	if(useTitle) {
	  		var opts = { classes: createClasses('label', id), autoStyle: true};
	  		!_.isUndefined(title) && _.extend(opts, {text:title});
	  		
	  	 	radio.add( $.UI.create('Label', opts));			  	 	
	  	 }
	  	$.widget.add(radio);		  	
	};
	
	setValue((_.isUndefined(args.selected) ? (items.length && items[0].value): args.selected), true);	
	
	defaultValue = selectedValue;	
	
	$.widget.applyProperties(_.omit(args, "icon", "title", "value", "children", "id"));	
};

function toggleRadio(evt) {	
	$.value = evt.source.dataId;
}

/**
 * Property for set or get current value
 */
Object.defineProperty($, "value", {
    set : setValue,
    get : getValue
});

/**
 * Get selected item value
 * @return {String} result Selected item value
 */
function getValue() {
	return selectedValue || null;
};

/**
 * Set selected item value
 * @param {String} value
 * @param {Boolean} silent When true widget will not trigger 'changed' event
 */
function setValue(value, silent) {
	if(selectedValue == value) return;
	
	var view;
	if(!(_.isUndefined(selectedValue) || _.isNull(selectedValue))) {		
		view = _.findWhere($.widget.children, {dataId: selectedValue});
		if(view) {
			$.removeClass(view.children[0], createClassesOn('icon', selectedValue));
			view.children.length>1 && $.removeClass(view.children[1], createClassesOn('label', selectedValue));
		} 		
	}
	
	if(!(_.isUndefined(value) || _.isNull(value))) {
		view = _.findWhere($.widget.children, {dataId: value});		
		if(view) {
			$.addClass(view.children[0], createClassesOn('icon', value));
			view.children.length>1 && $.addClass(view.children[1], createClassesOn('label', value));
		} 		
	}
	
	view = null;	
	
	var old = selectedValue;
	selectedValue = value;
	!silent && $.trigger('changed', {oldValue:old, newValue: selectedValue});	
};

/**
 * Reset widget to initial state
 * @param {Boolean} silent Silently reset widget state by default
 */
function reset(silent) {
	!_.isUndefined(defaultValue) && setValue(defaultValue, _.isUndefined(silent)?true:silent);
};

exports.setValue = setValue;
exports.getValue = getValue;
exports.init = init;
exports.reset = reset; 

/**
 * Cleanup (destructor)
 */
exports.cleanup = function() {
	this.off();
};
