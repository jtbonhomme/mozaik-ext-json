var React            = require('react');
var Reflux           = require('reflux');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;

var Data = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState() {
        return {
            data: null
        };
    },

    getApiRequest() {
        return {
            data: this.props.data
        };
    },

    onApiData(data) {
        this.setState({
            data: data
        });
    },

    render() {
        return (
            <div>
                <div className="json__header">
                    {this.props.data.name}
                </div>
                <div className="json__body">
                    {this.props.data.value}
                </div>
            </div>
        );
    }
});

module.exports = Data;