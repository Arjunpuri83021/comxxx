import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

// Create a custom theme with black as the primary color
const theme = createTheme({
    palette: {
        primary: {
            main: '#000', // Black color
        },
    },
});

function PaginationComponent({
    count, 
    page, 
    onPageChange, 
    siblingCount = 1, 
    boundaryCount = 1
}) {
    return (
        <ThemeProvider theme={theme}> {/* Apply the theme */}
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={onPageChange}
                    color="primary"  // Uses the black color from the custom theme
                    siblingCount={siblingCount}
                    boundaryCount={boundaryCount}
                />
            </div>
        </ThemeProvider>
    );
}

export default PaginationComponent;
