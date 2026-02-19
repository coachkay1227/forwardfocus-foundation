export type State = {
  code: string;
  name: string;
  active: boolean;
  comingSoon?: boolean;
  contacts?: {
    email?: string;
    phone?: string;
  };
};
