import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableIcon from 'react-icons/lib/fa/table'

import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

import './Data.css';

class Data extends Component {
    static getApiRequest(props) {
        return {
          id: `json.data.${props.title}`,
          params: {
            dataPath: props.dataPath,
            path: props.path,
            title: props.title,
            unit: props.unit,
            url: props.url,
            value: props.value,
          }
        };
    }

    render() {
        const {title, unit} = this.props;
        const value = _.get(this.props, 'apiData.value');

        return (
            <Widget>
                <WidgetHeader title={title} icon={TableIcon} />
                <WidgetBody>
                    <div className="json__value">
                        <span>
                            {value} {unit}
                        </span>
                    </div>
                </WidgetBody>
            </Widget>
        );
    }
}

Data.displayName = 'Data';

Data.propTypes = {
    dataPath: PropTypes.string.isRequired,
    path:  PropTypes.string,
    title: PropTypes.string.isRequired,
    unit:  PropTypes.string,
    url:   PropTypes.string,
    value: PropTypes.string,
};

Data.defaultProps = {
    dataPath: '*',
    title: 'Mozaïk JSON Widget',
    value: 0,
    unit:  ''
};

export default Data;
