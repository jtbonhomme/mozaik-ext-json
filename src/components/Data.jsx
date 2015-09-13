var React            = require('react');
var Reflux           = require('reflux');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;

export default React.createClass({
    displayName: 'Data',

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
          id: 'json.data',
          params: {
            url: this.props.url
          }
        };
    },

    onApiData(data) {
        this.setState({
            data: data
        });
    },

    render() {
        var jsonName = "unknown", jsonValue = "unknown";
        if (this.state.data) {
            if (this.state.data.name){
                jsonName = this.state.data.name;
            }
            if (this.state.data.value){
                jsonValue = this.state.data.value;
            }
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{jsonName}</span>
                    <i className="fa fa-table" />
                </div>
                <div className="widget__body">
                    {jsonValue}
                </div>
            </div>
        );
    }
});