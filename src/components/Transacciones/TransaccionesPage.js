import React from "react";
import { connect } from "react-redux";
import * as transaccionesActions from "../../redux/actions/transaccionesActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import TransaccionesList from "./TransaccionesList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

class TransaccionesPage extends React.Component {
  state = {
    redirectToAddTransaccionesPage: false,
    page_current: 1,
    page_show: 5,
    sortName: undefined,
    sortOrder: undefined
  };

  componentDidMount() {
    const { transacciones, actions } = this.props;
    if (transacciones.length === 0) {
      actions.getTransacciones().catch(error => {
        alert("Loading transacciones failed" + error);
      });
    }
  }

  handleDeleteTransacciones = async Transacciones => {
    toast.success("Transaccion deleted");
    try {
      await this.props.actions.deleteTransacciones(Transacciones);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  handlePageChange = async page => {
    this.setState({ page_current: page });
    await this.props.actions.getTransacciones(page);
  };
  handleSortChange = async (sortName, sortOrder) => {
    this.setState({
      page_current: 1,
      sortName: sortName,
      sortOrder: sortOrder
    });
    await this.props.actions.getTransacciones(
      this.state.page_current,
      sortName,
      sortOrder
    );
  };

  render() {
    console.log("this.props", this.props);
    return (
      <>
        {this.state.redirectToAddTransaccionesPage && <Redirect to="/Transacciones" />}
        <h2>Transacciones</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-transaccion"
          onClick={() => this.setState({ redirectToAddTransaccionesPage: true })}
        >
          Add transaccion
        </button>

        <ClienteList
          onDeleteClick={this.handleDeleteTransacciones}
          onOrder={this.handleSortChange}
          transacciones={this.props.transacciones}
          sortName={this.state.sortName}
          sortOrder={this.state.sortOrder}
        />
        <div className="mt-3 text-align:center">
          <Pagination
            activePage={this.state.page_current}
            itemsCountPerPage={this.state.page_show}
            totalItemsCount={this.props.total_transacciones}
            onChange={this.handlePageChange}
          />
        </div>
      </>
    );
  }
}

TransaccionPage.propTypes = {
  transacciones: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    transacciones: state.transacciones.data,
    total_transacciones: state.transacciones.total,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getTransacciones: bindActionCreators(
        clienteActions.getTransaccionesData,
        dispatch
      ),
      deleteTransacciones: bindActionCreators(
        clienteActions.deleteTransacciones,
       
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransaccionesPage);
