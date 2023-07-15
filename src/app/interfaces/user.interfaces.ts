export interface Auth {
  ok:    boolean;
  user:  User;
  token: string;
}

export interface User {
  status:   boolean;
  name:     string;
  email:    string;
  username: string;
  role:     string;
  image:    string;
  uid:      string;
}

export interface UserMessage {
  ok:    boolean;
  user:  User;
  message: string;
}
