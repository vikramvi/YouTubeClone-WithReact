import React from 'react';

import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoDetails, VideoList } from './components';

class App extends React.Component {

    //state object
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('meditation');
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
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

        //update state object from API response data
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
        console.log(this.state);
    }

    render() {
        //destructure from the state to use as props
        const { selectedVideo, videos } = this.state;

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
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        )
    }
}

export default App;