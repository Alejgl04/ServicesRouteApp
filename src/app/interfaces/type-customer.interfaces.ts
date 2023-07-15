export interface TypeCustomer {
    totals:       number;
    ok:           boolean,
    _id:          string;
    typename:     string;
    description?: string;
    message:      string
}

export interface TypeMessage {
    ok:    boolean;
    typeCustomer: TypeCustomer;
    message: string;
  }
  