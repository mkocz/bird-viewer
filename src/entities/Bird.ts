import Recording from "./Recording";

export default interface Bird {
  images: string[];
  lengthMin?: string;
  lengthMax?: string;
  wingspanMin?: string;
  wingspanMax?: string;
  name: string;
  id: number;
  sciName: string;
  region: string[];
  family: string;
  order: string;
  status?: string;
  recordings?: Recording[];
}


