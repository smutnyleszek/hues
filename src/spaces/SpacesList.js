import HuesAppStore from '../flux/huesAppStore';
import React from 'react';
import Space from './Space';

class SpacesList extends React.Component {
    constructor() {
        super();
        this.state = HuesAppStore.getState();
    }

    componentDidMount() {
        HuesAppStore.listen(this.onHuesAppStoreChange.bind(this));
    }

    componentWillUnmount() {
        HuesAppStore.unlisten(this.onHuesAppStoreChange.bind(this));
    }

    onHuesAppStoreChange(currentColor) {
        // NOTE: setState is asynchronous, so if you need access for current
        // state, do it in componentDidUpdate
        this.setState(currentColor);
    }

    componentDidUpdate() {
        console.debug('state changed:', this.state);
    }

    createSpace(spaceName) {
        return React.createElement(Space, {
            name: spaceName,
            state: this.state
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            this.createSpace('rgb'),
            this.createSpace('hex'),
            this.createSpace('hsl'),
            this.createSpace('hwb')
        );
    }
}

export default SpacesList;
