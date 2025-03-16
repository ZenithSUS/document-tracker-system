export type Error = {
  response: {
    data: {
      status: number;
      message: string;
      error: {
        auth_error: string;
      };
    };
  };
  message: string;
  request: string;
};

export type Overall = {
  users?: Object[];
  documents?: Object[];
};

export type User = {
  id?: string;
  email?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
};

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
};
