let date = new Date()
let newDate = date.toDateString()
const clubs = [
    {
        name: 'club1',
        clubId: '123',
        username: 'Crosby0',
        password: '123456',
        date: newDate,
        isActive: true,
        balance: 0,
        members: 0
    },
    {
        name: 'club2',
        clubId: '234',
        username: 'Gibson1',
        password: '1234567',
        date: newDate,
        isActive: false,
        balance: 0,
        members: 0
    },
    {
        name: 'club3',
        clubId: '345',
        username: 'Carey2',
        password: '1234568',
        date: newDate,
        isActive: true,
        balance: 0,
        members: 0
    },
    {
        name: 'club4',
        clubId: '456',
        username: 'Robertson3',
        password: '1234569',
        date: newDate,
        isActive: true,
        balance: 0,
        members: 0
    },
    {
        name: 'club5',
        clubId: '567',
        username: 'Pace4',
        password: '1234560',
        date: newDate,
        isActive: false,
        balance: 0,
        members: 0
    },
];
export default function clubsInfo() {
    return clubs
}


export function clubBar() {
    return [
        { id: 'name', label: 'Name', minWidth: 50 },
        { id: 'username', label: 'Club Owner', minWidth: 50 },
        { id: 'password', label: 'Password', minWidth: 50 },
        { id: 'balance', label: 'Balance', minWidth: 50 },
        { id: 'members', label: 'Members', minWidth: 50 },
        { id: 'date', label: 'Opening Date', minWidth: 50 },
        { id: 'status', label: 'Status', minWidth: 50 },
        { id: 'action', label: 'Action', minWidth: 50 },
    ]
}

