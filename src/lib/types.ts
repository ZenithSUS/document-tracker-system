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
  status?: string;
};

export type AddUser = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export type Documents = {
  id?: string;
  name?: string;
  owner?: string;
  fileUrl?: string;
  status?: string;
};

export type FormData = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};
