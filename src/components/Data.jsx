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
            title: null,
            value: null,
            unit: null,
            alter: null
        };
    },

    getApiRequest() {
        return {
          id: 'json.data',
          params: {
            title: this.props.title,
            value: this.props.value,
            unit: this.props.unit,
            alter: this.props.alter
          }
        };
    },

    findProp(obj, prop, defval){
        if (typeof defval == 'undefined') defval = null;
        prop = prop.split('.');
        for (var i = 0; i < prop.length; i++) {
            if(typeof obj[prop[i]] == 'undefined')
                return defval;
            obj = obj[prop[i]];
        }
        return obj;
    },

    onApiData(data) {
        // Filter if defined
        if (this.props.alter || true) {
          var alter = eval("(" + this.props.alter + ")");
          data = alter(data);
        }
        this.setState({
            title: this.findProp(data, this.props.title),
            value: this.findProp(data, this.props.value),
            unit: this.findProp(data, this.props.unit)
        });
    },

    render() {
        var title = "unknown", value = "unknown", unit = null;
        if (this.state.title){
            title = this.state.title;
        }
        if (this.state.value){
            value = this.state.value;
        }
        if (this.state.unit){
            unit = this.state.unit;
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">
                        {title}
                    </span>
                    <i className="fa fa-table" />
                </div>
                <div className="json__value">
                    <span>
                        {value} {unit}
                    </span>
                </div>
            </div>
        );
    }
});