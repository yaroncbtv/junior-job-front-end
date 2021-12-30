import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { getUserData } from "../services/authServices";
import { getUsersTookTest } from "../Api/api";
import Divider from '@mui/material/Divider';
import { SpinnerDotted } from 'spinners-react';

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





export default function BasicTable() {

  const [items, setItems] = React.useState([]);


  React.useEffect(() => {
    async function fetchMyAPI() {
      const userData = await getUserData();
      const userTable = await getUsersTookTest(userData.listOfPublishJob)
      console.log(userTable)

      setItems(userTable)
    }
    fetchMyAPI()
}, []);

  const table = items.map(function (item, index) {
    return(
   
      <div key={index} style={{ marginTop:"30px" }}>
        <span>{`${item.type} | ${item.location} | ${item.scope}`}</span>
          <TableData  key={item._id} data={item}/>
          <Divider />
      </div>
      
    )

  })

  const isLoading = () => {
    if(items.length>0){
        return(
            <div style={{display:"flex",  flexWrap:'wrap', justifyContent:'space-around'}}>
              {table}
            </div>  
        )
    }else{
        return(
            <div style={{display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column', marginTop:'30px'}}>
            <SpinnerDotted size={50} thickness={150} speed={100} color="#36ad47" />   
                        <p>loading...</p>
            </div>
        )

    }
}


  return (
   <div>
      {isLoading()}
   </div>
  );
}

const TableData = (props) => {
  return (
    <div>
 <TableContainer>
      <Table sx={{ maxWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: 160 }} >User Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="right">Phone</StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.usersTakeTest.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}