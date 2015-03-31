var React = require("react");

var CodeMirrorEditor = require("./code-mirror-editor.jsx");
var ComponentPreview = require("./live-compile.jsx");
var {Panel} = require("../../../../../");

var ReactPlayground = React.createClass({
  propTypes: {
    codeText: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      code: this.props.codeText
    };
  },

  handleCodeChange: function(code) {
    this.setState({ code });
  },

  render: function() {
    return <div style={{display:'flex', padding: 14}} className="playground">
      <Panel style={{flex:'1'}}  className="playgroundCode">
        <CodeMirrorEditor key="jsx"
                          onChange={this.handleCodeChange}
                          className="playgroundStage"
                          codeText={this.state.code} />
      </Panel>
      <div
      style={{
          flex:'1',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} 
        className="playgroundPreview">
        <ComponentPreview code={this.state.code} />
      </div>
    </div>;
  },
});

module.exports = ReactPlayground;
