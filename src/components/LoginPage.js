import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin, isAuthenticated }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It\'s time to get your expenses under control</p>
      <button  className="login_button-layout" onClick={startLogin}>Login With Google</button>
    </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});
const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
