"use client"

import { useState } from "react"
import { useAppSelector } from "@/redux/hooks.ts";
import styles from "./creator.module.css"
import { RootState } from "@/redux/store"
import { Box, Button, Card } from "@mui/material"
import FollowerListingModal from "@/component/follower-listing-modal/follower-listing-modal";

export default function CreatorPage() {
  const { user, loading } = useAppSelector((state: RootState) => state.authReducer);
  const [openfollowerModal, setOpenfollowerModal] = useState(false);

  if (loading) {
    return <Box className={styles.container}>Loading...</Box>;
  }

  return (
    <>
      <Box className={styles.container}>
        <Card className={styles.cardWrapper} elevation={3}>
          <Button
            variant="outlined"
            onClick={() => setOpenfollowerModal(true)}
          >
            Open follower
          </Button>
        </Card>
      </Box>

      <FollowerListingModal open={openfollowerModal} onClose={() => setOpenfollowerModal(false)} />
    </>
  )
}