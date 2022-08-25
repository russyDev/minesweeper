import styled from "styled-components";

export const StyledHeader = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
  
  .right {
    display: flex;
    align-items: center;
  }
`;

export const StyledButton = styled.div`
  text-align: center;
  padding: 5px;
  background: #ccc;
  transition: all .3s;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12px;
  margin-left: 10px;
  &:hover {
    background: #BEBDBDFF;
  }
`;