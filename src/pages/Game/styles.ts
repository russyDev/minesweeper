import styled from "styled-components";

export const StyledResults = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .7);
  width: 100%;
  height: 100%;
  z-index: 10;

  .container {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;

    .buttons {
      display: flex;
      justify-content: space-between;
    }

    .title {
      text-align: center;
      font-size: 25px;
      margin-bottom: 20px;
      color: #fff;
    }
    
    .button {
      text-align: center;
      padding: 5px;
      background: #fafafa;
      transition: all .3s;
      cursor: pointer;
      text-transform: uppercase;
      font-size: 16px;
      margin-left: 10px;
      border-radius: 4px;
      width: 140px;

      &:hover {
        background: #f1f1f1;
      }
    }
  }
`;