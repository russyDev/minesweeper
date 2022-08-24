import styled from "styled-components";

export const StyledRow = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 2px;
  border: 1px solid #ccc;
  border-radius: 2px;
  transition: all .4s;

  &.unknown {
    
     background: #bdbdbd;
     &:hover {
        background: #9f9f9f;
      }
  }
  
  &.marked {
    background: green;
  }

  &.blasted {
    background: red;
  }
`;