import styled from "styled-components";

export const StyledTitle = styled.div`
  text-align: center;
  font-size: 25px;
  text-transform: uppercase;
  margin-bottom: 30px;
`;

export const StyledSettings = styled.div`
  padding-top: 150px;
  max-width: 350px;
  margin: auto;

  .columns {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .column {
      width: 50%;

      &:first-child {
        padding-right: 5px;
      }

      &:last-child {
        padding-left: 5px;
      }
    }
  }

  .form_item {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input, select {
      width: 100%;

      outline: none;
      font-size: 16px;
      border: 1px solid #ccc;
      padding: 5px 10px;
      border-radius: 4px;
    }
  }
`;

export const StyledButton = styled.div`
  text-align: center;
  padding: 10px;
  background: #ccc;
  transition: all .3s;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background: #BEBDBDFF;
  }
`;