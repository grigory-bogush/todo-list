import React from 'react';
import { ListItem } from './ListItem';

export class List extends React.Component {

  // Convert list to a bucnch of <li>
  ListArrayToList(array) {
    return array.map(item => (<ListItem key={item.id}
                                        item={item}                          
                                        onEditItem={this.props.onEditItem}
                                        onChangeStatus={this.props.onChangeStatus}
                                        onDeleteItem={this.props.onDeleteItem}>
                                        {item.value}
                                        </ListItem>));
  }

  render() {
    return <ul className='todo-list'>{this.ListArrayToList(this.props.list)}</ul>;
  }
}
