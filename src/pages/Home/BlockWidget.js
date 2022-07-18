import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WidgetStyle = styled.div`
  border-radius: 15px;
  background: white;
  cursor: pointer;
  padding: 30px 15px;
  margin: 20px;

  font-size: 18px;
  text-align: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.27);
  opacity: 0.8;
  transition: all 0.2s;

  .icon {
    transition: font-size 0.2s;

    font-size: 30px;
    line-height: 40px;
  }

  &:hover {
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.27);
    transform: scale(1.05);
    opacity: 1;

    .icon {
      font-size: 40px;
    }
  }
`;

const BlockWidget = (props) => {
  const { name, icon, href } = props;
  return (
    <Link to={href}>
      <WidgetStyle className='widget-block'>
        <h1>{name}</h1>
        <div className='icon'>{icon}</div>
      </WidgetStyle>
    </Link>
  );
};

export default BlockWidget;
