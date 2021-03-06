import { fetchWithCallback } from '.';

type IUser = import('../declarations/user').IUser;

export interface ILoginResponse {
  user: IUser;
  access: string;
  refresh: string;
}

interface IRegisterUser extends Omit<IUser, 'id' | 'companies'> {
  password: string;
}

export const register = async (user: IRegisterUser): Promise<IUser> => {
  // We want to clear the tokens, as if not, it will fail if tokens are outdated when logging in!
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');

  return await fetchWithCallback<IUser>(
    '/user/',
    {},
    {
      body: JSON.stringify(user),
      method: 'POST',
    },
    {
      201: async resp => {
        const parsedRes = (await resp.json()) as ILoginResponse;

        localStorage.setItem('access', parsedRes.access);
        localStorage.setItem('refresh', parsedRes.refresh);

        localStorage.setItem('user_id', parsedRes.user.id.toString());

        return parsedRes.user;
      },
    }
  );
};

export const login = async (
  email: string,
  password: string
): Promise<IUser> => {
  // We want to clear the tokens, as if not, it will fail if tokens are outdated when logging in!
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');

  return await fetchWithCallback<IUser>(
    '/user/login/',
    {},
    {
      body: JSON.stringify({ email, password }),
      method: 'POST',
    },
    {
      200: async resp => {
        const parsedRes = (await resp.json()) as ILoginResponse;

        localStorage.setItem('access', parsedRes.access);
        localStorage.setItem('refresh', parsedRes.refresh);

        localStorage.setItem('user_id', parsedRes.user.id.toString());

        return parsedRes.user;
      },
    }
  );
};

export const updateUser = async (user: Omit<IUser, 'companies'>) =>
  await fetchWithCallback<true>(
    '/user/',
    {},
    {
      body: JSON.stringify(user),
      method: 'PUT',
    },
    {
      200: async () => true,
    }
  );

// delete yourself :o
export const deleteUser = async () =>
  await fetchWithCallback<true>(
    '/user/',
    {},
    {
      method: 'DELETE',
    },
    {
      200: async () => true,
    }
  );

export const getUserById = async (id: number): Promise<IUser> =>
  await fetchWithCallback<IUser>('/user/', { id });

export const getUserByEmail = async (email: string): Promise<IUser> =>
  await fetchWithCallback<IUser>('/user/byEmail/', { email });

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user_id');
};
