'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return /*#__PURE__*/React.createElement("button", {
      onClick: () => this.setState({
        liked: true
      })
    }, "Like");
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(LikeButton, null), document.getElementById('root'));
