import styled from "styled-components";

export const Container = styled.div`
    
`;

export const Header = styled.header`
  padding: 3.2rem 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 112rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  
  > img {
    height: 8rem;
  }
  
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    
    svg {
      color: #999591;
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8rem;
  
  img {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;
  }
  
  div {
    display: flex;
    flex-direction: column;
    margin-left: 1.6rem;
    line-height: 24px;
    
    span {
      color: #f4ede8;
    }
    
    strong {
      color: #ff9900;
    }
  }
`;

