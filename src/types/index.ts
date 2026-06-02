export interface Contact {
  name: string;
  linkedin: string;
  email: string;
  instagram: string;
  facebook: string;
  cellphone: string;
  address: string;
}

export interface Project {
  fileName: string;
  title: string;
  description: string;
  mainImage: string;
  projectImages: { image: string }[];
}

export interface Service {
  title: string;
  image: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  cellphone: string;
  subject: string;
  message: string;
}
