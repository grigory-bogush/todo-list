import React from 'react';

export class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { default: true };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDbClick = this.handleDbClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.editInput = React.createRef();
  }

  /* These methods call App.js methods */
  handleDeleteClick() {
    this.props.onDeleteItem(this.props.item.id);
  }

  handleDbClick(e) {
    e.preventDefault();
    this.setState({ default: false });
  }

  handleSaveClick(e) {
    const value = this.editInput.current.value;
    this.props.onEditItem(this.props.item.id, value);
    this.setState({ default: true });
  }

  handleCancelClick() {
    this.setState({ default: true });
  }

  handleCheckboxClick() {
    this.props.onChangeStatus(this.props.item.id);
  }

  render() {
    let contents;

    // If default render contents, else render input
    if (this.state.default) {
      contents = (
        <li onDoubleClick={this.handleDbClick}>
          <input className='todo-checkbox' type='checkbox' onClick={this.handleCheckboxClick} defaultChecked={this.props.item.status}/>
          {this.props.children}
          <button className='delete-button' type='button' onClick={this.handleDeleteClick}>X</button>
        </li>);
    } else {
      contents = (
        <li>
          <input ref={this.editInput} className='todo-list-input' id='editItemInput' type='text' defaultValue={this.props.children}/>
          <button type='button' onClick={this.handleSaveClick}>Save</button>
          <button type='button' onClick={this.handleCancelClick}>Cancel</button>
        </li>);
    }

    return contents;
  }
}
