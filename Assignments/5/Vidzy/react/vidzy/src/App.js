import React from 'react';
import './App.css';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class Listing extends React.Component {    
  render(){
    const movies = this.props.movies;
    const listing = movies.map(movie => <Col sm="3" key={movie._id}>
    <img src={`http://localhost:3000/images/${movie.image}`} style={{width:"200px", height:"200px"}} alt={`${movie.title}`} className="img-thumbnail"/> 
    <div className="caption">
        {movie.title}
    </div>
    </Col>)
    return <Container>
    <Row>
        {listing}
    </Row>
</Container>
  }
};

class SearchForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          title: '',
          genre: 'All'
      }
      this.onTitleChange = e => this._onTitleChange(e);
      this.onGenreChange = e => this._onGenreChange(e);
      this.onSubmit = () => this._onSubmit();
  }

  _onTitleChange(e) {
      this.setState({
          title: e.target.value
      });
  }

  _onGenreChange(e) {
      this.setState({
          genre: e.target.value
      });
  }

  _onSubmit() {
      const {title, genre} = this.state;
      this.props.onSubmit({
          title, genre
      });
  }

  render() {
      return <Container><Form>
          <Form.Row>
          <Form.Group as={Col} controlId="title">
              <Form.Label>
                  Movie Title
              </Form.Label>
                  <Form.Control type="text" value={this.state.title} onChange={this.onTitleChange}/>
          </Form.Group>
          <Form.Group as={Col} controlId="genre">
              <Form.Label>
                  Choose a genre
              </Form.Label>
                  <Form.Control as="select" value={this.state.genre} onChange={this.onGenreChange}>
                      <option value="All">All</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Drama">Drama</option>
                      <option value="Adventure">Adventure</option>
                  </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="submit">
            <br/>
          <Button variant="primary" onClick={this.onSubmit}>
              Submit
          </Button>
          </Form.Group>
      </Form.Row>
      </Form>
      </Container>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: 'All',
      allMovies: [],
      moviesFinal: []
    }

    this.onSubmit = (params) => this._onSubmit(params);
  }

  _onSubmit(params) {
    console.log(params)
    const {allMovies: movies} = this.state;
    let moviesFinal = movies.filter(movie => movie.title.indexOf(params.title) !== -1);
    if (params.title === '') moviesFinal = movies;
    if (params.genre !== 'All') {
      moviesFinal = moviesFinal.filter(movie => movie.genre === params.genre);
    }
    this.setState({moviesFinal});
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/videos').then(res => {
      const allMovies = res.data;
      this.setState({
        allMovies,
        moviesFinal: allMovies
      });
    }).catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h1>Vidzy - View</h1>
        <SearchForm onSubmit={this.onSubmit}/>
        <Listing movies={this.state.moviesFinal}/>
        </Container>
      </div>
    );
  }
}

export default App;
