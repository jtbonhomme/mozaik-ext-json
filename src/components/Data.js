import React, { Component, PropTypes } from 'react';
import TableIcon                       from 'react-icons/lib/fa/table'

import { TrapApiError, Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

import './Data.css';

class Data extends Component {
    static getApiRequest(props) {
        return {
          id: 'json.data',
          params: {
            title: props.title,
            value: props.value,
            unit: props.unit,
            alter: props.alter
          }
        };
    }

    render() {
        const {title, unit, value} = this.props;

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
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    unit:  PropTypes.string
};

Data.defaultProps = {
    title: 'Mozaïk JSON widget',
    value: 0,
    unit:  ''
};

export default Data;
