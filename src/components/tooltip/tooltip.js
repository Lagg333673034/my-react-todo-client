import Tooltip from '@mui/material/Tooltip';
import './tooltip.css';
import Zoom from '@mui/material/Zoom';
import Box from "@mui/material/Box/Box";

export const MyTooltip = (open,handleTooltipClose,title,children) => {
    return (
        <Box>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                disableFocusListener disableHoverListener disableTouchListener
                open={open}
                onClose={handleTooltipClose}
                TransitionComponent={Zoom}
                title={title}
            >
                <Box>
                    {children}
                </Box>
            </Tooltip>
        </Box>
    )
};