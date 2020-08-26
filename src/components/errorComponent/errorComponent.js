import React, {Component} from 'react';
import {popularMoviesError} from '../../actions/actions';
import {connect} from 'react-redux';
import WithMoviesService from '../hoc/withMoviesService';

class ErrorBoundry extends Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
    //   static getDerivedStateFromError(error) {
    //     // Update state so the next render will show the fallback UI.
    //     return { hasError: true };
    //   }
    
      componentDidCatch() {
        // You can also log the error to an error reporting service
        this.setState({
            hasError: true
        })
      }
    
      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
      }
    
}

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = {
    popularMoviesError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);
