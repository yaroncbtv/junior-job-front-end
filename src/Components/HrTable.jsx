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
import { ConstructionOutlined } from '@mui/icons-material';

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
    var tempArray=[];
    const [userInfo, setUserInfo] = useRecoilState(State.userInfo);
    useEffect(() => {
        async function fetchMyAPI() {

            if (!!userInfo.numberOfPublishJob) {
                await Promise.all(userInfo.numberOfPublishJob.map(async (jobId) => { // loop all jobs the user published
                    const userArray =await usersTookTest(jobId);
                    tempArray = Object.assign([], tempArray);
                    return await userArray.map(el=>tempArray.push(el)) // take the users passed the test for specific job
                    
                }));
                await setUsersTakeTestForJob(tempArray); // save all test-passed users from all jobs published and bind to view
            }
        }
        fetchMyAPI();
    }, []);

    const xmpl = usersTakeTestForJob ? usersTakeTestForJob.map((row) => (
        <StyledTableRow key={row.id}>
            <StyledTableCell align="center">{row.name}</StyledTableCell>
            <StyledTableCell align="center">{row.email}</StyledTableCell>
            <StyledTableCell align="center">{row.phone}</StyledTableCell>
            <StyledTableCell align="center">{row.jobName}</StyledTableCell>
        </StyledTableRow>
    )) : null;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Phone</StyledTableCell>
                        <StyledTableCell align="center">Job</StyledTableCell>

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
