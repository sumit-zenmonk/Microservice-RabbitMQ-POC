import { UserRoleEnum } from "@/enums/user.enum"

export interface Creator {
    uuid: string
    name: string
    email: string
    role: UserRoleEnum
}

export interface FollowingCreator {
    uuid: string
    following: Creator
    created_at: string
}

export interface FollowerCreator {
    uuid: string
    follower: Creator
    created_at: string
}

export interface CreatorState {
    creators: Creator[]
    followings: FollowingCreator[]
    followers: FollowerCreator[]
    total_follower_count: number
    total_creator_count: number
    total_following_count: number
    loading: boolean
    error: string | null
    status: "pending" | "succeed" | "rejected"
}