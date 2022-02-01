import { Flex } from '@fluentui/react-northstar';
import { initReactQueryAuth } from 'react-query-auth';

import { Spinner } from '../components/elements';
import {
  loginWithEmailAndToken,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from '../features/auth';
import storage from '../utils/storage';

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    const user = handleUserResponse(data);
    return user;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndToken(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <Flex vAlign={'center'} hAlign={'center'} fill={true}>
        <Spinner />
      </Flex>
    );
  },
  ErrorComponent(error: any) {
    console.error(error);
    return <div>ERROR HERE</div>;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  any,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
