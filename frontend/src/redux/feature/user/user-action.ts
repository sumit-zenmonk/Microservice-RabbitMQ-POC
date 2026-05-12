"use client"

import { RootState } from "@/redux/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = process.env.NEXT_PUBLIC_MAIN_API_URL

export const fetchCreators = createAsyncThunk<
    any,
    { offset?: number; limit?: number },
    { state: RootState }
>(
    "creator/fetch",
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