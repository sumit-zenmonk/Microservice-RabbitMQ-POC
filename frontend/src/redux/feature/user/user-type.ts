import { UserRoleEnum } from "@/enums/user.enum"

export interface Creator {
    uuid: string
    name: string
    email: string
    role: UserRoleEnum
}

export interface CreatorState {
    creators: Creator[]
    total_creator_count: number
    loading: boolean
    error: string | null
    status: "pending" | "succeed" | "rejected"
}