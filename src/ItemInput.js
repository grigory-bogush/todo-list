import React from 'react';

export class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  // If user presses Enter add new item to list
  handleButtonPress(e) {
    if (e.which === 13) {
      const val = e.target.value;

      // No blank items allowed!
      if (val === '') { alert('Type in the item first'); return; }
      this.props.onAddItem({ id: this.props.id, value: val, status: false });
      e.target.value = '';
    }
  }

  render() {
    return (<input className='todo-list-input' type='text'
                   placeholder='Type and hit Enter to add'
                   onKeyPress={this.handleButtonPress} />);
  }
}
