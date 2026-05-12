"use client"

import { createSlice } from "@reduxjs/toolkit"
import { CreatorState } from "./user-type"
import { fetchCreators } from "./user-action"

const initialState: CreatorState = {
    creators: [],
    total_creator_count: 0,
    loading: false,
    error: null,
    status: "pending",
}

const creatorSlice = createSlice({
    name: "creator",
    initialState,
    reducers: {
        resetCreatorState: (state) => {
            state.creators = []
            state.total_creator_count = 0
            state.loading = false
            state.error = null
            state.status = "pending"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreators.pending, (state) => {
                state.loading = true
                state.status = "pending"
            })

            .addCase(fetchCreators.fulfilled, (state, action) => {
                state.loading = false
                state.status = "succeed"

                const newCreators = action.payload.creators

                if (action.meta.arg.offset === 0) {
                    state.creators = newCreators
                } else {
                    const merged = [...state.creators, ...newCreators]

                    state.creators = Array.from(
                        new Map(
                            merged.map((creator) => [
                                creator.uuid,
                                creator,
                            ])
                        ).values()
                    )
                }

                state.total_creator_count =
                    action.payload.total_creator_count

                state.error = null
            })

            .addCase(fetchCreators.rejected, (state, action) => {
                state.loading = false
                state.status = "rejected"
                state.error = action.payload as string
            })
    },
})

export const { resetCreatorState } = creatorSlice.actions

export default creatorSlice.reducer