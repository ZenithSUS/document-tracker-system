export type User = {
  id?: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

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
