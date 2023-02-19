import {AiFillHome} from 'react-icons/ai'
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Paper } from '@mui/material'
import {SiMicrosoftexcel} from 'react-icons/si';
import {MdDashboard} from 'react-icons/md';


const section1 = ['Home', 'Excel Model', 'Dashboard'];
const section2 = [];
const links1 = ["/", "/excel_model" ,"/excel_model"]
const links2 = []

const iconStyles = {
    color:'primary.light',
    fontSize:27,
    fontWeight:"bold",  
}


const icons1 = [
    <AiFillHome />,
    <SiMicrosoftexcel />,
    <MdDashboard />
    ]

const icons2 = [
    // <BsController />,
    // <AiOutlineSetting />,
    // <TbArrowCurveRight />,
]

const AppBar = styled(MuiAppBar)(({ theme, open,drawer_width }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawer_width}px)`,
        marginLeft: `${drawer_width}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    }));
    
const DrawerHeader = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    backgroundColor:'#25292a',
    border:3,
}));


const revenuesElements = [
    "Volume",
    "Annual Volume Growth",
    "Price",
    "Annual Price Growth",
]

let OperationalCostsElements = [
    "Cost Item 1 (variable) as a share of revenue",
    "Cost Item 2 (fixed)",
    "Cost Item 2 annual growth",
]

let timeLinesElements = [
    "Start of Capex",
    "End of Capex",
    "Start of operations",
    "Asset life (years)",
]

let CapitalInvestmentElements = [
    "Project capex item 1",
    "Project capex item 2",
    "Total project capex",
    "Equity / (Debt + Equity)",
    "Debt repayment period (years)",
]

let othersElements = [
    "Income tax rate",
    "Interest rate on debt",
]


export  {section1,section2,icons1,icons2, links1,links2,iconStyles,AppBar,DrawerHeader , revenuesElements,
             OperationalCostsElements,timeLinesElements, CapitalInvestmentElements, othersElements }
