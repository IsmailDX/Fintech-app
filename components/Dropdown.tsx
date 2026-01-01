import { View, Text } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'
import RoundButton from './RoundButton'

const Dropdown = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <RoundButton icon={'ellipsis-horizontal'} title={'More'} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                <DropdownMenu.Item key="statement">
                    <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{ name: 'list.bullet.rectangle.fill' }}
                    />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default Dropdown
