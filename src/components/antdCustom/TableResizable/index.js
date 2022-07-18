import React from 'react';
import { get, memoize } from 'lodash';
import { Table } from 'antd';
import styled from 'styled-components';
import HeaderResizable from './HeaderResizable';

const TableStyle = styled.div`
  position: relative;

  .absolute-line {
    cursor: col-resize;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 300px;
    width: 3px;
    background-image: linear-gradient(to bottom, #00d788, rgba(0, 215, 136, 0));
  }
`;

const tryMergeColumnsWidth = (newColumns, oldColumns) =>
  newColumns.map((column, index) => {
    //find this columns in old columns

    //try finding by index
    let thisColumn = oldColumns[index];
    if (get(thisColumn, 'key') !== column.key) {
      //try finding exact key
      thisColumn = oldColumns.find((oldColumn) => oldColumn.key === column.key);
    }

    if (thisColumn) {
      //merge width of the old column to the new one
      return {
        ...column,
        width: thisColumn.width,
      };
    }

    return column;
  });

const minWidth = 70;

class TableResizable extends React.Component {
  constructor(props) {
    super(props);
    this.tableContainerRef = React.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const { oldColumns, oldScroll } = state || {};
    let { columns, scroll } = state || {};

    if (props.columns !== oldColumns) {
      columns = columns
        ? tryMergeColumnsWidth(props.columns, columns)
        : props.columns;
    }

    if (props.scroll !== oldScroll) {
      scroll = props.scroll;
    }
    return {
      oldColumns: props.columns,
      oldScroll: props.scroll,
      columns,
      scroll,
    };
  }

  components = {
    header: {
      cell: HeaderResizable,
    },
  };

  onResize = (e, { x, DOMWidth, widthChange, ...others }) => {
    const newWidth = DOMWidth + widthChange;

    if (newWidth < minWidth) return;
    if (!this.tableContainerRef.current) return;
    const { left } = this.tableContainerRef.current.getBoundingClientRect();
    this.setState({ resizeLineLeft: x - left });
  };

  onFinishResize = (index) => (e, { DOMWidth, widthChange }) => {
    this.setState(({ columns, scroll }) => {
      const currentColumn = columns[index];
      const zoom = currentColumn.width
        ? parseInt(currentColumn.width) / DOMWidth
        : 1; //zoom = props width / real width

      let newWidth = DOMWidth + widthChange;
      if (newWidth < minWidth) {
        newWidth = minWidth;
        widthChange = minWidth - DOMWidth;
      }
      newWidth = zoom * newWidth;

      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: newWidth,
      };

      let newScroll = scroll;

      let scrollX = get(scroll, 'x');
      if (scrollX) {
        newScroll = { ...newScroll, x: scrollX + widthChange };
      }

      return {
        columns: nextColumns,
        scroll: newScroll,
        resizeLineLeft: undefined,
      };
    });
  };

  convertColumns = memoize((columns) =>
    columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        resizable: col.resizable,
        width: col.width,
        onResize: this.onResize,
        onFinishResize: this.onFinishResize(index),
      }),
    })),
  );

  render() {
    const columns = this.convertColumns(this.state.columns);

    return (
      <TableStyle ref={this.tableContainerRef}>
        <TableShouldUpdate
          bordered
          {...this.props}
          scroll={this.state.scroll}
          components={this.components}
          columns={columns}
        />
        {this.state.resizeLineLeft && (
          <div
            className='absolute-line'
            style={{ left: this.state.resizeLineLeft }}
          />
        )}
      </TableStyle>
    );
  }
}

const TableShouldUpdate = React.memo((props) => {
  return <Table {...props} />;
});

export default TableResizable;
