import React, { Component } from 'react';
import './scss/App.css';
import fetchJsonp from 'fetch-jsonp'; //cors
import Card from './Card';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cards: []
    };
  }

  fetchData(url) {
    this.setState({ isLoading: true });

    let fetchBody = api => fetchJsonp(url, {
      jsonpCallback: 'jsonFlickrFeed',
      jsonpCallbackFunction: 'jsonFlickrFeed'
    })
      .then(res => res.ok ? res : res.json().then(err => Promise.reject(err)));

    fetchBody(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.items })
        this.setState({
          cards: data.items.map((card, index) => (
            <Card
              key={index}
              author={card.author}
              author_page={'https://www.flickr.com/people/'+card.author_id}
              title={card.title}
              description={card.description}
              image={card.media.m}
              imageLink={card.link}
              tags={card.tags}
            />
          ))
        })
      })
      .catch(() => this.setState({ hasErrored: true }));
  }

  componentWillMount() {
    console.log('componentWillMount') //once at beginning
    this.fetchData('https://api.flickr.com/services/feeds/photos_public.gne?format=json');

  }
  render() {

    return (
      <div className="App">
        <div>
          <div className="App_header">
            <h2>
              <a href="https://api.flickr.com/services/feeds/photos_public.gne?format=json">
                Flickr Photo Stream
              </a>
            </h2>
          </div>
          <div className="App_content flexWrap">
            {this.state.cards}
          </div>
        </div>
      </div>
    );
  }
}

export default App;


