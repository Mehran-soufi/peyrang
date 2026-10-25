export type UpdateProfileState = {
  success: boolean;
  message: string | null;
  fieldErrors?: {
    username?: string[];
    displayName?: string[];
    bio?: string[];
    avatar?: string[];
  };
};

export const initialUpdateProfileState: UpdateProfileState = {
  success: false,
  message: null,
};
