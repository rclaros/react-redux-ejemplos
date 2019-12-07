import React from "react";
import { connect } from "react-redux";
import * as professorActions from "../../redux/actions/professorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProfessorList from "./ProfessorList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

class ProfessorsPage extends React.Component {
  state = {
    redirectToAddProfessorPage: false,
    page_current: 1,
    page_show: 5,
    sortName: undefined,
    sortOrder: undefined
  };

  componentDidMount() {
    const { professors, actions } = this.props;
    if (professors.length === 0) {
      actions.getProfessors().catch(error => {
        alert("Loading professors failed" + error);
      });
    }
  }

  handleDeleteProfessor = async professor => {
    toast.success("Professor deleted");
    try {
      await this.props.actions.deleteProfessor(professor);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  handlePageChange = async page => {
    this.setState({ page_current: page });
    await this.props.actions.getProfessors(page);
  };
  handleSortChange = async (sortName, sortOrder) => {
    this.setState({
      page_current: 1,
      sortName: sortName,
      sortOrder: sortOrder
    });
    await this.props.actions.getProfessors(
      this.state.page_current,
      sortName,
      sortOrder
    );
  };

  render() {
    console.log("this.props", this.props);
    return (
      <>
        {this.state.redirectToAddProfessorPage && <Redirect to="/professor" />}
        <h2>Professors</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-professor"
          onClick={() => this.setState({ redirectToAddProfessorPage: true })}
        >
          Add Professor
        </button>

        <ProfessorList
          onDeleteClick={this.handleDeleteProfessor}
          onOrder={this.handleSortChange}
          professors={this.props.professors}
          sortName={this.state.sortName}
          sortOrder={this.state.sortOrder}
        />
        <div className="mt-3 text-align:center">
          <Pagination
            activePage={this.state.page_current}
            itemsCountPerPage={this.state.page_show}
            totalItemsCount={this.props.total_professor}
            onChange={this.handlePageChange}
          />
        </div>
      </>
    );
  }
}

ProfessorsPage.propTypes = {
  professors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    professors: state.professors.data,
    total_professor: state.professors.total,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProfessors: bindActionCreators(
        professorActions.getProfessorsData,
        dispatch
      ),
      deleteProfessor: bindActionCreators(
        professorActions.deleteProfessor,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorsPage);
