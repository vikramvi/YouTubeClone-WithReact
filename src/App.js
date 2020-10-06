import React from 'react';

import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoDetails } from './components';

class App extends React.Component {

    state = {
        video: [],
        selectedVideo: null,
    }

    handleSubmit = async (searchTerm) => {
        //console.log('key value  ' + process.env.REACT_APP_API_KEY);

        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: process.env.REACT_APP_API_KEY,
                q: searchTerm,
            }
        });


        this.setState({ video: response.data.items, selectedVideo: response.data.items[0] });
    }

    render() {
        const { selectedVideo } = this.state;
        return (
            < Grid justify="center" container spacing={10} >
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            {/*console.log('key value  ' + process.env.REACT_APP_API_KEY)*/}
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetails video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            {/* VIDEO LIST */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        )
    }
}

export default App;