import React from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import * as courseActions from "../../redux/actions/courseActions";
import * as listActions from "../../redux/actions/listActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
    page_current: 1,
    page_show: 5,
    sortName: undefined,
    sortOrder: undefined
  };

  componentDidMount() {
    console.log(" this.props", this.props);
    const { courses, list, actions } = this.props;
    if (list.professors.length === 0) {
      actions.getProfessors().catch(error => {
        alert("Loading professors failed" + error);
      });
    }
    if (courses.length === 0) {
      actions.getCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  handlePageChange = async page => {
    this.setState({ page_current: page });
    await this.props.actions.getCourses(page);
  };
  handleSortChange = async (sortName, sortOrder) => {
    this.setState({
      page_current: 1,
      sortName: sortName,
      sortOrder: sortOrder
    });
    await this.props.actions.getCourses(
      this.state.page_current,
      sortName,
      sortOrder
    );
  };
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <label>..::Total de Curso::..{this.props.total_courses}</label>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              onOrder={this.handleSortChange}
              courses={this.props.courses}
              sortName={this.state.sortName}
              sortOrder={this.state.sortOrder}
            />
            <div className="mt-3 text-align:center">
              <Pagination
                activePage={this.state.page_current}
                itemsCountPerPage={this.state.page_show}
                totalItemsCount={this.props.total_courses}
                onChange={this.handlePageChange}
              />
            </div>
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  list:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log("mapStateToProps ", state);
  return {
    courses:
    state.list.professors.length === 0
      ? []
      : state.courses.data.map(course => {
          return {
            ...course,
            ProfessorName: state.list.professors.find(
              a => a.id === course.professorId
            ).name
          };
        }),
    total_courses: state.courses.total,
    list: state.list,
    loading: state.apiCallsInProgress > 0
  };
}

/**
 * Se define las acciones de forma simplificada
 * @param {*} dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCourses: bindActionCreators(courseActions.getCoursesData, dispatch),
      getProfessors: bindActionCreators(
        listActions.getListProfessors,
        dispatch
      ),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
