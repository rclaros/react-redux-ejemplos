import React from "react";
import { connect } from "react-redux";
import * as clienteActions from "../../redux/actions/clienteActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ClienteList from "./ClienteList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

class ClientesPage extends React.Component {
  state = {
    redirectToAddClientePage: false,
    page_current: 1,
    page_show: 5,
    sortName: undefined,
    sortOrder: undefined
  };

  componentDidMount() {
    const { clientes, actions } = this.props;
    if (clientes.length === 0) {
      actions.getClientes().catch(error => {
        alert("Loading clientes failed" + error);
      });
    }
  }

  handleDeleteCliente = async cliente => {
    toast.success("Cliente deleted");
    try {
      await this.props.actions.deleteCliente(cliente);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  handlePageChange = async page => {
    this.setState({ page_current: page });
    await this.props.actions.getClientes(page);
  };
  handleSortChange = async (sortName, sortOrder) => {
    this.setState({
      page_current: 1,
      sortName: sortName,
      sortOrder: sortOrder
    });
    await this.props.actions.getClientes(
      this.state.page_current,
      sortName,
      sortOrder
    );
  };

  render() {
    console.log("this.props", this.props);
    return (
      <>
        {this.state.redirectToAddClientePage && <Redirect to="/cliente" />}
        <h2>Clientes</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-cliente"
          onClick={() => this.setState({ redirectToAddClientePage: true })}
        >
          Add Cliente
        </button>

        <ClienteList
          onDeleteClick={this.handleDeleteCliente}
          onOrder={this.handleSortChange}
          clientes={this.props.clientes}
          sortName={this.state.sortName}
          sortOrder={this.state.sortOrder}
        />
        <div className="mt-3 text-align:center">
          <Pagination
            activePage={this.state.page_current}
            itemsCountPerPage={this.state.page_show}
            totalItemsCount={this.props.total_cliente}
            onChange={this.handlePageChange}
          />
        </div>
      </>
    );
  }
}

ClientesPage.propTypes = {
  clientes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    clientes: state.clientes.data,
    total_cliente: state.clientes.total,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getClientes: bindActionCreators(
        clienteActions.getClientesData,
        dispatch
      ),
      deleteCliente: bindActionCreators(
        clienteActions.deleteCliente,
       
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientesPage);
