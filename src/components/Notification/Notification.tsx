import { Avatar, Indicator, Menu } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'
import { type FC } from 'react'
import { useNoticationStyles } from './Notification.styles'

export const Notification: FC = () => {
    const { classes } = useNoticationStyles()
    return (
        <Menu shadow="md" position="bottom-end">
            <Menu.Target>
                <Indicator size={10}>
                    <Avatar
                        radius="xl"
                        color="indigo"
                        className={classes.avatar}
                    >
                        <IconBell />
                    </Avatar>
                </Indicator>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item color="red">Notification 1</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
