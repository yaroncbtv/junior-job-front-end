import * as React from 'react';
import { usersTookTest } from '../Api/api';
import { useRecoilState } from 'recoil';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { State } from '../State/State';
import { MultilineChart } from '@material-ui/icons';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const HrTable = () => {
    const [usersTakeTestForJob, setUsersTakeTestForJob] = useRecoilState(State.usersTakeTestForJob);
    useEffect(() => {
        async function fetchMyAPI() {
            const usersTakeTestForJob = await usersTookTest('61a51b930f3fadfd0440f1e8');
            await setUsersTakeTestForJob(usersTakeTestForJob);
        }
        fetchMyAPI();
    }, []);
    const xmpl = usersTakeTestForJob ? usersTakeTestForJob.map((row) => (
        <StyledTableRow key={row.id}>
            <StyledTableCell align="right">{row.name}</StyledTableCell>
            <StyledTableCell align="right">{row.email}</StyledTableCell>
            <StyledTableCell align="right">{row.phone}</StyledTableCell>
        </StyledTableRow>
    )) : null;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {xmpl}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HrTable;
