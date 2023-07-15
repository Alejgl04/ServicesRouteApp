export interface Services {
  totals:   number;
  services: Service[];
}

export interface Service {
  _id:          string;
  name:         string;
  programmable: number;
  description:  string;
  message:      string;
  ok:           boolean;
}


export interface ServicesCreate {
  ok:      boolean;
  message: string;
  service: Service;
}

export interface ServiceArray {
  _id:          string;
  name:         string;
  description:  string;
  programmable: number;
}
