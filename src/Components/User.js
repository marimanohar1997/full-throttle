import React from 'react'
import UserList from '../UserList.json'
import { Card,Modal,Container,Row,Col } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import Loader from 'react-loader-spinner'



class User extends React.Component{
    constructor(props){
        super(props);
        this.handlechange = this.handlechange.bind(this)
        this.state = {
          list: UserList,
          isLoading: true,
          times: '',
          date: new Date()
        }
    }

    handlechange(e){
      this.setState({
        times: e,
      })
    }


    datechange(e){
      this.setState({
        date: e
      })
    }

    componentDidMount() {
      this.setState({isLoading: false})
  }

    renderTableData() {
      return this.state.list.members && this.state.list.members.map((member_list,index) => {
       return (
          <div className="container" key={member_list}>
            <div class="w3-container w3-center w3-animate-left" style={{animationDelay: "1s"}}>

            <Card className="text-center" >
                  <Card.Header >{member_list.id}</Card.Header>
              <Card.Body>
                  <Card.Title  >{member_list.tz}</Card.Title>
                <Card.Text>
                  {member_list.real_name}
                </Card.Text>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={(e) => this.handlechange(member_list)}>
                  View User Activity Periods
              </button>
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{this.state.times.real_name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <p className="p-title">Start Time</p>
                  <p className="p-title-right">End Time</p>
                  <div className="modal-body">
                      {this.state.times && this.state.times.activity_periods.map((list1,) => 
                      <div>
                        <Modal.Body className="show-grid">
                          <Container>
                            <Row>
                              <Col xs={12} md={6}>
                                <DateTimePicker value={new Date(list1.start_time)} onchange={(e) => this.datechange()}/> 
                              </Col>
                              <Col xs={12} md={6}>
                              <DateTimePicker value={new Date(list1.end_time)} /> 
                              </Col>
                            </Row>
                          </Container>
                        </Modal.Body>
                      </div>
                      )}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
              </Card.Body>
            </Card>
            </div>
            <br />
            </div>
        )
      })
   }

    render(){
        return(
          this.state.isLoading ? 
          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} /> : 
          <div className="w3-container w3-center w3-animate-top">
              <h3 className="title-print"> User List </h3>
                {this.renderTableData()}
            </div>
            
        );
    }
}


export default User;