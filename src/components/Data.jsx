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
            this.props.data;
        };
    },

    onApiData(view) {
        this.setState({
            data: data
        });
    },

    render() {
        return (
            <div>
                <div className="widget__header">
                    {this.props.data.name}
                </div>
                <div className="widget__body">
                    {this.props.data.value}
                </div>
            </div>
        );
    }
});

module.exports = Data;