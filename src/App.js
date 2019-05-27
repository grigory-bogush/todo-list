import React from 'react';
import './App.css';
import { ListItem } from './ListItem'

class App extends React.Component {
  constructor(props) {
    super(props);

    // id for react's key value
    this.state = { list: [], id: 0 };
    this.addItem = this.addItem.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.editItem = this.editItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.changeItemStatus = this.changeItemStatus.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  // Get list and id from storage
  componentWillMount() {
    const todoList = localStorage.todoList !== undefined ? JSON.parse(localStorage.todoList) : [];
    const globalId = localStorage.globalId !== undefined ? JSON.parse(localStorage.globalId) : 0;

    this.setState({
      list: todoList,
      id: globalId
    })
  }

  // Save needed variables to storage
  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentCleanup() {
    localStorage.todoList = JSON.stringify(this.state.list);
    localStorage.globalId = JSON.stringify(this.state.id);
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  /* Change list add, edit value, delete, edit status
     List is always copied */
  addItem(newItem) {
    const newList = this.state.list.slice();
    const newId = this.state.id + 1;
    newList.push(newItem);
    this.setState({
      list: newList,
      id: newId
    });
  }

  editItem(itemId, newVal) {
    const newList = this.state.list.slice();
    const index = newList.findIndex(item => item.id === itemId);

    newList[index] = { id: itemId, value: newVal, status: newList[index].status }
    this.setState({ list: newList });
  }

  removeItem(itemId) {
    const newList = this.state.list.filter(item => item.id !== itemId);
    this.setState({ list: newList });
  }

  changeItemStatus(itemId) {
    const newList = this.state.list.slice();
    const index = newList.findIndex(item => item.id === itemId);
    newList[index] = { id: itemId, value: newList[index].value, status: !newList[index].status }
    this.setState({ list: newList });
  }

  // If user presses Enter add new item to list
  handleButtonPress(e) {
    if (e.which === 13) {
      const val = e.target.value;

      // No blank items allowed!
      if (val === '') { alert('Type in the item first'); return; }
      this.addItem({ id: this.state.id, value: val, status: false });
      e.target.value = '';
    }
  }

  // Convert list to a bucnch of <li>
  ListArrayToList(array) {
    return array.map(item => (<ListItem key={item.id}
      item={item}
      onChangeStatus={this.changeItemStatus}
      onEditItem={this.editItem}
      onDeleteItem={this.removeItem}>{item.value}</ListItem>));
  }

  render() {

    // split the list in two
    const list = this.state.list;
    const notDoneList = list.filter(item => !item.status);
    const doneList = list.filter(item => item.status);

    // Progress bar calculations
    const percentNotDone = Math.floor((notDoneList.length/list.length) * 100);
    const percentDone = Math.floor((doneList.length/list.length) * 100);
    const percentStyle1 = `${percentNotDone}%`;
    const percentStyle2 = `${percentDone}%`;

    return (
      <div>
        <h3>To Do:</h3>
          <div id='todo-progress-1'><div style={{ width: percentStyle1 }}></div></div>
          <div className='todo-div'>
            <ul className='todo-list'>{this.ListArrayToList(notDoneList)}</ul>
            <input className='todo-list-input' type='text' placeholder='Type and hit Enter to add'
                   onKeyPress={this.handleButtonPress} />
          </div>
        <h3>Done:</h3>
          <div id='todo-progress-2'><div style={{ width: percentStyle2 }}></div></div>
          <div className='todo-div'>
            <ul className='todo-list'>{this.ListArrayToList(doneList)}</ul>
          </div>
      </div>
    );
  }
}

export default App;
