export interface Message {
  totals:   number;
  customer: Customer[];
  ok: boolean;
  message: string;
}

export interface Customer {
  totals:   number;
  status:       boolean;
  _id:          string;
  name:         string;
  email:        string;
  phone:        string;
  address:      string;
  customerType: CustomerType;
  ok: boolean;
  message: string;
}

export interface CustomerType {
  _id:      string;
  typename: string;
}
