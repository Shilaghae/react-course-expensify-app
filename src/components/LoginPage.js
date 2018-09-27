import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin, isAuthenticated }) => (
  <div>
    <button onClick={startLogin}>Login</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});
const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
