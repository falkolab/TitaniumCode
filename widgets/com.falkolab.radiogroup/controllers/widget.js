var selectedValue,
    defaultValue,
    isDisabled = false,
    itemControllers = [],
    items,
    cpfx = "falkolab-radio-";

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

function init(args) {
	var itemArgs = {
		useIcon : args.icon === 'true' || args.icon === true,
		useTitle : args.title === 'true' || args.title === true,
		isDisabled : args.disable === 'true' || args.disable === true
	};

	if (args.classPrefix) {
		Ti.API.warn("Option classPrefix is deprecated use classesPrefix instad");
	}

	// classes prefix
	var newPrefix = args.classPrefix || args.classesPrefix;
	if (_.isString(newPrefix) && newPrefix !== cpfx) {
		$.removeClass($.widget, cpfx + 'container');
		cpfx = newPrefix;
	}
	$.addClass($.widget, cpfx + 'container');
	itemArgs.classesPrefix = cpfx;

	cleanupItems();

	if (_.isString(args.generator)) {
		items = require(args.generator)();
	}

	if (_.isUndefined(items) && _.isString(args.items)) {
		items = JSON.parse(args.items);
	}

	if (_.isUndefined(items) && args.children && args.children.length) {
		items = args.children[0].items || args.children || [];
	}

	!_.isArray(items) && ( items = []);

	items = _.map(items, function(v) {
		return _.isObject(v) ? v : {
			value : v
		};
	});

	for (var i = 0,
	    l = items.length; i < l; i++) {
		var ctrl,
		    ctrlArgs = _.extend(_.clone(itemArgs), {
			item : items[i]
		});

		if (_.isString(args.itemController)) {
			ctrl = Alloy.createController(args.itemController, ctrlArgs);
		} else {
			ctrl = Widget.createController('item', ctrlArgs);
		}

		$.widget.add(ctrl.getView());
		itemControllers.push(ctrl);
		ctrl.on('toggle', toggleRadio);
		ctrl = null;
		ctrlArgs = null;
	};

	setValue((_.isUndefined(args.selected) ? (items.length && items[0].value) : args.selected), true);

	defaultValue = selectedValue;

	setDisable(isDisabled);

	$.widget.applyProperties(_.omit(args, "icon", "title", "value", "children", "id"));
};

function cleanupItems() {
	for (var i = 0,
	    l = itemControllers.length; i < l; i++) {
		var ctrl = itemControllers[i];
		ctrl.off('toggle', toggleRadio);
		_.isFunction(ctrl.cleanup) && ctrl.cleanup();
		ctrl = null;
	}
	itemControllers.length = 0;
	$.widget.removeAllChildren();
	items = null;
}

function toggleRadio(evt) {
	if (isDisabled)
		return;
	$.value = evt.value;
}

/**
 * Property for manage current value
 */
Object.defineProperty($, "value", {
	set : setValue,
	get : getValue
});

/**
 * Property for manage disabled state
 */
Object.defineProperty($, "disable", {
	set : setDisable,
	get : getDisable
});

/**
 * Get selected item value
 * @return {String} Selected item value
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
	if (selectedValue == value)
		return;

	for (var i = 0,
	    l = items.length; i < l; i++) {
		var isSelected = items[i].value == value;
		itemControllers[i].setSelected(isSelected);
		if (isSelected) {
			var old = selectedValue;
			selectedValue = value;
			!silent && $.trigger('changed', {
				oldValue : old,
				newValue : selectedValue
			});
		}
	}
	selectedValue = value;
};

/**
 * Get disabled state value
 * @return {Boolean} disabled state
 */
function getDisable() {
	return isDisabled;
}

function setDisable(value) {
	for (var i = 0,
	    l = items.length; i < l; i++) {
		itemControllers[i].setDisabled(!!value);
	}
	isDisabled = !!value;
}

/**
 * Reset widget to initial state
 * @param {Boolean} silent Silently reset widget state by default
 */
function reset(silent) {
	!_.isUndefined(defaultValue) && setValue(defaultValue, _.isUndefined(silent) ? true : silent);
};

exports.setValue = setValue;
exports.getValue = getValue;
exports.setDisable = setDisable;
exports.getDisable = getDisable;
exports.init = init;
exports.reset = reset;

/**
 * Cleanup (destructor)
 */
exports.cleanup = function() {
	cleanupItems();
	this.off();
};
