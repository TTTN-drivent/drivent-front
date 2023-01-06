import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import loading from '../../assets/images/loading.gif';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';

import useSignIn from '../../hooks/api/useSignIn';
import styled from 'styled-components';
import imggithub from '../../assets/images/github.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user:email',
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    };
    const queryString = qs.stringify(params);
    const authURL = `${GITHUB_URL}?${queryString}`;
    window.location.href = authURL;
  }

  const buscaDadosDoUsuario = () => {
    setTimeout(async() => {
      const { code } = qs.parseUrl(window.location.href).query;
      setLoader(true);
      if (code) {
        try {
          const response = await axios.post('http://localhost:4000/auth/logingithub', { code });
          setUserData(response.data);
          navigate('/dashboard');
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('não tem código');
      }
      setLoader(false);
    }, 100);
  };

  useEffect(() => {
    buscaDadosDoUsuario();
  }, []);

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
        {loader ? (
          <StyledLoader>
            <img className="loader" src={loading} alt="loading" />
          </StyledLoader>
        ) : (
          <StyledButtonGitHub onClick={() => redirectToGitHub()}>
            <img src={imggithub} />
            Login Com GitHub
          </StyledButtonGitHub>
        )}
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const StyledButtonGitHub = styled.button`
  background-color: #262626;
  color: white;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 50px;
  }
`;
