import React from "react";
import { connect } from "react-redux";
import * as productoActions from "../../redux/actions/productoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProductoList from "./ProductoList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

class ProductosPage extends React.Component {
    state = {
      redirectToAddProductoPage: false,
      page_current: 1,
      page_show: 5,
      sortName: undefined,
      sortOrder: undefined
    };

    componentDidMount() {
        const { productos, actions } = this.props;
        if (productos.length === 0) {
          actions.getProductos().catch(error => {
            alert("Loading productos failed" + error);
          });
        }
      }  
      
      handleDeleteProducto = async producto => {
        toast.success("Producto deleted");
        try {
          await this.props.actions.deleteProducto(producto);
        } catch (error) {
          toast.error("Delete failed. " + error.message, { autoClose: false });
        }
      };

      handlePageChange = async page => {
        this.setState({ page_current: page });
        await this.props.actions.getProductos(page);
      };

      handleSortChange = async (sortName, sortOrder) => {
        this.setState({
          page_current: 1,
          sortName: sortName,
          sortOrder: sortOrder
        });
        await this.props.actions.getProductos(
          this.state.page_current,
          sortName,
          sortOrder
        );
      };

      render() {
        console.log("this.props", this.props);
        return (
          <>
            {this.state.redirectToAddProductoPage && <Redirect to="/producto" />}
            <h2>Productos</h2>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-professor"
              onClick={() => this.setState({ redirectToAddProfessorPage: true })}
            >
              Add Productos
            </button>
    
            <ProductoList
              onDeleteClick={this.handleDeleteProducto}
              onOrder={this.handleSortChange}
              productos={this.props.productos}
              sortName={this.state.sortName}
              sortOrder={this.state.sortOrder}
            />
            <div className="mt-3 text-align:center">
              <Pagination
                activePage={this.state.page_current}
                itemsCountPerPage={this.state.page_show}
                totalItemsCount={this.props.total_producto}
                onChange={this.handlePageChange}
              />
            </div>
          </>
        );
      }
    }

    ProductosPage.propTypes = {
        productos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired
      };
      
      function mapStateToProps(state) {
        console.log("mapStateToProps", state);
        return {
          productos: state.productos.data,
          total_producto: state.productos.total,
          loading: state.apiCallsInProgress > 0
        };
      }

      function mapDispatchToProps(dispatch) {
        return {
          actions: {
            getProductos: bindActionCreators(
              productoActions.getProductosData,
              dispatch
            ),
            deleteProducto: bindActionCreators(
              productoActions.deleteProducto,
              dispatch
            )
          }
        };
      }

      export default connect(mapStateToProps, mapDispatchToProps)(ProductosPage);