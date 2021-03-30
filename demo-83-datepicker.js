import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {Container, Header, Content, Button, Text} from 'native-base';

export default class DatePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date()}

    this.setDate = this.setDate.bind(this);
  }

  setDate(date){
    this.setState({chosenDate: date})
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <DatePicker
            date={this.state.chosenDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            //minDate="01-01-2016"
            //maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {this.setDate(date)}}
          />
          <Text>{this.state.chosenDate.toString()}</Text>
        </Content>
      </Container>
    );
  }
}