import React, { useState } from 'react';
// useeffect import
import { useEffect } from 'react';
//import mui card
import Card from '@mui/material/Card';
// AttachMoneyIcon import
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Paper,
  Grid,
  InputAdornment,

} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu as MenuIcon, PowerSettingsNew as PowerSettingsNewIcon } from '@mui/icons-material';
// import Switch from '@mui/material/Switch';
import { Switch } from '@mui/material';
// tooltip import
import Tooltip from '@mui/material/Tooltip';
// addicon import
import AddIcon from '@mui/icons-material/Add';
// editicon import
import EditIcon from '@mui/icons-material/Edit';
// deleteicon import
import DeleteIcon from '@mui/icons-material/Delete';

// GetAppIcon import
import GetAppIcon from '@mui/icons-material/GetApp';

// import CustomSnackbar
// import CustomSnackbar from '../components/CustomSnackbar';

// import snackbar, alert, and snackbar from mui
import { Snackbar, Alert } from '@mui/material';

// Zoom import
import Zoom from '@mui/material/Zoom';

// import BarChart and PieChart from recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend, PieChart, Pie, Cell } from 'recharts';


// makeStyles hook to create styles for header and footer
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundImage: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
    textAlign: 'center',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    // padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
}));



// create dummy data for transactions
const dummyTransactions = [
  {
    name: 'Salary',
    amount: 50000,
    type: 'income',
  },
  {
    name: 'Rent',
    amount: 20000,
    type: 'expense',
  },
  {
    name: 'Grocery',
    amount: 10000,
    type: 'expense',
  },
  {
    name: 'Bonus',
    amount: 10000,
    type: 'income',
  },
]

