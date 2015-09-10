function RadioGroup() {
	this.items = [];
}

RadioGroup.prototype.add = function(radioItem) {
	if(!(radioItem instanceof RadioItem)) {
		throw "Must contains only Radio tag!";
	}
	this.items.push(radioItem);
};

function RadioItem(opts) {
	_.extend(this, _.pick(opts, 'value', 'title'));
}

RadioItem.prototype.add = function() {
	throw "Radio tag cant' contains children!";
};


exports.createGroup = function(opts) {
	return new RadioGroup(opts);
};

exports.createRadio = function(opts) {
	return new RadioItem(opts);
};