var args = arguments[0] || {};

var id = args.item.value,
    title = args.item.title || "",
    isDisabled,
    isSelected;

if (!_.isString(id)) {
	Ti.API.warn("'value' property of item must be string!");
	id = _.isObject(id) && _.isFunction(id.toString) ? id.toString() : id + "";
}

$.addClass($.item, args.classesPrefix + 'item');

$.icon && $.addClass($.icon, createClasses('icon', id));
$.label && $.addClass($.label, createClasses('label', id), {
	text : title
});

function toggleRadio(evt) {
	$.trigger('toggle', {
		value : id
	});
}

exports.cleanup = function() {
	$.off();
};

exports.setDisabled = function(value) {
	var fn = value ? $.addClass : $.removeClass;
	this.icon && fn(this.icon, createClassesDisabled('icon', id, !!isSelected));
	this.label && fn(this.label, createClassesDisabled('label', id, !!isSelected));
	fn = null;
	isDisabled = value;
};

exports.setSelected = function(value) {
	var fn = value ? this.addClass : this.removeClass;
	this.icon && fn(this.icon, createClassesOn('icon', id));
	this.label && fn(this.label, createClassesOn('label', id));
	fn = null;
	isSelected = value;
};

function createClasses(element, id) {
	var classes = [element, element + '-' + id];
	return _.map(classes, function(cls) {
		return args.classesPrefix + cls;
	});
}

function createClassesOn(element, id) {
	return _.map(createClasses(element, id), function(cls) {
		return cls + '-on';
	});
}

function createClassesDisabled(element, id, selected) {
	var fn = selected ? createClassesOn : createClasses;
	return _.map(fn(element, id), function(cls) {
		return cls + '-disabled';
	});
}