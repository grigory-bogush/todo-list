import React from 'react';

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.listToJSX = this.listToJSX.bind(this);
  }

  // Convert list to a bucnch of <li>
  listToJSX(array) {
    return array.map(item => this.props.itemBuilder(item));
  }

  render() {
    return <ul className='todo-list'>{this.listToJSX(this.props.list)}</ul>;
  }
}
