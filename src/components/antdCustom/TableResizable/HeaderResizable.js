import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { VerticalAlignMiddleOutlined } from '@ant-design/icons';

const HeaderResizeAble = styled.th`
  position: relative;
  background-clip: padding-box;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  .react-resizable-handle {
    position: absolute;
    right: -7px;
    bottom: 0;
    z-index: 1;
    width: 14px;
    height: 100%;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;

    color: rgba(0, 0, 0, 0.1);
    transition: all 0.1s;

    :hover {
      color: #000;
      font-size: 20px;
    }
  }
`;

const getMousePosition = (e) => ({
  x: get(e, 'pageX'),
  y: get(e, 'pageY'),
});
const getTouchPosition = (e) => ({
  x: get(e, 'targetTouches[0]pageX') || get(e, 'changedTouches[0]pageX'), //for end touch
  y: get(e, 'targetTouches[0]pageY') || get(e, 'changedTouches[0]pageY'),
});

class HeaderResizable extends React.Component {
  onMouseMove = (e) => {
    let x = getMousePosition(e).x || getTouchPosition(e).x;

    const { DOMWidth } = this.onStartRef;
    const widthChange = x - this.onStartRef.x;

    this.props.onResize(e, { DOMWidth, x, widthChange });
  };

  onMouseUp = (e) => {
    let x = getMousePosition(e).x || getTouchPosition(e).x;
    const { DOMWidth } = this.onStartRef;
    const widthChange = x - this.onStartRef.x;

    this.props.onFinishResize(e, {
      DOMWidth,
      x,
      widthChange,
    });
  };

  handleTouchDragStart = (e) => {
    const position = getTouchPosition(e);
    this.onStartRef = {
      ...position,
      DOMWidth: get(this.elementRef, 'clientWidth'),
    };

    const onTouchEnd = (e) => {
      this.onMouseUp(e);
      window.removeEventListener('touchmove', this.onMouseMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchend', onTouchEnd);

    window.addEventListener('touchmove', this.onMouseMove);
  };

  handleMouseDragStart = (e) => {
    const position = getMousePosition(e);
    this.onStartRef = {
      ...position,
      DOMWidth: get(this.elementRef, 'clientWidth'),
    };

    const onDragEnd = (e) => {
      this.onMouseUp(e);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', onDragEnd);
    };

    window.addEventListener('mouseup', onDragEnd);

    window.addEventListener('mousemove', this.onMouseMove);
  };

  render() {
    const {
      onResize,
      onFinishResize,
      width,
      className,
      children,
      resizable = true,
      ...restProps
    } = this.props;
    if (!resizable || !onFinishResize || !onResize)
      return <th {...this.props} />;

    return (
      <HeaderResizeAble
        ref={(e) => (this.elementRef = e)}
        width={width}
        className={className + ' react-resizable'}
        {...restProps}>
        {children}
        <div
          className='react-resizable-handle'
          onTouchStart={this.handleTouchDragStart}
          onMouseDown={this.handleMouseDragStart}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <VerticalAlignMiddleOutlined className='resize-icon' rotate={90} />
        </div>
      </HeaderResizeAble>
    );
  }
}

export default HeaderResizable;
