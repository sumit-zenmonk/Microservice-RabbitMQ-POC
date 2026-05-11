"use client"

import { usePathname, useRouter } from "next/navigation"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import styles from "./header-comp.module.css"
import { logoutUser } from "@/redux/feature/auth/authAction"
import { UserRoleEnum } from "@/enums/user.enum"

export default function HeaderComp() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.authReducer)

    const handleLogOut = async () => {
        await dispatch(logoutUser()).unwrap()
        localStorage.clear()
        router.replace("/")
    }

    return (
        <header className={styles.header}>
            <Box className={styles.leftContainer}>
                <p onClick={() => {
                    router.push("/")
                }}>MicroService Post App</p>
            </Box>

            <Box className={styles.rightContainer}>
                {user ? (
                    <>
                        <Button
                            variant="outlined"
                            sx={{ color: "#DB2D43", borderColor: "#DB2D43" }}
                            onClick={async () => {
                                await handleLogOut()
                            }}
                        >
                            Log Out
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            router.push("/login")
                        }}
                    >
                        Sign In
                    </Button>
                )}
            </Box>
        </header >
    )
}