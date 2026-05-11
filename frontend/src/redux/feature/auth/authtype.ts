import { RoleEnum } from "@/enums/user.enum"

export interface User {
  uid: string
  email: string | null
  name: string | null
  role: RoleEnum
}

export interface AuthState {
  user: User | null
  token: string
  loading: boolean
  error: string | null
  status: "pending" | "succeed" | "rejected"
}