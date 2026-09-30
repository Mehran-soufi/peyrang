export type SignUpState = {
  success: boolean;
  message: string | null;
  fieldErrors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

export const initialSignUpState: SignUpState = {
  success: false,
  message: null,
};

export type SignInState = {
  success: boolean;
  message: string | null;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export const initialSignInState: SignInState = {
  success: false,
  message: null,
};