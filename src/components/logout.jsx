import { Component } from 'react';
import { toast } from "react-toastify";
import auth from '../services/authService';

class Logout extends Component {
    componentDidMount() {
        auth.logout();
        window.location = '/';
        toast.error("Logout");
    }
    render() { 
        return null;
    }
}
 
export default Logout;