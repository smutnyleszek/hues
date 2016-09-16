import ColorStore from '../stores/myStore';
import React from 'react';

const CurrentColor = React.createClass({
    getInitialState() {
        return ColorStore.getState();
    },

    componentDidMount() {
        ColorStore.listen(this.onChange);
    },

    componentWillUnmount() {
        ColorStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    displayName: 'current-color',
    render() {
        return React.createElement(
            'div',
            {},
            'Current color:' + this.state.currentColor
        );
    }
});

export default CurrentColor;
