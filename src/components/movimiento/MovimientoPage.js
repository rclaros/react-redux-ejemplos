import React from "react";
import { connect } from "react-redux";
import * as movimientoActions from "../../redux/actions/movimientoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import MovimientoList from "./MovimientoList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

class MovimientosPage extends React.Component {
  state = {
    redirectToAddHistorialPage: false,
    page_current: 1,
    page_show: 5,
    sortName: undefined,
    sortOrder: undefined
  };

  componentDidMount() {
    const { movimiento, actions } = this.props;
    if (movimiento.length === 0) {
      actions.getHistorial().catch(error => {
        alert("Loading movimiento failed" + error);
      });
    }
  }

  handleDeleteMovimiento = async movimiento => {
    toast.success("Movimiento deleted");
    try {
      await this.props.actions.deleteMovimiento(movimiento);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  handlePageChange = async page => {
    this.setState({ page_current: page });
    await this.props.actions.getMovimientos(page);
  };
  handleSortChange = async (sortName, sortOrder) => {
    this.setState({
      page_current: 1,
      sortName: sortName,
      sortOrder: sortOrder
    });
    await this.props.actions.getMovimientos(
      this.state.page_current,
      sortName,
      sortOrder
    );
  };

  render() {
    console.log("this.props", this.props);
    return (
      <>
        {this.state.redirectToAddMovimientoPage && <Redirect to="/movimiento" />}
        <h2>Mis Transacciones</h2>


       <MovimientoList
          onDeleteClick={this.handleDeleteMovimiento}
          onOrder={this.handleSortChange}
          movimientos={this.props.movimientos}
          sortName={this.state.sortName}
          sortOrder={this.state.sortOrder}
        />
        <div className="mt-3 text-align:center">
          <Pagination
            activePage={this.state.page_current}
            itemsCountPerPage={this.state.page_show}
            totalItemsCount={this.props.total_movimiento}
            onChange={this.handlePageChange}
          />
        </div>
      </>
    );
  }
}

MovimientosPage.propTypes = {
  movimientos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    movimientos: state.movimientos.data,
    total_movimiento: state.movimientos.total,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getMovimientos: bindActionCreators(
        movimientoActions.getMovimientosData,
        dispatch
      ),
      deleteMovimiento: bindActionCreators(
        movimientoActions.deleteMovimiento,
       
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovimientosPage);
