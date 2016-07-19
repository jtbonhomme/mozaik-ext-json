import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';

//export default React.createClass(

class Data extends Component {
    constructor(props) {
        super(props);

        this.state = { title: null, value: null, unit: null, alter: null };
    }

    getInitialState() {
        return {
            title: null,
            value: null,
            unit: null,
            alter: null
        };
    }

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
    }

    findProp(obj, prop, defval){
        if (typeof defval === 'undefined') defval = null;
        if (typeof prop !== 'undefined' && prop && prop.match(/\$\{.*\}/)) {
            // ${key.prop.value} -> key.prop.value
            prop = prop.split('${')[1].split('}')[0]
            // key.prop.value -> [key, prop, value]
            prop = prop.split('.');
            for (var i = 0; i < prop.length; i++) {
                if(typeof obj[prop[i]] == 'undefined')
                    return defval;
                obj = obj[prop[i]];
            }
            return obj;
        }
        else {
            return prop;
        }
    }

    onApiData(data) {
        // Filter if defined
        if (this.props.alter) {
          var alter = eval("(" + this.props.alter + ")");
          data = alter(data);
        }
        this.setState({
            title: this.findProp(data, this.props.title),
            value: this.findProp(data, this.props.value),
            unit: this.findProp(data, this.props.unit)
        });
    }

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
}

Data.displayName = 'Data';

Data.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number,
    unit:  PropTypes.string
};

Data.defaultProps = {
    title: 'Mozaïk JSON widget',
    value: 0,
    unit:  ''
};

reactMixin(Data.prototype, ListenerMixin);
reactMixin(Data.prototype, Mozaik.Mixin.ApiConsumer);

export { Data as default };
