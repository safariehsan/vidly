import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    editMode: false,
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") {
        this.setState({ editMode: false });
        return;
      }
      this.setState({ editMode: true });
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
    if (this.state.editMode === false)
      toast.success(`«${this.state.data.title}» Added Successfully!`);
    else toast.info(`«${this.state.data.title}» Edited Successfully!`);
  };

  render() {
    const { editMode, genres } = this.state;
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h1>{editMode === false ? "Add" : "Edit"} Movie</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", genres)}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {/* {this.renderInput("liked", "Do you like it?", "checkbox", "checked")} */}
            {this.renderButton(
              editMode === false ? "Add Movie" : "Edit Movie",
              "success",
              "md"
            )}
            {/* {this.renderButton("Back", "primary", "md")} */}
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  }
}

export default MovieForm;
