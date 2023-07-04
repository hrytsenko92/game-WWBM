import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-flow: row nowrap;
`;
const RegistrationWrapper = styled.div``;
const AuthorizationWrapper = styled.div``;


export const Auth: React.FC = () => {
    const [hasAccount, setHasAccount] = useState (false);
    return (
        <Container>
            {hasAccount ? <AuthorizationWrapper>authori</AuthorizationWrapper>: <RegistrationWrapper>register</RegistrationWrapper>}
        </Container>
    )
}