import { type FC } from 'react'
import { Box, Flex, Text, rem } from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useLayoutStyles } from './Layout.styles'
import { Authentication } from '~/features/Authentication'
import { ThemIcon } from '../ActionIcon'
import { Notification } from '../Notification'

export const Header: FC = () => {
    const router = useRouter()

    const { classes } = useLayoutStyles()

    const pinned = useHeadroom({ fixedAt: 120 })

    return (
        <Box
            sx={(theme) => ({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: theme.spacing.xs,
                height: rem(70),
                transform: `translate3d(0,${pinned ? 0 : rem(-110)} , 0`,
                transition: 'transform 400ms ease',
            })}
        >
            <Flex align="center" justify="space-between" className={classes.flex}>
                <Flex align="center" gap={70}>
                    <Flex align="center" gap={15} className={classes.pointer} onClick={() => router.push('/')}>
                        <Image src="/logo.png" alt="logo" width={50} height={50} />
                        <Text weight="bold" size={22}>
                            Chronicles
                        </Text>
                    </Flex>
                </Flex>
                <Flex align="center" gap={20}>
                    <ThemIcon />
                    <Notification />
                    <Authentication />
                </Flex>
            </Flex>
        </Box>

    )
}
