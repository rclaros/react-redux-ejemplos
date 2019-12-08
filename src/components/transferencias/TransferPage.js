import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TransferPage(props) {
    return (
      <div className="jumbotron">
        <h2>Nueva Transferencia</h2>
        <p>Aqui podras realizar tus tranferencias bancarias.</p>
        <Link to="about" className="btn btn-primary">Registrar</Link>
        <Link to="about" className="btn btn-primary">Cancelar</Link>
     

            <div className="control-buttons">
    <button className="edit"
    onClick={() => this.props.dispatch({ type: 'EDIT_POST', id: this.props.post.id })
    }
    >Edit</button>
    <button className="delete"
    onClick={() => this.props.dispatch({ type: 'DELETE_POST', id: this.props.post.id })}
    >Delete</button>
  </div>

      


<br /><br />
<br /><br />
<form className="form" ></form>
</div>



    );
  }

  
  
export default TransferPage;

