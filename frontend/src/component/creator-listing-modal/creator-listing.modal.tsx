"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, Card, CardContent, Typography, Box, Stack, } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import { enqueueSnackbar } from "notistack"
import { RootState } from "@/redux/store"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import styles from "./creator-listing.modal.module.css"
import { fetchCreators } from "@/redux/feature/user/user-action"
import { Creator } from "@/redux/feature/user/user-type"

export default function CreatorListingModal({ open, onClose, }: { open: boolean, onClose: () => void }) {
    const dispatch = useAppDispatch();
    const { creators, total_creator_count } = useAppSelector((state: RootState) => state.userReducer);
    const [offset, setOffset] = useState(0);
    const limit = Number(process.env.page_limit) || 10;

    useEffect(() => {
        if (open) {
            resetAndFetch()
        }
    }, [open])

    const resetAndFetch = async () => {
        try {
            setOffset(0)
            await dispatch(fetchCreators({ offset: 0, limit, })).unwrap()
        } catch (err: any) {
            enqueueSnackbar(err, { variant: "error", })
        }
    }

    const fetchMore = async () => {
        try {
            if (creators.length >= total_creator_count) return
            const newOffset = offset + limit
            setOffset(newOffset)

            await dispatch(fetchCreators({ offset: newOffset, limit, })).unwrap()
        } catch (err: any) {
            enqueueSnackbar(err, { variant: "error", })
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Creators</DialogTitle>
            <DialogContent dividers id="creatorScrollableDiv">
                <InfiniteScroll
                    dataLength={creators?.length}
                    next={fetchMore}
                    hasMore={creators?.length < total_creator_count}
                    loader={<Typography>Loading...</Typography>}
                    scrollableTarget="creatorScrollableDiv"
                    endMessage={<Typography style={{ textAlign: "center", }}>Yay! You have seen it all</Typography>}
                >
                    <Stack spacing={2}>
                        {creators &&
                            creators.map(
                                (creator: Creator) => (
                                    <Card key={creator.uuid} className={styles.card}                                    >
                                        <CardContent className={styles.cardContent}
                                        >
                                            <Box className={styles.header}
                                            >
                                                <Typography variant="h6">
                                                    {creator.name}
                                                </Typography>

                                                <Typography className={styles.role}
                                                >
                                                    {creator.role}
                                                </Typography>
                                            </Box>

                                            <Typography className={styles.email}
                                            >
                                                {creator.email}
                                            </Typography>

                                            <Box className={styles.footer}
                                            >
                                                <Typography>
                                                    UUID:{" "}{creator.uuid}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )
                            )}
                    </Stack>
                </InfiniteScroll>
            </DialogContent>
        </Dialog>
    )
}