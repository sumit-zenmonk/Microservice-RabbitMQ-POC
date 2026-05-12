"use client"

import { RootState } from "@/redux/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = process.env.NEXT_PUBLIC_MAIN_API_URL

export const fetchCreators = createAsyncThunk<
    any,
    { offset?: number; limit?: number },
    { state: RootState }
>(
    "user/creator/fetch",
    async (
        { limit = Number(process.env.page_limit) || 10, offset = Number(process.env.page_offset) || 0 },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().authReducer.token || ""
            
            const res = await fetch(
                `${API_URL}/user/creator?offset=${offset}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            )

            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
            return {
                creators: data.data,
                total_creator_count: data.totalDocuments,
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchFollowingCreators = createAsyncThunk<
    any,
    { offset?: number; limit?: number },
    { state: RootState }
>(
    "user/creator/following",
    async (
        {
            limit = Number(process.env.page_limit) || 10,
            offset = Number(process.env.page_offset) || 0,
        },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(
                `${API_URL}/user/creator/follow?offset=${offset}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            )

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            return {
                followings: data.data,
                total_following_count: data.totalDocuments,
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const MakeFollowBondWithCreator = createAsyncThunk<
    any,
    { follower_uuid: string; following_uuid: string },
    { state: RootState }
>(
    "user/creator/follow/bond/create",
    async (
        { follower_uuid, following_uuid },
        { getState, rejectWithValue }
    ) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(`${API_URL}/user/creator/follow`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    follower_uuid,
                    following_uuid,
                }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const RemoveFollowBondWithCreator = createAsyncThunk<
    any,
    { uuid: string },
    { state: RootState }
>(
    "user/creator/follow/bond/delete",
    async ({ uuid }, { getState, rejectWithValue }) => {
        try {
            const token = getState().authReducer.token || ""

            const res = await fetch(
                `${API_URL}/user/creator/follow/${uuid}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            )

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)