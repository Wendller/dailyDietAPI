export interface IUserRawData {
  id: string
  name: string
  email: string
  password: string
  session_id: string
}

export class User {
  id: string
  name: string
  email: string
  password: string
  sessionID?: string

  constructor(raw: IUserRawData) {
    this.id = raw.id
    this.name = raw.name
    this.email = raw.email
    this.password = raw.password
    this.sessionID = raw.session_id
  }
}
