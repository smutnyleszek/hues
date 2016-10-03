import CurrentColorStore from '../stores/currentColor';
import React from 'react';

const CurrentColor = React.createClass({
    getInitialState() {
        return CurrentColorStore.getState();
    },

    componentDidMount() {
        CurrentColorStore.listen(this.onChange);
    },

    componentWillUnmount() {
        CurrentColorStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    displayName: 'current-color',

    render() {
        return React.createElement(
            'div',
            {},
            'Current color: ' + this.state.colorValue
        );
    }
});

export default CurrentColor;
