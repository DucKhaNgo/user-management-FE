import styled from 'styled-components';

const TransactionDetailStyled = styled.div`
  display: flex;
  text-align: center;

  .transaction-detail {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 40vw;
    min-width: 300px;
    font-size: 20px;
    text-transform: uppercase;
  }

  .flex-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #f9f9f9;
    padding: 1.5rem;
  }

  .space {
    height: 0.9rem;
  }

  .block {
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    padding: 15px;

    .block-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }

  .color-gray {
    color: #5a5a5a;
  }

  .currency {
    font-weight: bold;
    font-size: 20px;
  }

  .status {
    font-weight: bold;

    &.WAITING_FOR_TRANSFER {
      color: #ff9100;
    }

    &.DONE {
      color: #419c41;
    }
  }
`;
export default TransactionDetailStyled;
