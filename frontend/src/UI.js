import * as React from 'react';
import { CssBaseline, Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import Inputs from "./Inputs";
import ShowOutputs from "./ShowOutputs";


function UI() {

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute">
                    <Toolbar>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            OSD Modeling
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Inputs />

                        <ShowOutputs />
                    </Container>
                </Box>
            </Box>
        </div>
    );
}

export default UI;