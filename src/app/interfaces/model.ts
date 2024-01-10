export interface Model<T> {
  data: T
}

export interface Data {
  cours: Cours[]
  classes: Classe[]
  profs: Prof[]
  semestres: Semestre[]
  modules: Module[]
  sessions: Session[]
  salles: Salle[]
  annee: AnneeScolaire[]
  users:User[]
  etudiants:User
  demandes:Demande[]
  message:string
}

export interface Session {
  id: number
  dateCours: string
  hDedut: string
  hFin: string
  duree: number
  etat: boolean
  salle: Salle
  cour: Cours
  prof: Prof
  classe: Classe
  module_id: number
  prof_id: number
  classe_id: number
  semestre_id: number
  salle_id: number
  module:Cour
}

export interface Cours {
  id: number
  nbreHeure: number
  semestre_id: number
  annee_scolaire_id: number
  module_id: number
  prof_id: number
  classe_id: number
  prof: Prof
  module: Module
  classe: Classe
  semestre: Semestre
  etat: number
  cour: Cour
  salle: Salle
  dateCours:string,
  hDedut: string,
  hFin: string,
  duree: string,
}
export interface Cour {
  id:number
  nbreHeure: string
  etat: boolean
  prof: User
  module: Module
  classe: Classe
  semestre: Semestre
}
export interface Classe {
  id: number
  nom: string
  effectifs: number
  filiere: Filiere
  niveau: Niveau
}

export interface Prof {
  id: number
  nom: string
  prenom: string
  email: string
  specialite: string
  grade: string
  role: string
}

export interface Module {
  id: number
  libelle: string
  profs: Prof[]
}

export interface Semestre {
  id: number
  libelle: string
  modules: Module[]
}

export interface Salle {
  id: number
  nom: string
  nbrePlace: number
  numero: number
}

export interface Niveau {
  id: number
  libelle: string
}

export interface Filiere {
  id: number
  libelle: string
}

export interface User {
  id:number
  email: string
  password: string
  role: string
  nom: string
  prenom: string
  classe:Classe
  etudiant:User
}
export interface UserAuth {
  token: string
  user: User
  status: boolean
}
export interface AnneeScolaire {
  id: number
  libelle: string
  status:boolean
}
export interface Demande{
  id:number
  motif:string
  session:Session
  prof:User
  etat_demande:string
  cour:Cour
}
