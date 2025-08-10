export interface GetUserProps {
  _id: string,
  name: string,
  email: string,
  password: string,
  referrerLink: string | null
}

export interface CreateUserProps {
  name: string,
  email: string,
  password: string,
  referrerLink: string | null
}

export interface LoginProps {
  email: string,
  password: string
}

export interface UserSliceStateProps {
  item: GetUserProps | null,
  loading: boolean,
  error: null | any
}