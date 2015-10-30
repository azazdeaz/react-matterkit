import React, {Component} from 'react';
import Tooltip from './Tooltip'

export default ComposedComponent => class extends Component {
  render() {
    if (this.props.tooltip) {
      const {tooltip, ...otherProps} = this.props
      const tooltipProps = typeof tooltip === 'string'
        ? {content: tooltip}
        : tooltip

      return <Tooltip {...tooltipProps}>
        <ComposedComponent {...otherProps}/>
      </Tooltip>
    }
    else {
      return <ComposedComponent {...this.props}/>
    }
  }
};
