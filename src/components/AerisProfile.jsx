import styled from 'styled-components';
import AerisImage from '../assets/Aeris.png'; // Importando a imagem da Aeris

const AerisProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AerisImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #007bff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AerisImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;



export const AerisProfileComponent = () => (
  <AerisProfile>
    <AerisImageWrapper>
      <AerisImg src={AerisImage} alt="Aeris" />
    </AerisImageWrapper>
  </AerisProfile>
);