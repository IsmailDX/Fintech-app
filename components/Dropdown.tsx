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
                        ios={{
                            name: 'list.bullet.rectangle.fill',
                            pointSize: 24,
                        }}
                    />
                </DropdownMenu.Item>

                <DropdownMenu.Item key="background">
                    <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: 'photo.fill',
                            pointSize: 24,
                        }}
                    />
                </DropdownMenu.Item>

                <DropdownMenu.Item key="account">
                    <DropdownMenu.ItemTitle>
                        Add new account
                    </DropdownMenu.ItemTitle>
                    <DropdownMenu.ItemIcon
                        ios={{
                            name: 'plus.rectangle.on.folder.fill',
                            pointSize: 24,
                        }}
                    />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default Dropdown
