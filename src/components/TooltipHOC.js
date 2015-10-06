import React, {Component} from 'react';
import Tooltip from './Tooltip'

export default ComposedComponent => class extends Component {
  render() {
    const {tooltip, ...otherProps} = this.props
    if (tooltip) {
      const tooltipProps = typeof tooltip === 'string'
        ? {content: tooltip}
        : tooltip

      return <Tooltip {...tooltipProps}>
        <ComposedComponent {...otherProps}/>
      </Tooltip>
    }
    return <ComposedComponent {...otherProps}/>
  }
};
