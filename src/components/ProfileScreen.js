
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
import '../styles/User.css';

import Account from './Account.js'
import ImageUpload from './ImageUpload.js'
import CardUpload from './CardUpload.js'

import Modal from 'react-modal';

import editlogo from '../images/edit-logo.svg';
import newlogo from '../images/newbutton.svg';
import { profileStyle } from '../styles/style.js'

import axios from 'axios';

class ProfileScreen extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        user: props.userData.user,
        cards: props.userData.cards,
        profileModalIsOpen: false, 
        imageModalIsOpen: false,   
        cardModalIsOpen: false
      }

      this.openProfileModal = this.openProfileModal.bind(this)
      this.closeProfileModal = this.closeProfileModal.bind(this)

      this.openImageModal = this.openImageModal.bind(this)
      this.closeImageModal = this.closeImageModal.bind(this)
    }

    componentDidMount() {
      Modal.setAppElement('body');
    }

    openProfileModal() {
      this.setState({ profileModalIsOpen: true });
    }

    closeProfileModal() {
      this.setState({ profileModalIsOpen: false });
    }

    openImageModal() {
      this.setState({ imageModalIsOpen: true })
    }

    closeImageModal() {
      this.setState({ imageModalIsOpen: false })
    }

    removeCard(id) {
      console.log("Removing card with ID: " + id)
      var deleteRoute = 'http://127.0.0.1:5000/post/' + id

      const bearer = 'Bearer ' + localStorage.getItem("accessToken")

      var header = {
          "Access-Control-Allow-Origin": 'X-Requested-With,content-type',
          "Authorization": bearer
      }

      axios.delete(deleteRoute, { headers: header })
      .then(res => {
        console.log(res)
        console.log('done')
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    }
    
    render() {
      const { user, cards } = this.state;
      const baseUrl = 'http://127.0.0.1:5000'
  
      return (
  
        <div className="container-fluid">
  
          <div className="row text-align-center justify-content-center">
            <div className="col-12">
              <div className="row m-profile-info col-lg-6 col-md-10 col-sm-* col-xs-*">
                <a onClick={this.openImageModal} className="m-profile-left">
                  <img className="rounded-circle m-profile-avatar" src={baseUrl + "/static/ProfileImage/" + user.profile_image} alt="" />     
                </a>
                  <Modal
                    isOpen={this.state.imageModalIsOpen}
                    onRequestClose={this.closeImageModal}
                    contentLabel="Avatar"
                    style={profileStyle}
                  >

                    <ImageUpload />

                  </Modal>
                <div className="m-profile-right">
                  <t className="m-profile-name">{user.name}</t>

                  <a>
                    <a onClick={this.openProfileModal}>
                      <img src={editlogo} width="20" height="20" style={{marginLeft: "10px", marginBottom:"10px"}} alt=""/>               
                    </a>
                    <Modal
                      isOpen={this.state.profileModalIsOpen}
                      onRequestClose={this.closeProfileModal}
                      contentLabel="Profile"
                      style={profileStyle}
                    >
                      <Account profileData={this.state.user} />
                    </Modal>
                  </a>

                  <a>
                    <a href="/new">
                      <img src={newlogo} width="20" height="20" style={{float: "right", marginTop: "10px", marginBottom:"10px"}} alt=""/>               
                    </a>
                  </a>

                  <t className="m-profile-username">@{user.username} has {cards.length} books.</t>
                  <t className="m-profile-desc">{user.bio}</t>                           
                </div>
              </div>
              <div className="m-profile-filter" style={{marginBottom: '20px'}}>
                {/* <button className="btn m-profile-button" type="submit">{cards.length} Books</button>
                <button className="btn m-profile-button" type="submit">10 Following</button>
                <button className="btn m-profile-button" type="submit">88 Followers</button> */}
              </div> 
            </div>
  
            <div className="m-profile-card-container col-lg-6 col-md-10 col-sm-* col-xs-*">           
              {cards.map(function (card, i) { // map function with server data
                return (
                  <div className="m-profile-whole-card-cover rounded" key={i}>
                    <img className="card-img-top m-profile-card-cover rounded" src={baseUrl + "/static/CardPicture/" + card.picture} alt="" />
                    <p className="m-profile-card-text">{card.title}</p>
                    <a onClick={() => this.removeCard(card.id)}>
                      <img className="m-remove-logo" src={newlogo} alt=""/>
                    </a>
                  </div>
                )
              }.bind(this))}
            </div>
          </div>
        </div>
      );
    }
  }

export default ProfileScreen;