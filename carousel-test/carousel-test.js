import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVideos } from 'actions/index';



class VideosDisplay extends Component {
    constructor() {
        super();
        this.state = {
            currentVideo : 0
        }
    }
    componentDidMount() {
        this.props.fetchVideos();
    }

    renderVideo (video, index) {
        const liStyle = {
            display: 'inline-block',
            width: '33.33333%',
            padding: '1rem'
        }
        const linkStyle = {
            position: 'relative',
            display: 'block',
            borderBottom: 0,
            paddingBottom: '56.25%',
            backgroundColor: 'rgb(224, 224, 224)'
        }
        const imgStyle = {
            minWidth: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            position: 'absolute',
            top: 0,
            left:0,
            right:0,
            bottom:0
        }

        let currentVideo = this.state.currentVideo;
        let firstVideoIndex = currentVideo;
        let lastVideoIndex = currentVideo + 2;

        console.log("Video - INDEX: "+index+", currentVideo: "+currentVideo+", FirstVideo: "+firstVideoIndex+", LastVideo: "+lastVideoIndex)
        if(index >= firstVideoIndex && index <= lastVideoIndex) {

            if(video.pictures != null) {

                const imgUrl = video.pictures.sizes[2].link_with_play_button;
                console.log("Render video image for index "+index, imgUrl)
                return (
                    <li style={liStyle} key={video.uri}><a style={linkStyle}><img style={imgStyle} src={imgUrl} /></a></li>
                );

            }
        }
    }

    onClickNextSlide(e) {
        let newVideo = this.state.currentVideo+3;
        console.log("New video starting index: "+newVideo)
        this.setState({currentVideo : newVideo})
    }


    render () {

        const inspiration = {
            backgroundColor: 'rgb(242,242,242)',
            position: 'relative'
        }
        const headLabel = {
            fontSize: 18,
            margin: 0,
            textAlign: 'center',
            padding: '50px 0 10px 0'
        }
        const ulStyle = {
            width: '80%',
            margin: '0 auto',
            paddingLeft: 0,
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }
        const controlPrev = {
            position: 'absolute',
            top: '60%',
            marginLeft: '-5rem',
            fontSize: '4rem',
            marginTop: -15,
            opacity: 0.5,
            zIndex: 5,
            color: 'rgb(119,119,119)',
            transition: 'all 0.2s ease-in-out 0s'
        }
        const controlNext = {
            position: 'absolute',
            top: '60%',
            marginRight: '-5rem',
            fontSize: '4rem',
            marginTop: -15,
            opacity: 0.5,
            zIndex: 5,
            color: 'rgb(119,119,119)',
            transition: 'all 0.2s ease-in-out 0s'
        }

        let videos = this.renderVideo.bind(this);

        return (
            <div style={inspiration}>
                <p style={headLabel}>VIDEOS</p>
                <div>
                    <ul style={ulStyle}>
                        <a style={controlPrev}><span className="glyphicon glyphicon-menu-left"></span></a>
                        {this.props.videos.map((e,i) => videos(e,i))}
                        {this.state.showNextSlide}
                        <a style={controlNext} onClick={this.onClickNextSlide.bind(this)}><span className="glyphicon glyphicon-menu-right"></span></a>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { // {store} === state.store
    return { videos: state.videos };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchVideos }, dispatch); // fetchStores: function in actions/index.js
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosDisplay);
