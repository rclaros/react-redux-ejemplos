import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  SearchField
} from "react-bootstrap-table";


class MovimientoList extends React.Component {
  constructor(props) {
    super(props);
    this.cellButton = this.cellButton.bind(this);
    this.cellButtonDelete = this.cellButtonDelete.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  cellButton(cell, row) {
    return <Link to={"/movimiento/" + row.id}>{row.name}</Link>;
  }

  cellButtonDelete(cell, row) {
    let me = this;
    return (
      <button
        className="btn btn-outline-danger"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            me.props.onDeleteClick(row);
        }}
      >
        Delete
      </button>
    );
  }

  createCustomSearchField = props => {
    return <SearchField placeholder="Buscar" />;
  };

  onSortChange(sortName, sortOrder) {
    let me = this;
    me.props.onOrder(sortName, sortOrder);
  }

  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.movimientos}
          search={true}
          bodyStyle={{ lineHeight: "22px" }}
          options={{
            searchField: this.createCustomSearchField,
            noDataText: "No hay datos para mostrar",
            onSortChange: this.onSortChange,
            sortName: this.props.sortName,
            sortOrder: this.props.sortOrder,
          }}
        >
          <TableHeaderColumn dataField="id" isKey width="50">
            Id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="id"
            dataSort
            dataFormat={this.cellButton}
            tdStyle={{ whiteSpace: "normal" }}
            width="250"
          >
            Mis Transacciones
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="Monto"
            dataSort
            /*dataFormat={this.cellButton}
            tdStyle={{ whiteSpace: "normal" }}
            width="250"*/
          >
            Monto
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="Fecha"
            dataSort
            /*dataFormat={this.cellButton}
            tdStyle={{ whiteSpace: "normal" }}
            width="250"*/
          >
            Fecha
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="name" /*revisarnameCliente*/
            dataFormat={this.cellButtonDelete}
            dataAlign="center"
          >
            Opcion
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
  
}

MovimientoList.propTypes = {
  movimientos: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default MovimientoList;
