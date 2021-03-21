export default function withdrawBarData() {
    return [
        { id: 'username', label: 'Username', minWidth: 50 },
        { id: 'to', label: 'to', minWidth: 50 },
        { id: 'amount', label: 'Amount', minWidth: 50 },
        { id: 'method', label: 'Method', minWidth: 50 },
        { id: 'date', label: 'Date', minWidth: 50 },
        { id: 'status', label: 'Status', minWidth: 50 },
        { id: 'action', label: 'Action', minWidth: 100 }
    ]
}

export const withdrawData = [
    {
        _id: 123,
        username: 'imran',
        to: '01712346741',
        amount: 300,
        method: 'bkash',
        date: '11-12-2021 / 1.12 AM',
        status: false,
        action: false,
    },
    {
        _id: 12321,
        username: 'Crosby0',
        to: '01712346741',
        amount: 400,
        method: 'bkash',
        date: '11-12-2021 / 1.12 AM',
        status: false,
        action: true,
    },
    {
        _id: 1213,
        username: 'imran',
        to: '01712346741',
        amount: 500,
        method: 'bkash',
        date: '11-12-2021 / 1.12 AM',
        status: true,
        action: false,
    },
]
