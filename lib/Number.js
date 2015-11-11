/**
 * Created by steve on 15/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Number = React.createClass({
    displayName: 'Number',

    onChange: function onChange(e) {
        console.log('name = ', e.target.name);
        console.log('value = ', e.target.value);
        this.props.onChange(this.props.form.key, e.target.value);
    },

    componentDidMount: function componentDidMount() {
        // update parent model
        var value = this.defaultValue();
        if (value) {
            this.props.onChange(this.props.form.key, this.defaultValue());
        }
    },

    defaultValue: function defaultValue() {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        var value = utils.selectOrSet(this.props.form.key, this.props.model);
        //console.log('value', value);

        // check if there is a default value
        if (!value && this.props.form['default']) {
            value = this.props.form['default'];
        }
        //console.log('value', value);

        if (!value && this.props.form.schema && this.props.form.schema['default']) {
            value = this.props.form.schema['default'];
        }
        //this.props.onChange(this.props.form.key, value);
        return value;
    },

    render: function render() {
        var value = this.defaultValue();
        var formClasses = classNames('form-group', this.props.form.htmlClass);
        var labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        var fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);

        return React.createElement(
            'div',
            { className: formClasses },
            React.createElement(
                'label',
                { className: labelClasses },
                this.props.form.title
            ),
            React.createElement('input', { type: this.props.form.type,
                onChange: this.onChange,
                step: this.props.form.step,
                className: fieldClasses,
                defaultValue: value,
                id: this.props.form.key.slice(-1)[0],
                name: this.props.form.key.slice(-1)[0] })
        );
    }
});

module.exports = Number;