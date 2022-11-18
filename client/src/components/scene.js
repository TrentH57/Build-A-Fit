import styled from 'styled-components';

const Scene = styled.div`
    background: url(${props => props.bgImg});
    -webkit-background-size: cover;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100vh
`;
export default Scene;