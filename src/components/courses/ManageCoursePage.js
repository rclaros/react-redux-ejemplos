import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCourses,saveCourse } from "../../redux/actions/courseActions";
import { getProfessors } from "../../redux/actions/listActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursePage({
  courses,
  professors,
  getProfessors,
  getCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      getCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (professors.length === 0) {
      getProfessors().catch(error => {
        alert("Loading professors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "professorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, professorId, category } = course;
    const errors = {};

    let regex = new RegExp("^[a-zA-Z ]+$");
     
    if (!regex.test(title)) errors.title = "titulo erroneo contiene numeros";
    if (title.length > 30) errors.title = "longitud (30) de titulo erroneo";
    if (!title) errors.title = "Title is required.";
    if (!professorId) errors.professor = "Professor is required";
    if (!regex.test(category)) errors.category = "Category erroneo contiene numeros";
    if (category.length > 30) errors.category = "longitud (30) de categoría erroneo";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        console.log("error",error);
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return professors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
      <CourseForm
        course={course}
        errors={errors}
        professors={professors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  professors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  getCourses: PropTypes.func.isRequired,
  getProfessors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.data.length > 0 ? getCourseBySlug(state.courses.data, slug) : newCourse;
  return {
    course,
    courses: state.courses.data,
    professors: state.list.professors
  };
}

const mapDispatchToProps = {
  getCourses,
  getProfessors,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);

/*
if ("onhashchange" in window) {
  alert("Descartar cambios");
}

function locationHashChanged() {
  if (location.hash === "CourseForm") {
      CourseForm();
  }
}

window.onhashchange = locationHashChanged;


window.onpopstate = function() {
  alert("Descartar cambios?");
}; history.pushState({}, '');*/