const ExpenseTracker = () => {
  const classes = useStyles();

  const [transactions, setTransactions] = useState([...dummyTransactions]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({
    name: '',
    amount: '',
    type: 'expense',
  });

  // BarChart data
  const [barChartData, setBarChartData] = useState([]);

  // PieChart data
  const [pieChartData, setPieChartData] = useState([]);

  // useEffect to update barChartData and pieChartData
  useEffect(() => {
    // create barChartData
    const barChartData = [];
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        barChartData.push({
          name: transaction.name,
          income: transaction.amount,
          expense: 0,
        });
      } else {
        barChartData.push({
          name: transaction.name,
          income: 0,
          expense: transaction.amount,
        });
      }
    });
    setBarChartData(barChartData);

    // create pieChartData
    const pieChartData = [];
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        pieChartData.push({
          name: transaction.name,
          value: transaction.amount,
        });
      }
    });
    setPieChartData(pieChartData);
  }, [transactions]);





  const handleMenuOpen = () => {
    // Handle menu open logic
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleSnackbarOpen = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const handleMenuClose = () => {
    // Handle menu close logic
  };

  const handleTransactionChange = (event) => {
    const { name, value } = event.target;






    setCurrentTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  // create handleAddTransaction function
  const handleAddTransaction = () => {
    // validation before adding
    if (currentTransaction.name === '' || currentTransaction.amount === '') {
      // snack bar call
      handleSnackbarOpen('Please enter all the fields', 'error');
      return;
    }
    if (isNaN(currentTransaction.amount)) {
      // snack bar call
      handleSnackbarOpen('Please enter valid amount', 'error');
      return;
    }
    if (currentTransaction.amount <= 0) {
      // snack bar call
      handleSnackbarOpen('Please enter valid amount', 'error');
      return;
    }
    // add transaction
    const newTransaction = {
      ...currentTransaction,
      timestamp: new Date().toLocaleString(),
    };
  
    









































    // snack bar call
    handleSnackbarOpen('Transaction added successfully', 'success');
  };

  // create total state
  const [total, setTotal] = useState(0);

  // useeffect for calculaing total by adding income and subtract expense
  useEffect(() => {
    let total = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        total += parseInt(transaction.amount);
      } else {
        total -= parseInt(transaction.amount);
      }
    });
    setTotal(total);
  }, [transactions]);




  const handleEditTransaction = (index) => {
    setCurrentTransaction(transactions[index]);
    setOpenDialog(true);

  };
  // handleDownloadTransactions function  
  const handleDownloadTransactions = () => {
    // validation before downloading
    if (transactions.length === 0) {
      // snack bar call   
      handleSnackbarOpen('No transactions to download', 'error');
      return;
    }
    // download transactions as json file
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(transactions)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'transactions.json';
    document.body.appendChild(element);
    element.click();
  };


  // create handleSaveTransaction function
  const handleSaveTransaction = () => {
    const updatedTransactions = [...transactions];
    updatedTransactions.forEach((transaction, index) => {
      if (transaction.timestamp === currentTransaction.timestamp) {
        updatedTransactions[index] = currentTransaction;
      }
    });
    setTransactions(updatedTransactions);
    setCurrentTransaction({
      name: '',
      amount: '',
      type: 'expense',
    });
    setOpenDialog(false);
    // snack bar call
    handleSnackbarOpen('Transaction updated successfully', 'success');
  };

  // create handleDeleteTransaction function
  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    // snack bar call
    handleSnackbarOpen('Transaction deleted successfully', 'success');
  };

  return (
    <div style={{ minheight: "125vh" }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(to right, #f092d6, #0c3881)',
        textAlign: 'center',

      }}>
        {/* App bar content */}
        <Toolbar>

          {/* Menu items  */}
          <Menu
            id="menu-appbar"
            anchorEl={null}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={false}
            onClose={handleMenuClose}
          >
            {/* Menu items */}
          </Menu>

          {/* create a image tag */}
          <img src="/fin-logo.png" alt="logo" width="70px" />
          Follow your Finances Easily


          <Typography variant="h6" component="div" sx={{ marginLeft: '-15%', fontSize: "30px", fontWeight: "bolder", flexGrow: 1 }}>
            {/* Expense Tracker */}
            Monetaire 
          </Typography>
          <IconButton color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={5.7}>
          <Box sx={{ maxWidth: 400, mx: 'auto', my: -2, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add Expense
            </Typography>

            {/*text field for name, amount and type*/}
            <TextField
              name="name"
              label="Name"
              value={currentTransaction.name}
              onChange={handleTransactionChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={currentTransaction.amount}
              onChange={handleTransactionChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={currentTransaction.type}
                onChange={handleTransactionChange}
              >
                {/* menu item for income and expense */}
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>


              </Select>
            </FormControl>

            {/* button with mui add icon with tool tip around it circle shape with backgroind color*/}
            <Tooltip title="Add" arrow>
              <IconButton onClick={handleAddTransaction}
                sx={{
                  bgcolor: '#7b9df3',
              // onhover backgroud color change
                '&:hover': {
                    backgroundColor: '#7b9df3',
                  },
                }}>
                <AddIcon />
              </IconButton>
            </Tooltip>







          </Box>

          {/*  Bar chart to represent total income and amount remaining */}

          {/* Typography to display bar chart */}
          <Typography style={{ marginLeft: "150px" }} variant="h6" sx={{ mb: 1, }}>
            Total Income and Expense
          </Typography>
          {/* made zoom effect when hover on bar chart */}

          <BarChart style={{ marginLeft: "150px", marginBottom: '50px', webkitTransition: 'zoom 0.3s' }} width={400} height={200} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#e8253f" />
          </BarChart>
        </Grid>
        {/* divider to divide the grid vartiocally */}
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={6}>

          {/* render when transactions length greater than 0 */}
          {transactions.length > 0 && (
            <Table>
              {/* give border and bg color to table */}

              <TableHead sx={{ border: '1px solid #ccc', bgcolor: '#f3f3f3' }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: '1px solid #ccc' }}>
                {/* map function to render transactions and popukate as table */}
                {transactions.map((transaction, index) => (
                  <TableRow key={transaction.timestamp}>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Typography style={{ color: transaction.type === "expense" ? "#e8253f" : "#0bba3a" }}>{String(transaction.type).toUpperCase()}</Typography></TableCell>
                    <TableCell>
                      {/* button with mui edit icon with tool tip */}
                      <Tooltip title="Edit" arrow>
                        <IconButton onClick={() => handleEditTransaction(index)}>
                          <EditIcon style={{ color: "#7b9df3" }} />
                        </IconButton>
                      </Tooltip>

                      {/* button with mui delete icon with tool tip */}
                      <Tooltip title="Delete" arrow>
                        <IconButton onClick={() => handleDeleteTransaction(index)}>
                          <DeleteIcon style={{ color: "#e6475c" }} />
                        </IconButton>
                      </Tooltip>


                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          )}
        </Grid>

        {/* render at top right corner with total amount holding by adding income and subtracting expense */}
        {/* //add card with elevation 10 */}
        <Box sx={{ position: 'fixed', bottom: 40, right: 20, }} >
          <Typography variant="h6" style={{ borderRadius: "10px 10px 0px 10px ", backgroundColor: "#e9e9e9", padding: "4px" }}

            sx={{ mb: 2, }}>
            {/* rupee icon mui5 */}

            Balance : <span style={{ color: total <= 0 ? "#e8253f" : "#0bba3a", fontWeight: "bolder" }}><sub><AttachMoneyIcon /></sub>{total}</span>
          </Typography>
        </Box>


      </Grid>





      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ background: 'f3f3f3' }}>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={currentTransaction.name}
            onChange={handleTransactionChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/*add end icon as dollar icon */}
          <TextField
            name="amount"
            label="Amount"
            endIcon={<AttachMoneyIcon />}
            type="number"
            value={currentTransaction.amount}
            onChange={handleTransactionChange}

            InputProps={{
              endAdornment: <InputAdornment position="end"><AttachMoneyIcon /></InputAdornment>,
            }}

            fullWidth
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={currentTransaction.type}
              onChange={handleTransactionChange}
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveTransaction}>Save</Button>
        </DialogActions>
      </Dialog>

      <Paper square sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: "45px",
        // padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#db8ace',
      }}>
        {/*  image with brand name */}
        {/* <img src='https://www.fastestcoderfirst.com/assets/img/Fastest-Coder-Hackathon-Banner-Logo.png' alt="logo" 
                style={{ width: '50px', height: '50px' }} /> */}
        <Typography color="textSecondary" variant="h6">
          Powered by GitHub copilot
        </Typography>
      </Paper>
      {/* dowload button with mui download icon with tool tip download as excel sheet */}
      <Tooltip title="Download" arrow>
        <IconButton sx={{
          position: 'fixed',
          top: 90,
          right: 20,
          backgroundColor: '#d888cd',
          // onhover backgroud color change
          '&:hover': {
            backgroundColor: '#d888cd',
          },

        }}
          onClick={handleDownloadTransactions}
        >
          <GetAppIcon />
        </IconButton>
      </Tooltip>

      {/*  Bar chart to represent total income and amount remaining */}
      {/* <BarChart width={500} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expense" fill="#e8253f" />
            </BarChart> */}


      <Snackbar open={open} autoHideDuration={4000}
        // add origin to bottom center
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleSnackbarClose}>
        <Alert severity={severity} onClose={handleSnackbarClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ExpenseTracker;
