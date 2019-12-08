import React from "react";
import { connect } from "react-redux";
import * as retiroActions from "../../redux/actions/retiroActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import RetiroList from "./RetiroList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

class RetirosPage extends React.Component {
  state = {
    redirectToAddClientePage: false,
    page_current: 1,
    page_show: 5,
    sortName: undefined,
    sortOrder: undefined
  };

  componentDidMount() {
    const { retiros, actions } = this.props;
    if (retiros.length === 0) {
      actions.getRetiros().catch(error => {
        alert("Loading retiros failed" + error);
      });
    }
  }

  handleDeleteRetiro = async retiro => {
    toast.success("Retiro deleted");
    try {
      await this.props.actions.deleteRetiro(retiro);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  handlePageChange = async page => {
    this.setState({ page_current: page });
    await this.props.actions.getRetiros(page);
  };
  handleSortChange = async (sortName, sortOrder) => {
    this.setState({
      page_current: 1,
      sortName: sortName,
      sortOrder: sortOrder
    });
    await this.props.actions.getRetiros(
      this.state.page_current,
      sortName,
      sortOrder
    );
  };

  render() {
    console.log("this.props", this.props);
    return (
      <>
        {this.state.redirectToAddRetiroPage && <Redirect to="/retiro" />}
        <h2>Retiros</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-cliente"
          onClick={() => this.setState({ redirectToAddClientePage: true })}
        >
          Add retiros
        </button>

        <RetiroList
          onDeleteClick={this.handleDeleteCliente}
          onOrder={this.handleSortChange}
          retiros={this.props.retiros}
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

RetirosPage.propTypes = {
  retiros: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    retiros: state.retiros.data,
    total_cliente: state.retiros.total,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getRetiros: bindActionCreators(
        retiroActions.getRetirosData,
        dispatch
      ),
      deleteRetiro: bindActionCreators(
        retiroActions.deleteRetiro,
       
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetirosPage);